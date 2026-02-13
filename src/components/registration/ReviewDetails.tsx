'use client';

import { EVENTS, calculateTotal } from '@/lib/events';
import type { PersonalDetails, RegistrationData } from '@/lib/types';

interface Props {
    personalDetails: PersonalDetails;
    selectedEvents: string[];
    onBack: () => void;
    onProceedToPayment: (data: RegistrationData) => void;
}

export default function ReviewDetails({
    personalDetails,
    selectedEvents,
    onBack,
    onProceedToPayment,
}: Props) {
    const total = calculateTotal(selectedEvents);

    const selectedEventDetails = selectedEvents
        .map((id) => EVENTS.find((e) => e.id === id))
        .filter(Boolean);

    const handleProceed = () => {
        const registrationData: RegistrationData = {
            ...personalDetails,
            selectedEvents,
            totalAmount: total,
        };
        onProceedToPayment(registrationData);
    };

    return (
        <div className="stagger-reveal">
            <h2 className="text-3xl font-bold mb-2 text-glow">Review Details</h2>
            <p className="text-muted-foreground mb-8">Please verify your information before payment</p>

            {/* Personal Details */}
            <div className="glass-card p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>👤</span> Personal Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-muted-foreground">Full Name</p>
                        <p className="font-medium">{personalDetails.fullName}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <p className="font-medium">{personalDetails.email}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">Mobile Number</p>
                        <p className="font-medium">{personalDetails.mobile}</p>
                    </div>
                    <div>
                        <p className="text-sm text-muted-foreground">College/University</p>
                        <p className="font-medium">{personalDetails.college}</p>
                    </div>
                    <div className="md:col-span-2">
                        <p className="text-sm text-muted-foreground">Course & Semester</p>
                        <p className="font-medium">{personalDetails.courseSemester}</p>
                    </div>
                </div>
            </div>

            {/* Selected Events */}
            <div className="glass-card p-6 rounded-xl mb-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <span>🎯</span> Selected Events
                </h3>
                <div className="space-y-3">
                    {selectedEventDetails.map((event) => (
                        <div
                            key={event!.id}
                            className="flex items-center justify-between p-3 bg-background/50 rounded-lg border border-border"
                        >
                            <span className="font-medium">{event!.name}</span>
                            <span className="text-accent font-bold">₹{event!.price}</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Grand Total */}
            <div className="glass-card p-6 rounded-xl mb-8 border-2 border-primary/50 accent-glow">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Grand Total</p>
                        <p className="text-4xl font-bold text-primary mt-1">₹{total}</p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total Events</p>
                        <p className="text-2xl font-bold">{selectedEvents.length}</p>
                    </div>
                </div>
            </div>

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-3 px-6 rounded-lg transition-all"
                >
                    Edit Selection
                </button>
                <button
                    type="button"
                    onClick={handleProceed}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/50"
                >
                    Proceed to Payment
                </button>
            </div>
        </div>
    );
}
