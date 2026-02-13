
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Github, Twitter, Linkedin, ExternalLink, Contact } from 'lucide-react';

const team = [
  { 
    name: "Shaikh Mohammed Khizer", 
    role: "Student Organizer", 
    enrollment: "25CS501D053", 
    imgId: "team-khizer", 
    bio: "Core Committee - B.Tech CSE, Semester 4",
    linkedin: "https://in.linkedin.com/in/mohammad-khizer-shaikh-14a362275"
  },
  { 
    name: "Saiyad Muhammad Affan", 
    role: "Student Organizer", 
    enrollment: "25CS501D054", 
    imgId: "team-member-2", 
    bio: "Core Committee - B.Tech CSE, Semester 4",
    linkedin: "https://www.linkedin.com/in/muhammed-affan-saiyed-a61362314"
  },
  { 
    name: "Qureshi Moin Husen", 
    role: "Student Organizer", 
    enrollment: "25CS501D055", 
    imgId: "team-member-1", 
    bio: "Core Committee - B.Tech CSE, Semester 4"
  },
  { 
    name: "Bukhari Mohammed Sibtain", 
    role: "Student Organizer", 
    enrollment: "25CS501D056", 
    imgId: "team-member-2", 
    bio: "Core Committee - B.Tech CSE, Semester 4"
  },
  { 
    name: "Multani Rahil", 
    role: "Student Organizer", 
    enrollment: "25CS501D058", 
    imgId: "team-rahil", 
    bio: "Core Committee - B.Tech CSE, Semester 4",
    linkedin: "https://in.linkedin.com/in/multani-rahil-7507a2269"
  }
];

export default function TeamPage() {
  return (
    <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="mb-20 stagger-reveal text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 glass-panel border-primary/30 rounded-full mb-6 mx-auto">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-headline tracking-[0.2em] text-primary uppercase">Active Personnel</span>
        </div>
        <h1 className="font-headline text-5xl md:text-7xl mb-4 tracking-tighter uppercase text-white">
          CORE <span className="text-primary">ARCHITECTS</span>
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto uppercase tracking-[0.4em] text-[10px] font-bold">
          Student Organizers | B.Tech CSE Semester 4
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-24 stagger-reveal">
        {team.map((member, idx) => {
          const img = PlaceHolderImages.find(i => i.id === member.imgId);
          const isShifted = idx % 2 !== 0;

          return (
            <div 
              key={idx} 
              className={`relative group ${isShifted ? 'lg:translate-y-12' : ''}`}
            >
              <div className="absolute -inset-2 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl" />
              
              <div className="relative aspect-[4/5] overflow-hidden glass-panel border-primary/20 group-hover:border-primary transition-all duration-500 rounded-none bg-black/40">
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-primary/40 z-20" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-primary/40 z-20" />

                <Image
                  src={img?.imageUrl || ''}
                  alt={member.name}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-110"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent flex flex-col justify-end p-8">
                  <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <h3 className="font-headline text-2xl text-white group-hover:text-primary transition-colors mb-1 uppercase leading-none tracking-tight">
                      {member.name}
                    </h3>
                    <p className="text-accent text-[9px] font-headline tracking-[0.3em] uppercase mb-4 opacity-80">
                      {member.role}
                    </p>
                    
                    <div className="h-0 group-hover:h-20 overflow-hidden transition-all duration-500 opacity-0 group-hover:opacity-100">
                      <p className="text-muted-foreground text-[10px] leading-relaxed uppercase tracking-widest mb-4">
                        {member.bio}
                      </p>
                      <div className="flex gap-4 items-center">
                        {member.linkedin ? (
                          <a 
                            href={member.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-white hover:text-primary transition-colors flex items-center gap-1 text-[10px] font-headline tracking-widest"
                          >
                            <Linkedin className="w-4 h-4" /> LINKEDIN
                          </a>
                        ) : (
                          <div className="text-muted-foreground/50 flex items-center gap-1 text-[10px] font-headline tracking-widest cursor-not-allowed">
                            <Linkedin className="w-4 h-4" /> NO LINK
                          </div>
                        )}
                        <Github className="w-4 h-4 text-white/50 hover:text-white cursor-pointer transition-colors" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
