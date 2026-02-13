
"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Clock, MapPin } from 'lucide-react';

const scheduleData = {
  day1: [
    { time: "09:00 AM", event: "Grand Opening Ceremony", location: "Main Arena", description: "Inauguration and Keynote speech by industry leaders." },
    { time: "11:30 AM", event: "Code-A-Thon Kickoff", location: "Dev Lab", description: "Problem statement release and environment setup." },
    { time: "02:00 PM", event: "AI Workshop Series", location: "Room 404", description: "Hands-on session with Large Language Models." },
    { time: "05:00 PM", event: "Tech Talk: Future of VR", location: "Auditorium", description: "Exploring spatial computing and metaverse developments." }
  ],
  day2: [
    { time: "10:00 AM", event: "Robo-Combat Prelims", location: "Mech Ring", description: "Initial rounds of robot battles." },
    { time: "12:30 PM", event: "UX Design Sprint", location: "Creative Hub", description: "Rapid prototyping challenge for app designers." },
    { time: "03:30 PM", event: "Gaming Tournament: Finals", location: "Gaming Lounge", description: "Top 8 players face off for the ultimate prize." },
    { time: "08:00 PM", event: "Networking Night", location: "Sky Deck", description: "Informal meet-up with mentors and sponsors." }
  ],
  day3: [
    { time: "10:00 AM", event: "Startup Pitch Deck", location: "Boardroom", description: "Finalists present their business ideas to VC panel." },
    { time: "01:00 PM", event: "Hardware Hackathon Finale", location: "Makerspace", description: "Demo day for IoT and physical projects." },
    { time: "04:00 PM", event: "Prize Distribution", location: "Main Arena", description: "Crowning the winners across all tracks." },
    { time: "06:00 PM", event: "Closing Musical Night", location: "Open Grounds", description: "Festival wrap-up with a live electronic music performance." }
  ]
};

export default function SchedulePage() {
  return (
    <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto min-h-screen">
      <div className="text-center mb-16 stagger-reveal">
        <h1 className="font-headline text-5xl md:text-6xl mb-4 tracking-tighter">FESTIVAL <span className="text-accent">TIMELINE</span></h1>
        <p className="text-muted-foreground text-lg">Three days of intense innovation, learning, and celebration.</p>
      </div>

      <Tabs defaultValue="day1" className="w-full stagger-reveal">
        <TabsList className="grid w-full grid-cols-3 bg-secondary/30 rounded-none mb-12 p-1">
          <TabsTrigger value="day1" className="font-headline text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white rounded-none py-3 uppercase">Day 01</TabsTrigger>
          <TabsTrigger value="day2" className="font-headline text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white rounded-none py-3 uppercase">Day 02</TabsTrigger>
          <TabsTrigger value="day3" className="font-headline text-xs tracking-widest data-[state=active]:bg-primary data-[state=active]:text-white rounded-none py-3 uppercase">Day 03</TabsTrigger>
        </TabsList>

        {(Object.keys(scheduleData) as Array<keyof typeof scheduleData>).map((dayKey) => (
          <TabsContent key={dayKey} value={dayKey} className="space-y-8">
            {scheduleData[dayKey].map((item, idx) => (
              <div key={idx} className="relative pl-8 md:pl-12 border-l-2 border-primary/20 hover:border-primary transition-colors py-4 group animate-in fade-in slide-in-from-left duration-500">
                <div className="absolute -left-[9px] top-5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors" />
                
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2 text-accent text-sm font-headline tracking-widest uppercase">
                    <Clock className="w-4 h-4" />
                    {item.time}
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground text-xs uppercase font-medium">
                    <MapPin className="w-3 h-3 text-primary" />
                    {item.location}
                  </div>
                </div>

                <h3 className="text-2xl font-headline mb-2 text-white group-hover:text-primary transition-colors">
                  {item.event}
                </h3>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
