'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { PersonalDetails } from '@/lib/types';

const personalDetailsSchema = z.object({
    fullName: z.string().min(3, 'Name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    mobile: z.string().regex(/^[6-9]\d{9}$/, 'Invalid mobile number'),
    college: z.string().min(3, 'College name is required'),
    courseSemester: z.string().min(3, 'Course and semester is required'),
});

interface Props {
    initialData: PersonalDetails | null;
    onSubmit: (data: PersonalDetails) => void;
}

export default function PersonalDetailsForm({ initialData, onSubmit }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonalDetails>({
        resolver: zodResolver(personalDetailsSchema),
        defaultValues: initialData || undefined,
    });

    return (
        <div className="stagger-reveal">
            <h2 className="text-3xl font-bold mb-2 text-glow">Personal Details</h2>
            <p className="text-muted-foreground mb-8">Please fill in your information</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium mb-2">Full Name *</label>
                    <input
                        {...register('fullName')}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Enter your full name"
                    />
                    {errors.fullName && (
                        <p className="text-destructive text-sm mt-1">{errors.fullName.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Email ID *</label>
                    <input
                        {...register('email')}
                        type="email"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="your.email@example.com"
                    />
                    {errors.email && (
                        <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Mobile Number *</label>
                    <input
                        {...register('mobile')}
                        type="tel"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="9876543210"
                        maxLength={10}
                    />
                    {errors.mobile && (
                        <p className="text-destructive text-sm mt-1">{errors.mobile.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">College/University Name *</label>
                    <input
                        {...register('college')}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="Enter your college/university name"
                    />
                    {errors.college && (
                        <p className="text-destructive text-sm mt-1">{errors.college.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Course and Semester *</label>
                    <input
                        {...register('courseSemester')}
                        type="text"
                        className="w-full px-4 py-3 rounded-lg bg-background border border-input focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        placeholder="e.g., B.Tech CSE - Semester 5"
                    />
                    {errors.courseSemester && (
                        <p className="text-destructive text-sm mt-1">{errors.courseSemester.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/50"
                >
                    Continue to Event Selection
                </button>
            </form>
        </div>
    );
}
