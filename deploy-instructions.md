# Deploy New Pages to Netlify

## New Pages Created

I've created 2 new pages to handle your edge function return URLs that were redirecting to `stripe.com`:

1. **`connect-success.html`** - For when coaches complete initial Stripe Connect onboarding
2. **`verification-complete.html`** - For when coaches complete additional verification requirements

## How to Deploy

### Option 1: Drag & Drop (Easiest)
1. Go to your [Netlify dashboard](https://app.netlify.com)
2. Find your site (teamsfc.com)
3. Go to **"Deploys"** tab
4. Drag the entire `web-app` folder to the deploy area
5. Netlify will automatically update your site

### Option 2: Git Integration (Recommended)
1. Push your changes to GitHub
2. Connect your GitHub repo to Netlify
3. Netlify will automatically deploy when you push changes

### Option 3: Manual Upload
1. In Netlify dashboard, go to **"Files"** tab
2. Upload the new HTML files:
   - `connect-success.html`
   - `payment-success.html` 
   - `payment-cancel.html`

## Updated Edge Functions

I've updated the Supabase edge functions that were redirecting to `stripe.com`:

### `create-connect-account`
- Now returns to: `https://teamsfc.com/connect-success.html`

### `get-verification-link`
- Now returns to: `https://teamsfc.com/verification-complete.html`

### `create-checkout-session` (UNCHANGED)
- This function remains unchanged as requested - it still requires `successUrl` and `cancelUrl` parameters

## Test the Pages

After deployment, test these URLs:
- `https://teamsfc.com/connect-success.html`
- `https://teamsfc.com/verification-complete.html`

## Features of the New Pages

✅ **Professional Design** - Matches your main site  
✅ **Responsive** - Works on all devices  
✅ **Interactive** - Animations and effects  
✅ **Informative** - Clear next steps for users  
✅ **SEO Optimized** - Proper meta tags  
✅ **Accessible** - Good contrast and readability  

## Next Steps

1. **Deploy the new pages** to Netlify
2. **Test the URLs** to make sure they work
3. **Update your app** to use these URLs in your edge function calls
4. **Monitor user feedback** from these pages

The pages will now provide proper feedback to users instead of redirecting to Stripe's generic pages! 