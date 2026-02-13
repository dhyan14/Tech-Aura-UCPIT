// Google Apps Script Code for Google Sheets Integration
// Deploy this as a Web App in Google Apps Script
// This version supports both POST (write) and GET (read) requests

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

// NEW: Handle GET requests to read data
function doGet(e) {
    try {
        const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
        const data = sheet.getDataRange().getValues();

        // Skip header row (first row) and convert to objects
        const headers = data[0];
        const registrations = [];

        for (let i = 1; i < data.length; i++) {
            const row = data[i];
            registrations.push({
                timestamp: row[0],
                registrationId: row[1],
                fullName: row[2],
                email: row[3],
                mobile: row[4],
                college: row[5],
                courseSemester: row[6],
                selectedEvents: row[7],
                totalAmount: row[8],
                paymentStatus: row[9],
                paymentId: row[10]
            });
        }

        // Calculate statistics
        const totalRegistrations = registrations.length;
        const totalRevenue = registrations.reduce((sum, reg) => sum + (parseFloat(reg.totalAmount) || 0), 0);

        // Event breakdown
        const eventCounts = {};
        registrations.forEach(reg => {
            const events = reg.selectedEvents.split(',').map(e => e.trim());
            events.forEach(event => {
                eventCounts[event] = (eventCounts[event] || 0) + 1;
            });
        });

        const response = {
            success: true,
            registrations: registrations,
            stats: {
                totalRegistrations,
                totalRevenue,
                eventCounts
            }
        };

        return ContentService.createTextOutput(JSON.stringify(response))
            .setMimeType(ContentService.MimeType.JSON);

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
