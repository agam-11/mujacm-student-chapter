# Backend Testing & Deployment Guide

## Local Testing

### 1. Start the backend server

```bash
cd backend
npm run dev
```

You should see:
```
✓ Server running on http://localhost:5000
✓ Environment: development
✓ Cron jobs initialized
  - Keep-alive job: Every 10 minutes
```

### 2. Test the health endpoint

```bash
curl http://localhost:5000/health
```

**Expected response:**
```json
{
  "status": "ok",
  "timestamp": "2025-10-19T10:30:45.123Z",
  "uptime": 3600.5
}
```

### 3. Test the contact form API

```bash
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Test Inquiry",
    "message": "This is a test message"
  }'
```

**Expected response (success):**
```json
{
  "success": true,
  "message": "Contact form submitted successfully. Check your email for confirmation."
}
```

**Note:** Two emails will be sent:
1. To the user (john@example.com) — confirmation email
2. To admin (CONTACT_EMAIL_TO in .env) — form submission

### 4. Monitor cron jobs

The keep-alive job runs every 10 minutes. Watch the terminal output:

```
✓ [2025-10-19T10:30:00.000Z] Keep-alive ping successful
✓ [2025-10-19T10:40:00.000Z] Keep-alive ping successful
✓ [2025-10-19T10:50:00.000Z] Keep-alive ping successful
```

## Frontend Integration Testing

### Setup frontend to call backend

In your React contact form component, update the fetch URL:

```javascript
// Development
const API_URL = 'http://localhost:5000';

// Production
const API_URL = process.env.REACT_APP_API_URL || 'https://your-backend.com';
```

Then update your submit handler:

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    const response = await fetch(`${API_URL}/api/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      alert('Message sent! Check your email.');
      // Reset form
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    console.error('Submission error:', error);
    alert('Network error. Please try again.');
  }
};
```

## Deployment Options

### Option 1: Render.com (Recommended for free tier)

**Pros:**
- Free tier with 750 compute hours/month
- Auto-deploys from GitHub
- Keep-alive job keeps server awake

**Steps:**

1. Push backend code to GitHub

2. Go to [render.com](https://render.com) and create account

3. Click "New +" → "Web Service"

4. Connect your GitHub repository

5. Configure:
   - **Name:** mujacm-backend
   - **Root Directory:** backend
   - **Runtime:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`

6. Add Environment Variables:
   - `SMTP_EMAIL`
   - `SMTP_PASSWORD`
   - `CONTACT_EMAIL_TO`
   - `FRONTEND_URL=https://your-frontend.com`
   - `NODE_ENV=production`
   - `KEEP_ALIVE_URL=https://your-backend.onrender.com/health`

7. Click "Deploy"

**After deployment:**
- Backend will be at: `https://mujacm-backend.onrender.com`
- Update frontend API URL to this URL
- Keep-alive job will ping every 10 minutes to prevent sleep

### Option 2: Railway.app

**Pros:**
- Easy GitHub integration
- Free tier with $5 credit
- Good performance

**Steps:**

1. Go to [railway.app](https://railway.app)

2. Click "New Project" → "Deploy from GitHub repo"

3. Select your repository

4. Configure:
   - Root Directory: `backend`
   - Build: Auto-detected

5. Add variables in Railway dashboard (same as Render)

6. Deploy automatically

### Option 3: Heroku (Paid)

```bash
# Install Heroku CLI
# heroku login

cd backend
heroku create mujacm-backend
heroku config:set SMTP_EMAIL=your-email@gmail.com
heroku config:set SMTP_PASSWORD=your-app-password
heroku config:set CONTACT_EMAIL_TO=admin@mujacm.com
heroku config:set FRONTEND_URL=https://your-frontend.com
git push heroku main
```

### Option 4: Self-hosted (VPS/Linode/DigitalOcean)

1. SSH into your server

2. Clone repository:
   ```bash
   git clone https://github.com/your-username/mujacm-backend.git
   cd mujacm-backend/backend
   ```

3. Install Node.js and npm

4. Setup environment:
   ```bash
   cp .env.example .env
   # Edit .env with your credentials
   npm install
   ```

5. Use process manager (PM2):
   ```bash
   npm install -g pm2
   pm2 start server.js --name "mujacm-backend"
   pm2 save
   pm2 startup
   ```

6. Setup nginx as reverse proxy:
   ```nginx
   server {
       listen 80;
       server_name api.mujacm.com;
   
       location / {
           proxy_pass http://localhost:5000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
       }
   }
   ```

7. Setup SSL with Let's Encrypt:
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d api.mujacm.com
   ```

## Production Checklist

- [ ] Email service configured and tested
- [ ] `CONTACT_EMAIL_TO` set to correct admin email
- [ ] `FRONTEND_URL` updated for CORS
- [ ] `KEEP_ALIVE_URL` points to deployed backend URL
- [ ] Environment variables set on hosting platform
- [ ] HTTPS/SSL configured (critical for email credentials)
- [ ] API endpoint tested from production frontend
- [ ] Email delivery tested (check spam folder)
- [ ] Monitor server logs for errors
- [ ] Set up error tracking (Sentry, etc.)

## Troubleshooting

### Emails not sending

```bash
# Check SMTP configuration
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"your@email.com","subject":"Test","message":"Test"}'
```

**Solutions:**
- Verify `SMTP_EMAIL` and `SMTP_PASSWORD` in `.env`
- For Gmail: generate app-specific password (not regular password)
- Check email address format
- Look for SMTP errors in server logs

### Keep-alive job not working

1. Verify `KEEP_ALIVE_URL` is correct and accessible
2. Check server logs for error messages
3. Test manually: `curl https://your-backend.com/health`
4. Check firewall allows outbound HTTPS requests

### CORS errors in frontend

Update `FRONTEND_URL` in backend `.env`:

```bash
# If frontend is on subdomain
FRONTEND_URL=https://subdomain.mujacm.com

# If frontend is on different domain
FRONTEND_URL=https://mujacm.com

# For localhost development
FRONTEND_URL=http://localhost:5173
```

Then restart the backend server.

### 502 Bad Gateway on deployed backend

- Check server logs: `pm2 logs` or platform logs
- Verify all environment variables are set
- Ensure `npm install` completed successfully
- Check Node.js version compatibility
- Restart: `pm2 restart all` or redeploy

## Monitoring

### Setup error tracking with Sentry (optional)

```bash
npm install @sentry/node
```

In `server.js`:
```javascript
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV
});

app.use(Sentry.Handlers.errorHandler());
```

### View logs

- **Render:** Dashboard → Logs tab
- **Railway:** Dashboard → Logs
- **Heroku:** `heroku logs --tail`
- **Self-hosted:** `pm2 logs` or `journalctl -u your-service`

## Performance Tips

- Email sending is asynchronous (doesn't block API response)
- Use queue system (Bull, RabbitMQ) for high volume
- Add rate limiting to prevent abuse:
  ```bash
  npm install express-rate-limit
  ```
- Cache DNS lookups
- Monitor memory usage

---

For questions or issues, check the main `backend/README.md` or create an issue on GitHub.
