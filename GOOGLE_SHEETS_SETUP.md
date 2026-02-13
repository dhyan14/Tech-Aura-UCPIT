# Tech Aura UCPIT - Event Registration System

## Google Sheets Setup Instructions

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Tech Aura Registrations" or similar

### Step 2: Deploy Google Apps Script

1. In your Google Sheet, go to **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy the entire code from `google-apps-script.js` file in your project
4. Paste it into the Apps Script editor
5. Save the project (name it "Registration Webhook")

### Step 3: Setup Sheet Headers

1. In the Apps Script editor, select the `setupSheet` function from the dropdown
2. Click **Run** button
3. Grant permissions when prompted
4. Go back to your Google Sheet - you should see headers added

### Step 4: Deploy as Web App

1. In Apps Script editor, click **Deploy** → **New deployment**
2. Click gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - Description: "Registration Webhook"
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Click **Deploy**
6. **Copy the Web App URL** (it will look like: `https://script.google.com/macros/s/...`)

### Step 5: Update Environment Variables on Vercel

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add the following variables:

```
NEXT_PUBLIC_RAZORPAY_KEY_ID = rzp_test_SFfHGHFsKXNYiS
RAZORPAY_KEY_SECRET = EcLYOBDGcSrN0BxJY1gLcdnI
GOOGLE_SHEETS_WEBHOOK_URL = [YOUR_WEB_APP_URL_FROM_STEP_4]
```

4. Click **Save**
5. Redeploy your application

## Google Sheet Column Structure

The sheet will have these columns:
1. Timestamp
2. Registration ID
3. Full Name
4. Email
5. Mobile
6. College/University
7. Course & Semester
8. Selected Events
9. Total Amount
10. Payment Status
11. Payment ID

## Testing

After deployment:
1. Visit `/register` page on your Vercel URL
2. Fill in personal details
3. Select events
4. Review details
5. Complete payment using test card:
   - Card Number: 4111 1111 1111 1111
   - CVV: Any 3 digits
   - Expiry: Any future date
6. Check Google Sheet for new entry

## Event Categories & Pricing

### Tech Arena
- Hackathon – ₹200
- Project Showcase – ₹150
- Workshop – ₹300
- Code Sprint – ₹150
- Digital Forensics Hunt – ₹150
- Algorithm Relay – ₹150

### Esports Arena
- BGMI – ₹100
- Free Fire – ₹100

### Fun & Mind Arena
- Treasure Hunt – ₹50
- Quiz – ₹50
- Memory Tray – ₹50
- Debate – ₹50
- Relay Race With Dares – ₹50
- Volleyball – ₹50

### Night Concert
- Night Life Performances – ₹300
