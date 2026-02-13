'use client';

interface Props {
    registrationId: string;
}

export default function SuccessModal({ registrationId }: Props) {
    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
            <div className="glass-panel rounded-2xl p-8 max-w-md w-full text-center stagger-reveal">
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                        className="w-12 h-12 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>

                <h2 className="text-3xl font-bold mb-4 text-glow">Registration Successful!</h2>

                <p className="text-muted-foreground mb-6">
                    Your payment has been processed successfully. You will receive a confirmation email shortly.
                </p>

                <div className="glass-card p-4 rounded-lg mb-6">
                    <p className="text-sm text-muted-foreground mb-1">Registration ID</p>
                    <p className="text-2xl font-bold text-primary font-mono">{registrationId}</p>
                </div>

                <p className="text-sm text-muted-foreground mb-6">
                    Please save this registration ID for future reference.
                </p>

                <button
                    onClick={() => window.location.href = '/'}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/50"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
}
