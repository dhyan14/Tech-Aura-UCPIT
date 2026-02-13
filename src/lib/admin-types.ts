export interface Registration {
    timestamp: string;
    registrationId: string;
    fullName: string;
    email: string;
    mobile: string;
    college: string;
    courseSemester: string;
    selectedEvents: string;
    totalAmount: number;
    paymentStatus: string;
    paymentId: string;
}

export interface RegistrationStats {
    totalRegistrations: number;
    totalRevenue: number;
    eventCounts: Record<string, number>;
}

export interface RegistrationsResponse {
    success: boolean;
    registrations: Registration[];
    stats: RegistrationStats;
    error?: string;
}
