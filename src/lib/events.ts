export type EventCategory = 'tech' | 'esports' | 'fun' | 'concert';

export interface Event {
    id: string;
    name: string;
    price: number;
    category: EventCategory;
}

export const EVENTS: Event[] = [
    // Tech Arena
    { id: 'hackathon', name: 'Hackathon', price: 200, category: 'tech' },
    { id: 'project-showcase', name: 'Project Showcase', price: 150, category: 'tech' },
    { id: 'workshop', name: 'Workshop', price: 300, category: 'tech' },
    { id: 'code-sprint', name: 'Code Sprint', price: 150, category: 'tech' },
    { id: 'forensics-hunt', name: 'Digital Forensics Hunt', price: 150, category: 'tech' },
    { id: 'algorithm-relay', name: 'Algorithm Relay', price: 150, category: 'tech' },

    // Esports Arena
    { id: 'bgmi', name: 'BGMI', price: 100, category: 'esports' },
    { id: 'free-fire', name: 'Free Fire', price: 100, category: 'esports' },

    // Fun & Mind Arena
    { id: 'treasure-hunt', name: 'Treasure Hunt', price: 50, category: 'fun' },
    { id: 'quiz', name: 'Quiz', price: 50, category: 'fun' },
    { id: 'memory-tray', name: 'Memory Tray', price: 50, category: 'fun' },
    { id: 'debate', name: 'Debate', price: 50, category: 'fun' },
    { id: 'relay-race', name: 'Relay Race With Dares', price: 50, category: 'fun' },
    { id: 'volleyball', name: 'Volleyball', price: 50, category: 'fun' },

    // Night Concert
    { id: 'night-performances', name: 'Night Life Performances', price: 300, category: 'concert' },
];

export const CATEGORY_LABELS: Record<EventCategory, string> = {
    tech: 'Tech Arena',
    esports: 'Esports Arena',
    fun: 'Fun & Mind Arena',
    concert: 'Night Concert',
};

export function getEventsByCategory(category: EventCategory): Event[] {
    return EVENTS.filter(event => event.category === category);
}

export function calculateTotal(selectedEventIds: string[]): number {
    return EVENTS
        .filter(event => selectedEventIds.includes(event.id))
        .reduce((total, event) => total + event.price, 0);
}

export function getEventById(id: string): Event | undefined {
    return EVENTS.find(event => event.id === id);
}
