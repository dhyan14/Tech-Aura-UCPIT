import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import type { RegistrationData } from '@/lib/types';

function generateRegistrationId(): string {
    return `TA${Date.now()}${Math.random().toString(36).substring(2, 7).toUpperCase()}`;
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature, registrationData } = body;

        // Verify signature
        const generatedSignature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest('hex');

        if (generatedSignature !== razorpay_signature) {
            return NextResponse.json(
                { success: false, error: 'Invalid signature' },
                { status: 400 }
            );
        }

        // Generate registration ID
        const registrationId = generateRegistrationId();

        // Prepare data for Google Sheets
        const data: RegistrationData & { paymentId: string; registrationId: string } = {
            ...registrationData,
            paymentId: razorpay_payment_id,
            registrationId,
        };

        // Send to Google Sheets
        const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;

        if (webhookUrl && webhookUrl !== 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
            await fetch(webhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
        }

        return NextResponse.json({
            success: true,
            registrationId,
        });
    } catch (error) {
        console.error('Error verifying payment:', error);
        return NextResponse.json(
            { success: false, error: 'Payment verification failed' },
            { status: 500 }
        );
    }
}
