"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { 
  Home, 
  Gamepad2, 
  Calendar, 
  Info, 
  Users, 
  ClipboardList,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { name: 'Home', path: '/', icon: <Home className="w-5 h-5" /> },
  { name: 'Events', path: '/events', icon: <Gamepad2 className="w-5 h-5" /> },
  { name: 'Schedule', path: '/schedule', icon: <Calendar className="w-5 h-5" /> },
  { name: 'About', path: '/about', icon: <Info className="w-5 h-5" /> },
  { name: 'Team', path: '/team', icon: <Users className="w-5 h-5" /> },
  { name: 'Register', path: '/register', icon: <ClipboardList className="w-5 h-5" /> },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <TooltipProvider>
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
        <nav className="glass-panel bg-black/80 backdrop-blur-2xl px-3 py-3 flex items-center gap-3 rounded-[2rem] border border-white/10 shadow-[0_0_30px_rgba(0,0,0,0.5)]">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            
            return (
              <Tooltip key={item.path}>
                <TooltipTrigger asChild>
                  <Link
                    href={item.path}
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 relative group",
                      isActive 
                        ? "bg-primary/20 text-primary border-2 border-primary shadow-[0_0_15px_rgba(144,44,232,0.4)]" 
                        : "text-muted-foreground hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {item.icon}
                    {isActive && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-pulse-glow" />
                    )}
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="top" className="glass-panel border-primary/20 text-white font-headline text-[10px] tracking-widest uppercase py-1 px-3">
                  {item.name}
                </TooltipContent>
              </Tooltip>
            );
          })}
        </nav>
      </div>
    </TooltipProvider>
  );
}
