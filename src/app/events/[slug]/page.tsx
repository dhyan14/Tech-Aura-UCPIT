
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { eventsData } from '@/lib/events-data';
import * as LucideIcons from 'lucide-react';
import { ArrowLeft, Calendar, MapPin, Trophy, ShieldCheck, ListChecks, CircleHelp } from 'lucide-react';

export async function generateStaticParams() {
  return eventsData.map((event) => ({
    slug: event.slug,
  }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = eventsData.find(e => e.slug === slug);

  if (!event) {
    notFound();
  }

  const img = PlaceHolderImages.find(i => i.id === event.imgId);
  const Icon = (LucideIcons as any)[event.iconName] || CircleHelp;

  return (
    <div className="pt-32 pb-40 px-6 max-w-5xl mx-auto min-h-screen">
      <Link href="/events" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-headline text-xs tracking-widest uppercase group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Arenas
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 stagger-reveal">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-square overflow-hidden glass-panel border-primary/20 rounded-none shadow-2xl">
            <Image
              src={img?.imageUrl || ''}
              alt={event.title}
              fill
              className="object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
            <div className="absolute bottom-6 left-6">
               <Icon className={`w-12 h-12 ${event.color}`} />
            </div>
          </div>

          <div className="glass-panel p-6 border-primary/10 rounded-none space-y-4">
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <Calendar className="w-4 h-4 text-primary" />
              <span className="uppercase tracking-widest font-headline text-[10px]">TBD - Neon Horizon 2026</span>
            </div>
            <div className="flex items-center gap-3 text-muted-foreground text-sm">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="uppercase tracking-widest font-headline text-[10px]">Main Campus Tech Hub</span>
            </div>
            <div className="flex items-center gap-3 text-accent text-sm font-bold">
              <Trophy className="w-4 h-4" />
              <span className="uppercase tracking-widest font-headline text-[10px]">{event.prize}</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-3 space-y-10">
          <div>
            <Badge className={`bg-primary/20 ${event.color} border-none rounded-none font-headline text-[10px] tracking-[0.2em] uppercase mb-4 px-4 py-1`}>
              {event.category}
            </Badge>
            <h1 className="font-headline text-5xl md:text-6xl tracking-tighter text-white mb-6 uppercase">
              {event.title}
            </h1>
            <p className="text-xl text-muted-foreground font-light leading-relaxed italic border-l-2 border-primary/40 pl-6">
              {event.description}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline text-xl text-primary tracking-widest uppercase flex items-center gap-3">
              <ShieldCheck className="w-5 h-5" /> The Protocol
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {event.longDescription}
            </p>
          </div>

          <div className="space-y-6">
            <h2 className="font-headline text-xl text-accent tracking-widest uppercase flex items-center gap-3">
              <ListChecks className="w-5 h-5" /> Entry Constraints
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {event.rules.map((rule, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground glass-panel p-4 border-white/5 bg-white/5 rounded-none">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  {rule}
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-8">
            <Button asChild size="lg" className="bg-primary hover:bg-primary/80 px-12 py-8 font-headline tracking-widest text-lg rounded-none w-full md:w-auto accent-glow">
              <Link href="/register">INITIALIZE REGISTRATION</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
