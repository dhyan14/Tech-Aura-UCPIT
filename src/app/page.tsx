
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, Code, Zap, Globe, Cpu } from 'lucide-react';

export default function Home() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-tech');
  
  const sponsors = [
    { name: "Cyberdyne", imgId: "logo-cyber" },
    { name: "Stark Tech", imgId: "logo-stark" },
    { name: "Wayne Ent", imgId: "logo-wayne" },
    { name: "Tyrell Corp", imgId: "logo-cyber" },
    { name: "Oscorp", imgId: "logo-stark" },
    { name: "Omni Cons", imgId: "logo-wayne" }
  ];

  return (
    <div className="relative overflow-hidden pt-24 min-h-screen">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroImg?.imageUrl || ''}
          alt="Tech Aura Hero"
          fill
          className="object-cover opacity-20 grayscale"
          priority
          data-ai-hint="futuristic technology background"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center stagger-reveal">
        <div className="inline-block px-4 py-1 glass-panel border-accent/30 rounded-full mb-6">
          <span className="text-accent text-xs font-headline tracking-[0.2em] uppercase">Tech Aura 2026</span>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-headline font-black tracking-tighter text-glow mb-6 leading-tight text-white">
          BEYOND THE <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">HORIZON</span>
        </h1>
        
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground font-light mb-10 leading-relaxed">
          The most immersive tech festival of the year. Join 50,000+ developers, designers, and visionaries to reshape the future.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/80 px-8 py-7 text-lg font-headline tracking-wider accent-glow rounded-none group">
            <Link href="/register">
              ENTER THE AURA <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="border-accent text-accent hover:bg-accent hover:text-background px-8 py-7 text-lg font-headline tracking-wider rounded-none">
            <Link href="/events">VIEW EVENTS</Link>
          </Button>
        </div>

        {/* Stats/Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full mb-32">
          {[
            { icon: <Code />, label: "Competitions", value: "0+" },
            { icon: <Zap />, label: "Workshops", value: "0+" },
            { icon: <Globe />, label: "Participants", value: "0K+" },
            { icon: <Cpu />, label: "Price Pool", value: "$0K" }
          ].map((stat, i) => (
            <div key={i} className="glass-card p-6 rounded-none flex flex-col items-center hover:scale-105 transition-transform">
              <div className="text-primary mb-2">{stat.icon}</div>
              <div className="text-2xl font-headline font-bold text-white">{stat.value}</div>
              <div className="text-xs text-muted-foreground uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sponsors Section (Static) */}
        <div className="w-full pb-20">
          <div className="text-center mb-12">
            <h2 className="font-headline text-3xl md:text-4xl mb-4 tracking-tighter uppercase text-white">Our <span className="text-primary">Partners</span></h2>
            <div className="w-20 h-1 bg-accent mx-auto mb-6" />
            <p className="text-muted-foreground uppercase tracking-[0.3em] text-[10px] font-bold">Leading the innovation frontier</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center justify-items-center opacity-40 grayscale hover:opacity-100 transition-all duration-1000">
            {sponsors.map((sponsor, i) => {
              const img = PlaceHolderImages.find(p => p.id === sponsor.imgId);
              return (
                <div key={i} className="relative w-32 h-12 grayscale hover:grayscale-0 transition-all group">
                  <Image
                    src={img?.imageUrl || ''}
                    alt={sponsor.name}
                    fill
                    className="object-contain"
                  />
                  <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-headline tracking-widest opacity-0 group-hover:opacity-100 transition-opacity uppercase text-accent whitespace-nowrap">
                    {sponsor.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
