
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';

export default function AboutPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-tech');

  return (
    <div className="pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center stagger-reveal">
        <div className="space-y-8">
          <div>
            <span className="text-accent text-xs font-headline tracking-[0.3em] uppercase">The Story</span>
            <h1 className="font-headline text-6xl md:text-8xl mb-6 tracking-tighter leading-none">
              A LEGACY <br />
              <span className="text-primary">OF AURA</span>
            </h1>
          </div>

          <p className="text-xl font-light text-muted-foreground leading-relaxed">
            Tech Aura started 5 years ago with a simple mission: to bridge the gap between academic theory and industry reality. Today, it has evolved into a global phenomenon where the brightest minds converge.
          </p>

          <div className="space-y-6">
            <div className="border-l-4 border-primary pl-6">
              <h3 className="text-2xl font-headline mb-2">OUR VISION</h3>
              <p className="text-muted-foreground">To inspire a new generation of problem solvers through radical collaboration and technological exploration.</p>
            </div>
            <div className="border-l-4 border-accent pl-6">
              <h3 className="text-2xl font-headline mb-2">THE THEME: NEON HORIZON</h3>
              <p className="text-muted-foreground">This year's theme focuses on the intersection of human creativity and automated intelligence—exploring how we coexist with our creations.</p>
            </div>
          </div>
        </div>

        <div className="relative h-[600px] hidden lg:block">
          <div className="absolute inset-0 glass-panel border-primary/40 -rotate-3 z-0" />
          <div className="absolute inset-0 overflow-hidden z-10">
            <Image
              src={heroImg?.imageUrl || ''}
              alt="Festival Vibe"
              fill
              className="object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            />
          </div>
          <div className="absolute -bottom-8 -right-8 glass-panel p-8 z-20 max-w-xs rotate-2">
            <p className="text-4xl font-headline text-accent mb-2">50K+</p>
            <p className="text-sm font-headline tracking-widest text-muted-foreground uppercase">Expected Attendees Worldwide</p>
          </div>
        </div>
      </div>

      <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-12 text-center stagger-reveal">
        <div>
          <h4 className="text-accent text-5xl font-headline mb-4">01</h4>
          <h5 className="text-xl font-headline mb-4 uppercase tracking-widest">Innovation</h5>
          <p className="text-muted-foreground">We don't just follow trends; we set the blueprint for what's coming next in the tech ecosystem.</p>
        </div>
        <div>
          <h4 className="text-accent text-5xl font-headline mb-4">02</h4>
          <h5 className="text-xl font-headline mb-4 uppercase tracking-widest">Inclusion</h5>
          <p className="text-muted-foreground">Tech Aura is for everyone. From first-year students to seasoned developers, every voice matters.</p>
        </div>
        <div>
          <h4 className="text-accent text-5xl font-headline mb-4">03</h4>
          <h5 className="text-xl font-headline mb-4 uppercase tracking-widest">Excellence</h5>
          <p className="text-muted-foreground">Our competitions are designed by industry veterans to test the absolute limits of your capability.</p>
        </div>
      </div>
    </div>
  );
}
