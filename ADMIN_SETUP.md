# Admin Dashboard Google Sheets Integration - Setup Instructions

## What You Need to Do

### Step 1: Update Your Google Apps Script

1. **Open your Google Sheet** that stores registration data
2. Go to **Extensions** → **Apps Script**
3. **Replace the existing code** with the updated version from `google-apps-script.js`
4. Click **Save** (💾 icon)

### Step 2: Redeploy the Web App

Since we added GET request support, you need to redeploy:

1. Click **Deploy** → **Manage deployments**
2. Click the **✏️ Edit** icon on your existing deployment
3. Under "Version", select **New version**
4. Add description: "Added GET support for admin dashboard"
5. Click **Deploy**
6. Click **Done**

> **Note:** The Web App URL remains the same, so you don't need to update your `.env.local` file!

### Step 3: Verify Everything Works

#### Test Locally

1. Make sure your `.env.local` has the Google Sheets webhook URL:
   ```
   GOOGLE_SHEETS_WEBHOOK_URL=your_apps_script_url_here
   ```

2. Start your development server:
   ```bash
   npm run dev
   ```

3. Navigate to `http://localhost:3000/admin`

4. Login with:
   - Email: `admin@aura.tech`
   - Password: `password123`

5. Check that:
   - ✅ Dashboard shows real registration count and revenue
   - ✅ Registrations tab displays actual data from Google Sheets
   - ✅ Auto-refresh works (data updates every 30 seconds)
   - ✅ Search functionality filters registrations
   - ✅ Export button downloads CSV file

#### Test on Vercel (Production)

1. **Make sure** your Vercel environment variables are set:
   - `GOOGLE_SHEETS_WEBHOOK_URL`
   - `NEXT_PUBLIC_RAZORPAY_KEY_ID`
   - `RAZORPAY_KEY_SECRET`

2. Push your changes to GitHub (if not already done):
   ```bash
   git add .
   git commit -m "Add real-time Google Sheets integration to admin dashboard"
   git push
   ```

3. Vercel will automatically deploy

4. Visit your production site's admin page and verify all features work

## Features Implemented

### Dashboard Tab
- **Live Statistics**: Total registrations, revenue, and event counts
- **Recent Registrations**: Shows last 5 registrations
- **Auto-refresh**: Data updates every 30 seconds
- **Manual Refresh**: Button to force immediate data fetch

### Registrations Tab
- **Full Registration List**: All participant data from Google Sheets
- **Real-time Search**: Filter by name, email, phone, registration ID, or events
- **Detailed View**: Registration ID, name, contact info, college, events, amount, timestamp
- **Export to CSV**: Download complete registration data
- **Auto-refresh**: Updates every 30 seconds when on this tab

### Data Flow
```
User Registers → Payment Success → Data sent to Google Sheets
                                          ↓
Admin Dashboard ← Fetches data every 30s ← Google Apps Script (GET)
```

## Troubleshooting

### "No registrations found" on Admin Dashboard

**Cause:** No test registrations exist yet, or webhook URL not configured

**Solution:**
1. Complete a test registration at `/register`
2. Verify data appears in Google Sheet
3. Refresh admin dashboard

### "Failed to fetch registrations" error

**Cause:** Google Sheets webhook URL missing or incorrect

**Solution:**
1. Check `.env.local` (local) or Vercel env vars (production)
2. Verify the Apps Script is deployed as a Web App
3. Make sure you redeployed after adding GET support

### Data not auto-refreshing

**Cause:** You're not on Dashboard or Registrations tab

**Solution:** Auto-refresh only works when viewing these tabs. Switch to another tab and back to trigger refresh.

## Next Steps (Optional Enhancements)

- Add authentication middleware to protect admin routes
- Implement role-based access control
- Add data visualization (charts/graphs)
- Enable event-wise filtering
- Add date range filters
- Implement pagination for large datasets
