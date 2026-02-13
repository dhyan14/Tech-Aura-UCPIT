'use client';

import { useState, useEffect } from 'react';
import { EVENTS, CATEGORY_LABELS, getEventsByCategory, calculateTotal } from '@/lib/events';
import type { EventCategory } from '@/lib/events';

interface Props {
    initialSelection: string[];
    onSubmit: (selectedEvents: string[]) => void;
    onBack: () => void;
}

const categoryIcons: Record<EventCategory, string> = {
    tech: '💻',
    esports: '🎮',
    fun: '🎯',
    concert: '🎤',
};

export default function EventSelectionForm({ initialSelection, onSubmit, onBack }: Props) {
    const [selectedEvents, setSelectedEvents] = useState<string[]>(initialSelection);
    const [error, setError] = useState('');

    const total = calculateTotal(selectedEvents);

    const handleEventToggle = (eventId: string) => {
        setSelectedEvents((prev) =>
            prev.includes(eventId)
                ? prev.filter((id) => id !== eventId)
                : [...prev, eventId]
        );
        setError('');
    };

    const handleSubmit = () => {
        if (selectedEvents.length === 0) {
            setError('Please select at least one event');
            return;
        }
        onSubmit(selectedEvents);
    };

    const categories: EventCategory[] = ['tech', 'esports', 'fun', 'concert'];

    return (
        <div>
            <h2 className="text-3xl font-bold mb-2 text-glow">Select Events</h2>
            <p className="text-muted-foreground mb-6">Choose the events you want to participate in</p>

            <div className="space-y-8 mb-6">
                {categories.map((category) => {
                    const events = getEventsByCategory(category);
                    return (
                        <div key={category} className="glass-card p-6 rounded-xl">
                            <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <span className="text-2xl">{categoryIcons[category]}</span>
                                {CATEGORY_LABELS[category]}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {events.map((event) => {
                                    const isSelected = selectedEvents.includes(event.id);
                                    return (
                                        <label
                                            key={event.id}
                                            className={`flex items-center justify-between p-4 rounded-lg border-2 cursor-pointer transition-all ${isSelected
                                                    ? 'border-primary bg-primary/10'
                                                    : 'border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <input
                                                    type="checkbox"
                                                    checked={isSelected}
                                                    onChange={() => handleEventToggle(event.id)}
                                                    className="w-5 h-5 rounded accent-primary cursor-pointer"
                                                />
                                                <span className="font-medium">{event.name}</span>
                                            </div>
                                            <span className="text-accent font-bold">₹{event.price}</span>
                                        </label>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Total Display */}
            <div className="glass-card p-6 rounded-xl mb-6 sticky bottom-4">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm text-muted-foreground">Total Amount</p>
                        <p className="text-3xl font-bold text-primary">₹{total}</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''} selected
                        </p>
                    </div>
                </div>
            </div>

            {error && <p className="text-destructive text-sm mb-4">{error}</p>}

            <div className="flex gap-4">
                <button
                    type="button"
                    onClick={onBack}
                    className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground font-semibold py-3 px-6 rounded-lg transition-all"
                >
                    Back
                </button>
                <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-primary/50"
                >
                    Review Details
                </button>
            </div>
        </div>
    );
}
