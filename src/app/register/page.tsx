'use client';

import { useState } from 'react';
import PersonalDetailsForm from '@/components/registration/PersonalDetailsForm';
import EventSelectionForm from '@/components/registration/EventSelectionForm';
import ReviewDetails from '@/components/registration/ReviewDetails';
import SuccessModal from '@/components/registration/SuccessModal';
import type { PersonalDetails, RegistrationData } from '@/lib/types';

type Step = 'personal' | 'events' | 'review' | 'payment' | 'success';

export default function RegisterPage() {
  const [currentStep, setCurrentStep] = useState<Step>('personal');
  const [personalDetails, setPersonalDetails] = useState<PersonalDetails | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [registrationId, setRegistrationId] = useState<string>('');

  const handlePersonalDetailsSubmit = (details: PersonalDetails) => {
    setPersonalDetails(details);
    setCurrentStep('events');
  };

  const handleEventSelectionSubmit = (eventIds: string[]) => {
    setSelectedEvents(eventIds);
    setCurrentStep('review');
  };

  const handleBack = () => {
    if (currentStep === 'events') setCurrentStep('personal');
    if (currentStep === 'review') setCurrentStep('events');
  };

  const handleProceedToPayment = async (data: RegistrationData) => {
    setCurrentStep('payment');

    try {
      // Create Razorpay order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: data.totalAmount }),
      });

      const order = await orderResponse.json();

      // Load Razorpay script
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);

      script.onload = () => {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: order.amount,
          currency: 'INR',
          name: 'Tech Aura UCPIT',
          description: 'Event Registration',
          order_id: order.id,
          handler: async function (response: any) {
            // Verify payment
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                ...response,
                registrationData: data,
              }),
            });

            const result = await verifyResponse.json();

            if (result.success) {
              setRegistrationId(result.registrationId);
              setCurrentStep('success');
            } else {
              alert('Payment verification failed. Please contact support.');
              setCurrentStep('review');
            }
          },
          modal: {
            ondismiss: function () {
              setCurrentStep('review');
            },
          },
          theme: {
            color: '#902CE8',
          },
        };

        const razorpay = new (window as any).Razorpay(options);
        razorpay.open();
      };
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment initiation failed. Please try again.');
      setCurrentStep('review');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4">
            {['Personal Details', 'Select Events', 'Review & Pay'].map((label, index) => {
              const stepNames: Step[] = ['personal', 'events', 'review'];
              const isActive = stepNames[index] === currentStep;
              const isCompleted = stepNames.indexOf(currentStep) > index;

              return (
                <div key={label} className="flex items-center gap-2">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${isCompleted
                        ? 'bg-primary text-white'
                        : isActive
                          ? 'bg-primary text-white ring-4 ring-primary/30'
                          : 'bg-muted text-muted-foreground'
                      }`}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <span
                    className={`hidden sm:block text-sm font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'
                      }`}
                  >
                    {label}
                  </span>
                  {index < 2 && (
                    <div
                      className={`hidden sm:block w-12 h-1 rounded ${isCompleted ? 'bg-primary' : 'bg-muted'
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        <div className="glass-panel rounded-2xl p-8">
          {currentStep === 'personal' && (
            <PersonalDetailsForm
              initialData={personalDetails}
              onSubmit={handlePersonalDetailsSubmit}
            />
          )}

          {currentStep === 'events' && (
            <EventSelectionForm
              initialSelection={selectedEvents}
              onSubmit={handleEventSelectionSubmit}
              onBack={handleBack}
            />
          )}

          {currentStep === 'review' && personalDetails && (
            <ReviewDetails
              personalDetails={personalDetails}
              selectedEvents={selectedEvents}
              onBack={handleBack}
              onProceedToPayment={handleProceedToPayment}
            />
          )}

          {currentStep === 'payment' && (
            <div className="text-center py-12">
              <div className="animate-spin w-16 h-16 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Processing payment...</p>
            </div>
          )}
        </div>
      </div>

      {currentStep === 'success' && (
        <SuccessModal registrationId={registrationId} />
      )}
    </div>
  );
}
