// Google Apps Script Code for Google Sheets Integration
// Deploy this as a Web App in Google Apps Script

function doPost(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data = JSON.parse(e.postData.contents);

        // Get event names from IDs
        const eventNames = data.selectedEvents.join(', ');

        // Add row to sheet
        sheet.appendRow([
            new Date(), // Timestamp
            data.registrationId,
            data.fullName,
            data.email,
            data.mobile,
            data.college,
            data.courseSemester,
            eventNames,
            data.totalAmount,
            'Paid',
            data.paymentId
        ]);

        return ContentService.createTextOutput(JSON.stringify({
            success: true,
            message: 'Data saved successfully'
        })).setMimeType(ContentService.MimeType.JSON);

    } catch (error) {
        return ContentService.createTextOutput(JSON.stringify({
            success: false,
            error: error.toString()
        })).setMimeType(ContentService.MimeType.JSON);
    }
}

// Setup function to create headers (run once)
function setupSheet() {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    sheet.appendRow([
        'Timestamp',
        'Registration ID',
        'Full Name',
        'Email',
        'Mobile',
        'College/University',
        'Course & Semester',
        'Selected Events',
        'Total Amount',
        'Payment Status',
        'Payment ID'
    ]);

    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 11);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4A90E2');
    headerRange.setFontColor('#FFFFFF');
}
