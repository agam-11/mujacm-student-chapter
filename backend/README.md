# MUJ ACM Backend

Node.js + Express backend for the MUJ ACM Student Chapter website with contact form handling and cron jobs for email notifications and server keep-alive.

## Features

- ✉️ **Contact Form Handler** — Receives form submissions and sends emails to admin + user confirmation
- ⏰ **Keep-Alive Cron** — Pings the server every 10 minutes to prevent sleep/termination
- 📧 **Nodemailer Integration** — SMTP-based email sending (Gmail, custom servers, etc.)
- 🔒 **CORS Support** — Safe frontend-to-backend communication
- 🏥 **Health Check Endpoint** — `/health` endpoint for monitoring

## Quick Start

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Setup Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

**Example `.env`:**

```
# Gmail (requires app-specific password)
SMTP_SERVICE=gmail
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-16-char-app-password

# Recipient for contact forms
CONTACT_EMAIL_TO=admin@mujacm.com

# Server
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
KEEP_ALIVE_URL=http://localhost:5000/health
```

### 3. Gmail App Password Setup (Recommended)

1. Enable 2-factor authentication on your Gmail account
2. Go to [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Generate a 16-character app password
4. Use this password in `.env` (not your regular Gmail password)

### 4. Run the Server

**Development (with auto-reload):**

```bash
npm run dev
```

**Production:**

```bash
npm start
```

Server will start on `http://localhost:5000`.

## API Endpoints

### POST `/api/contact`

Submit a contact form.

**Request:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Inquiry",
  "message": "Hello, I have a question..."
}
```

**Response (Success):**

```json
{
  "success": true,
  "message": "Contact form submitted successfully. Check your email for confirmation."
}
```

**Response (Error):**

```json
{
  "error": "Missing required fields",
  "required": ["name", "email", "subject", "message"]
}
```

### GET `/health`

Check server status (used by keep-alive cron).

**Response:**

```json
{
  "status": "ok",
  "timestamp": "2025-10-19T10:30:45.123Z",
  "uptime": 3600.5
}
```

## Cron Jobs

### Keep-Alive Job

- **Schedule:** Every 10 minutes
- **Action:** Pings `/health` endpoint to keep server awake
- **Useful for:** Preventing sleep on free hosting (Render, Railway, etc.)

### Contact Form Email

- **Trigger:** POST to `/api/contact`
- **Action:** Sends email to admin + confirmation to user
- **Emails sent:** 2 per submission

## File Structure

```
backend/
├── server.js              # Main Express app
├── package.json           # Dependencies
├── .env.example           # Environment template
├── routes/
│   └── contact.js         # Contact form routes
├── services/
│   └── emailService.js    # Nodemailer wrapper
├── cron/
│   └── jobs.js            # Cron job definitions
└── README.md              # This file
```

## Integration with Frontend

Update your contact form in React to post to:

```javascript
// Example React hook
const handleContactSubmit = async (formData) => {
  try {
    const response = await fetch('http://localhost:5000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    
    const data = await response.json();
    if (data.success) {
      alert('Message sent! Check your email.');
    } else {
      alert('Error: ' + data.error);
    }
  } catch (error) {
    console.error('Submission error:', error);
  }
};
```

## Troubleshooting

### "Invalid login" error with Gmail

- Ensure you're using an **app-specific password** (not your regular Gmail password)
- Verify 2FA is enabled on your Gmail account
- Check that `SMTP_EMAIL` and `SMTP_PASSWORD` are correct

### Keep-alive not working

- Verify `KEEP_ALIVE_URL` points to your deployed server (not localhost)
- Check firewall/network settings allow outbound HTTPS requests
- Review server logs for error messages

### CORS errors

- Ensure `FRONTEND_URL` in `.env` matches your frontend's origin
- For production, update CORS origin when deploying

## Deployment

### Render.com (Free tier)

1. Push code to GitHub
2. Connect repository to Render
3. Set environment variables in Render dashboard
4. Deploy
5. Keep-alive job will keep server awake

### Railway.app

Similar setup to Render. Keep-alive job recommended for free tier.

### Heroku (Paid)

```bash
heroku create your-app-name
heroku config:set SMTP_PASSWORD=your-password
git push heroku main
```

## Mailtrap (Recommended for testing)

1. Sign up at https://mailtrap.io and create an Inbox.
2. In the Inbox settings you'll see SMTP credentials (host, port, username, password). Use those values in `backend/.env`:

```env
SMTP_HOST=smtp.mailtrap.io
SMTP_PORT=2525
SMTP_SECURE=false
SMTP_EMAIL=<mailtrap-username>
SMTP_PASSWORD=<mailtrap-password>
CONTACT_EMAIL_TO=your-team@example.com
```

3. Run the backend and send a test email (see below) — messages will appear in the Mailtrap inbox.

## Quick test script

There's a small script to verify email sending:

```bash
cd backend
node ./scripts/send_test_email.js
```

If verification fails, check your credentials and the `.env` values.

## Using Gmail in production (short guide)

- Enable 2FA on the Gmail account.
- Create an app password at https://myaccount.google.com/apppasswords and copy the 16-character password.
- In `backend/.env` add:

```env
SMTP_SERVICE=gmail
SMTP_EMAIL=your-email@gmail.com
SMTP_PASSWORD=your-app-password
CONTACT_EMAIL_TO=admin@yourdomain.com
```

- Restart the backend. Gmail will accept SMTP connections using the app password.


## Contributing

Feel free to add more endpoints, email templates, or cron jobs as needed!

## License

ISC
