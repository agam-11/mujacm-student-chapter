# Medium Blog Integration Setup

## How to Connect Your Medium Blog

The Blogs page is already configured to fetch articles from Medium using RSS feeds. Follow these steps to connect your Medium account:

### Step 1: Get Your Medium Username or Publication

1. Go to your Medium profile or publication
2. Your username appears in the URL: `https://medium.com/@YOUR_USERNAME`
3. For publications: `https://medium.com/YOUR_PUBLICATION_NAME`

### Step 2: Update the BlogsPage Component

Open `src/pages/BlogsPage.jsx` and find this line (around line 104):

```javascript
const mediumUsername = "@medium"; // Change this to your Medium username
```

Replace `@medium` with your actual Medium username or publication name:

**For personal accounts:**
```javascript
const mediumUsername = "@your-username";
```

**For publications:**
```javascript
const mediumUsername = "your-publication-name";
```

### Step 3: Save and Test

1. Save the file
2. The page will automatically reload
3. Your Medium articles will appear on the Blogs page!

## How It Works

- The integration uses Medium's RSS feed: `https://medium.com/feed/@USERNAME`
- Articles are fetched via the RSS2JSON API (free service)
- The app displays the 6 most recent articles
- If Medium fails to load, sample blogs are shown as a fallback

## RSS2JSON API Limitations

The free RSS2JSON service has these limits:
- 10,000 requests per day
- No authentication required
- May have occasional rate limiting

### Alternative: Using Your Own RSS Parser

If you need unlimited requests, you can:
1. Set up your own backend API endpoint
2. Use a different RSS parsing service
3. Implement server-side caching

## Customization Options

You can customize the blog display by modifying these settings in `BlogsPage.jsx`:

```javascript
// Change number of blogs displayed
const transformedBlogs = data.items.slice(0, 6).map(...) // Change 6 to any number

// Modify read time calculation
const readTime = Math.ceil(wordCount / 200); // Change 200 words/min
```

## Troubleshooting

**Blogs not loading?**
- Check your internet connection
- Verify your Medium username is correct
- Check browser console for errors
- Ensure your Medium profile is public

**Sample blogs showing instead?**
- This is normal if Medium fetch fails
- Check the console for error messages
- Verify the RSS feed URL is accessible

## Example Usernames

```javascript
// Personal account
const mediumUsername = "@yourname";

// Publication
const mediumUsername = "towards-data-science";

// Another publication format
const mediumUsername = "the-startup";
```
