# Contact Form Setup Instructions (Formspree)

Your contact page is ready! All form submissions will be sent to **steve@teamsfc.com**.

## Quick Setup (5 minutes)

### Step 1: Create a Formspree Account

1. Go to https://formspree.io
2. Sign up for a **FREE account** using **steve@teamsfc.com**
3. Verify your email address

### Step 2: Create a New Form

1. In your Formspree dashboard, click "New Project" or "+ New Form"
2. Give it a name like "TEAMS FC Contact Form"
3. Formspree will generate a unique Form ID (looks like: `xwkgybqr`)

### Step 3: Update contact.html

1. Open `contact.html`
2. Find line 392 (the form action):
   ```html
   <form id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```

3. Replace `YOUR_FORM_ID` with your actual Form ID:
   ```html
   <form id="contactForm" action="https://formspree.io/f/xwkgybqr" method="POST">
   ```

4. Save the file

### Step 4: Update Success Redirect (Optional)

On line 410, update the success redirect URL with your actual domain:
```html
<input type="hidden" name="_next" value="https://teamsfc.com/contact.html?success=true">
```

For testing locally, you can use:
```html
<input type="hidden" name="_next" value="http://localhost:3000/contact.html?success=true">
```

## That's It!

Your contact form is now live. When someone submits the form:
1. They'll see a success message
2. You'll receive an email at **steve@teamsfc.com** with their message
3. You can reply directly from your email

## Features Included

- ✓ All submissions sent to steve@teamsfc.com
- ✓ Success message after submission
- ✓ Reply-to email automatically set to sender
- ✓ Spam protection (Formspree includes reCAPTCHA)
- ✓ Form data stored in Formspree dashboard
- ✓ **Free tier: 50 submissions per month**

## Testing

1. Start your server: `npm start`
2. Go to: http://localhost:3000/contact.html
3. Fill out and submit the form
4. Check steve@teamsfc.com for the email

## Upgrading (if needed)

Free tier includes 50 submissions/month. If you need more:
- Basic Plan: $10/month for 1,000 submissions
- Pro Plan: $40/month for 10,000 submissions

## Alternative: Use Netlify Forms (if hosting on Netlify)

If you deploy to Netlify, you can use their built-in form handling:
1. Add `netlify` attribute to the form tag
2. Remove the Formspree action
3. Forms will appear in your Netlify dashboard

## Support

- Formspree Docs: https://help.formspree.io
- Email: steve@teamsfc.com

