import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

        if (!webhookUrl || webhookUrl === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            return NextResponse.json(
                {
                    success: false,
                    error: 'Google Sheets webhook not configured',
                    registrations: [],
                    stats: {
                        totalRegistrations: 0,
                        totalRevenue: 0,
                        eventCounts: {}
                    }
                },
                { status: 200 }
            );
        }

        // Fetch data from Google Sheets via Apps Script
        const response = await fetch(webhookUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!data.success) {
            throw new Error(data.error || 'Failed to fetch data');
        }

        return NextResponse.json({
            success: true,
            registrations: data.registrations || [],
            stats: data.stats || {
                totalRegistrations: 0,
                totalRevenue: 0,
                eventCounts: {}
            }
        });

    } catch (error) {
        console.error('Error fetching registrations:', error);
        return NextResponse.json(
            {
                success: false,
                error: 'Failed to fetch registrations',
                registrations: [],
                stats: {
                    totalRegistrations: 0,
                    totalRevenue: 0,
                    eventCounts: {}
                }
            },
            { status: 500 }
        );
    }
}
