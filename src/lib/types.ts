export interface PersonalDetails {
    fullName: string;
    email: string;
    mobile: string;
    college: string;
    courseSemester: string;
}

export interface RegistrationData extends PersonalDetails {
    selectedEvents: string[];
    totalAmount: number;
    paymentId?: string;
    registrationId?: string;
}

export interface RazorpayOrder {
    id: string;
    amount: number;
    currency: string;
}

export interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}
