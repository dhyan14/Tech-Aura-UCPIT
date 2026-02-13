
import type {Metadata} from 'next';
import './globals.css';
import { Navbar } from '@/components/navbar';
import Link from 'next/link';
import { DynamicYear } from '@/components/dynamic-year';
import { FirebaseClientProvider } from '@/firebase';
import { Toaster } from '@/components/ui/toaster';

export const metadata: Metadata = {
  title: 'Tech Aura | Futuristic Tech Festival',
  description: 'Join the ultimate coding and tech festival experience.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Orbitron:wght@400..900&family=Inter:wght@300..700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased min-h-screen relative">
        <FirebaseClientProvider>
          <header className="absolute top-8 left-8 z-40">
            <Link href="/" className="flex items-center gap-3 group opacity-70 hover:opacity-100 transition-opacity">
              <div className="w-10 h-10 glass-panel border-primary/40 flex items-center justify-center group-hover:border-primary transition-colors">
                <span className="font-headline text-primary font-bold">TA</span>
              </div>
              <span className="font-headline text-xs tracking-[0.3em] text-white hidden md:block group-hover:text-primary transition-colors uppercase">TECH AURA</span>
            </Link>
          </header>
          
          <Navbar />
          
          <main>{children}</main>
          
          <footer className="pt-20 pb-40 px-6 border-t border-primary/10 mt-20 bg-black/20">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="space-y-4">
                <h2 className="font-headline text-2xl text-primary tracking-wider uppercase">TECH AURA</h2>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
                  The most immersive tech festival of the year. Join 50,000+ developers, designers, and visionaries to reshape the future.
                </p>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-xs tracking-[0.2em] text-accent uppercase font-bold">Festival</h3>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  <li><Link href="/" className="hover:text-primary transition-colors">Home</Link></li>
                  <li><Link href="/events" className="hover:text-primary transition-colors">All Events</Link></li>
                  <li><Link href="/schedule" className="hover:text-primary transition-colors">Timeline</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-xs tracking-[0.2em] text-accent uppercase font-bold">Connect</h3>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  <li><Link href="/about" className="hover:text-primary transition-colors">Our Story</Link></li>
                  <li><Link href="/team" className="hover:text-primary transition-colors">The Architects</Link></li>
                  <li><Link href="/register" className="hover:text-primary transition-colors">Get Your Pass</Link></li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-headline text-xs tracking-[0.2em] text-accent uppercase font-bold">Legal</h3>
                <ul className="space-y-2 text-sm text-muted-foreground font-light">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacy Protocol</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Terms of Entry</a></li>
                  <li><Link href="/admin" className="hover:text-primary transition-colors">Admin Console</Link></li>
                </ul>
              </div>
            </div>

            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-primary/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground/50 font-medium">
              <p>© <DynamicYear /> Tech Aura Festival. All rights reserved.</p>
              <p className="tracking-widest uppercase">Neon Horizon Edition 2026</p>
            </div>
          </footer>
          <Toaster />
        </FirebaseClientProvider>
      </body>
    </html>
  );
}
