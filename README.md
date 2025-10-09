# JOGAFC Website Deployment Guide

This guide will help you deploy your JOGAFC website to your GoDaddy domain.

## Files Included

- `index.html` - Main landing page
- `README.md` - This deployment guide
- `.well-known/` - Directory for SSL certificates and other web standards

## Deployment Steps

### Option 1: GoDaddy Website Builder (Recommended for beginners)

1. **Log into your GoDaddy account**
   - Go to [godaddy.com](https://godaddy.com)
   - Sign in to your account

2. **Access Website Builder**
   - Go to "My Products" → "Web Hosting"
   - Click on "Manage" next to your hosting plan
   - Look for "Website Builder" or "cPanel"

3. **Upload via File Manager**
   - In cPanel, find "File Manager"
   - Navigate to the `public_html` folder
   - Upload the `index.html` file to this directory
   - The website will be accessible at your domain

### Option 2: FTP Upload (For advanced users)

1. **Get FTP credentials from GoDaddy**
   - Log into your GoDaddy account
   - Go to "My Products" → "Web Hosting"
   - Click "Manage" → "FTP Users"
   - Create or note your FTP username and password

2. **Use an FTP client**
   - Download FileZilla or similar FTP client
   - Connect using your domain and FTP credentials
   - Upload `index.html` to the `public_html` folder

### Option 3: GoDaddy File Manager

1. **Access File Manager**
   - Log into GoDaddy hosting control panel
   - Find "File Manager" in the tools section
   - Navigate to `public_html` directory

2. **Upload files**
   - Click "Upload" or "Upload Files"
   - Select the `index.html` file
   - The website will be live at your domain

## Customization

### Update App Store Links
Edit the download buttons in `index.html`:
```html
<a href="YOUR_APP_STORE_LINK" class="btn btn-primary">Download for iOS</a>
<a href="YOUR_GOOGLE_PLAY_LINK" class="btn btn-secondary">Download for Android</a>
```

### Update Social Media Links
Edit the footer section with your actual social media URLs:
```html
<li><a href="YOUR_INSTAGRAM_URL">Instagram</a></li>
<li><a href="YOUR_X_URL">X</a></li>
```

### Update Contact Information
Add your actual contact information in the footer section.

## SEO Optimization

The website includes:
- Meta description for search engines
- Responsive design for mobile devices
- Fast loading with optimized CSS
- Semantic HTML structure

## Testing

After deployment:
1. Visit your domain to ensure the website loads
2. Test on mobile devices
3. Check all links work properly
4. Verify contact forms (if added)

## Support

If you need help with deployment:
1. Contact GoDaddy support for hosting issues
2. Check GoDaddy's knowledge base for detailed guides
3. Consider using GoDaddy's Website Builder for easier management

## Next Steps

Consider adding:
- Contact form
- Blog section
- App screenshots
- Video demonstrations
- Newsletter signup
- Analytics tracking 