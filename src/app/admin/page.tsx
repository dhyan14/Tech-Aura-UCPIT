
"use client"

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  Loader2,
  Plus,
  Trash2,
  LayoutDashboard,
  Lock,
  Mail,
  Info,
  Home as HomeIcon,
  Gamepad2,
  Calendar as CalendarIcon,
  Users,
  FileText,
  Save,
  UserPlus,
  Rocket,
  RefreshCw,
  Download,
  Search
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { eventsData as INITIAL_EVENTS } from '@/lib/events-data';
import type { Registration, RegistrationStats } from '@/lib/admin-types';

// Static mock data for demonstration
const INITIAL_SPONSORS = [
  { id: '1', name: "Cyberdyne Systems", logoUrl: "https://images.unsplash.com/photo-1769952948855-da716b176109", tier: "Platinum" },
  { id: '2', name: "Stark Tech", logoUrl: "https://images.unsplash.com/photo-1662057168154-89300791ad6e", tier: "Gold" },
  { id: '3', name: "Wayne Ent", logoUrl: "https://images.unsplash.com/photo-1762330918172-e19bcb6a7172", tier: "Silver" }
];

export default function AdminPage() {
  const { toast } = useToast();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Real-time data state
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [stats, setStats] = useState<RegistrationStats>({
    totalRegistrations: 0,
    totalRevenue: 0,
    eventCounts: {}
  });
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Static demo state (preserving existing functionality)
  const [sponsors, setSponsors] = useState(INITIAL_SPONSORS);
  const [events, setEvents] = useState(INITIAL_EVENTS);

  // New Sponsor Form State
  const [newSponsor, setNewSponsor] = useState({ name: '', logoUrl: '', tier: 'Platinum' });

  // Fetch registrations from Google Sheets
  const fetchRegistrations = async () => {
    setIsLoadingData(true);
    try {
      const response = await fetch('/api/admin/registrations');
      const data = await response.json();

      if (data.success) {
        setRegistrations(data.registrations);
        setStats(data.stats);
        setLastUpdated(new Date());
      } else {
        toast({
          variant: "destructive",
          title: "Data Fetch Failed",
          description: data.error || "Could not fetch registration data"
        });
      }
    } catch (error) {
      console.error('Error fetching registrations:', error);
      toast({
        variant: "destructive",
        title: "Connection Error",
        description: "Failed to connect to data source"
      });
    } finally {
      setIsLoadingData(false);
    }
  };

  // Auto-refresh every 30 seconds when logged in and on registrations tab
  useEffect(() => {
    if (isLoggedIn) {
      fetchRegistrations();

      const interval = setInterval(() => {
        if (activeTab === 'registrations' || activeTab === 'dashboard') {
          fetchRegistrations();
        }
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [isLoggedIn, activeTab]);

  // Filter registrations based on search
  const filteredRegistrations = registrations.filter(reg => {
    const query = searchQuery.toLowerCase();
    return (
      reg.fullName?.toLowerCase().includes(query) ||
      reg.email?.toLowerCase().includes(query) ||
      reg.mobile?.includes(query) ||
      reg.registrationId?.toLowerCase().includes(query) ||
      reg.selectedEvents?.toLowerCase().includes(query)
    );
  });

  // Export to CSV
  const exportToCSV = () => {
    const headers = ['Timestamp', 'Registration ID', 'Full Name', 'Email', 'Mobile', 'College', 'Course & Semester', 'Events', 'Amount', 'Status', 'Payment ID'];
    const rows = registrations.map(reg => [
      reg.timestamp,
      reg.registrationId,
      reg.fullName,
      reg.email,
      reg.mobile,
      reg.college,
      reg.courseSemester,
      reg.selectedEvents,
      reg.totalAmount,
      reg.paymentStatus,
      reg.paymentId
    ]);

    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `registrations_${new Date().toISOString()}.csv`;
    a.click();

    toast({ title: "Export Complete", description: "Registration data exported successfully" });
  };

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    setTimeout(() => {
      if (email === 'admin@aura.tech' && password === 'password123') {
        setIsLoggedIn(true);
        toast({ title: "Access Granted", description: "Admin session initiated." });
      } else {
        toast({ variant: "destructive", title: "Authentication Failed", description: "Invalid credentials." });
      }
      setIsLoggingIn(false);
    }, 1000);
  };

  const handleAddSponsor = () => {
    if (!newSponsor.name || !newSponsor.logoUrl) {
      toast({ variant: "destructive", title: "Incomplete Data", description: "Sponsor name and logo URL are required." });
      return;
    }
    const sponsor = { ...newSponsor, id: Math.random().toString(36).substr(2, 9) };
    setSponsors([...sponsors, sponsor]);
    setNewSponsor({ name: '', logoUrl: '', tier: 'Platinum' });
    toast({ title: "Partner Recruited", description: `${newSponsor.name} added to the roster.` });
  };

  const handleDeleteSponsor = (id: string) => {
    setSponsors(sponsors.filter(s => s.id !== id));
    toast({ title: "Partner Terminated", description: "Sponsor removed from the roster." });
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-48 pb-20 px-6 flex flex-col items-center justify-center">
        <div className="glass-panel p-10 max-w-md w-full border-primary/20 relative overflow-hidden bg-black/40">
          <div className="absolute top-0 left-0 w-16 h-1 bg-primary" />
          <div className="text-center mb-8">
            <LayoutDashboard className="w-12 h-12 text-primary mx-auto mb-4" />
            <h1 className="font-headline text-2xl tracking-tighter text-white">ADMIN GATEWAY</h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.3em] mt-2">Static Protocol Enabled</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Console ID</Label>
              <Input name="email" type="email" required placeholder="admin@aura.tech" className="bg-white/5 border-white/10 rounded-none h-12 pl-4 focus:border-primary transition-all text-sm tracking-widest" />
            </div>
            <div className="space-y-2">
              <Label className="text-[10px] uppercase tracking-widest text-muted-foreground">Security Key</Label>
              <Input name="password" type="password" required placeholder="••••••••" className="bg-white/5 border-white/10 rounded-none h-12 pl-4 focus:border-primary transition-all" />
            </div>
            <div className="bg-primary/5 border border-primary/20 p-4 flex gap-3 items-start">
              <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <div className="space-y-1">
                <p className="text-[10px] text-primary uppercase font-bold tracking-widest">Demo Access</p>
                <p className="text-[9px] text-muted-foreground uppercase tracking-widest">Email: admin@aura.tech | Pass: password123</p>
              </div>
            </div>
            <Button disabled={isLoggingIn} className="w-full bg-primary hover:bg-primary/80 py-6 font-headline tracking-[0.2em] rounded-none accent-glow">
              {isLoggingIn ? <Loader2 className="animate-spin" /> : "INITIATE SESSION"}
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
        <div>
          <h1 className="font-headline text-5xl mb-2 tracking-tighter text-white uppercase">AURA <span className="text-primary">CONTROL</span></h1>
          <p className="text-muted-foreground text-sm uppercase tracking-widest font-bold">Protocol Management Panel</p>
        </div>
        <Button onClick={() => setIsLoggedIn(false)} variant="outline" className="border-primary/20 hover:bg-primary/10 rounded-none text-xs font-headline tracking-widest uppercase">
          TERMINATE SESSION
        </Button>
      </div>

      <Tabs defaultValue="dashboard" className="space-y-8" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 md:grid-cols-7 bg-white/5 rounded-none p-1 border border-white/10">
          <TabsTrigger value="dashboard" className="rounded-none font-headline text-[10px] tracking-widest py-3 uppercase">Dashboard</TabsTrigger>
          <TabsTrigger value="home" className="rounded-none font-headline text-[10px] tracking-widest py-3 uppercase">Home</TabsTrigger>
          <TabsTrigger value="events" className="rounded-none font-headline text-[10px] tracking-widest py-3 uppercase">Events</TabsTrigger>
          <TabsTrigger value="schedule" className="rounded-none font-headline text-[10px] tracking-widest py-3 uppercase">Schedule</TabsTrigger>
          <TabsTrigger value="about" className="rounded-none font-headline text-[10px] tracking-widest py-3 uppercase">About</TabsTrigger>
          <TabsTrigger value="team" className="rounded-none font-headline text-[10px] tracking-widest py-3 uppercase">Team</TabsTrigger>
          <TabsTrigger value="registrations" className="rounded-none font-headline text-[10px] tracking-widest py-3 uppercase">Registrations</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-panel border-primary/20 rounded-none bg-black/40">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase tracking-widest">Active Events</CardDescription>
                <CardTitle className="font-headline text-3xl text-primary">{events.length}</CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-panel border-accent/20 rounded-none bg-black/40">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase tracking-widest">Registrations</CardDescription>
                <CardTitle className="font-headline text-3xl text-accent">
                  {isLoadingData ? <Loader2 className="w-6 h-6 animate-spin" /> : stats.totalRegistrations}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-panel border-green-500/20 rounded-none bg-black/40">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase tracking-widest">Total Revenue</CardDescription>
                <CardTitle className="font-headline text-3xl text-green-400">
                  {isLoadingData ? <Loader2 className="w-6 h-6 animate-spin" /> : `₹${stats.totalRevenue}`}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="glass-panel border-blue-500/20 rounded-none bg-black/40">
              <CardHeader className="pb-2">
                <CardDescription className="text-[10px] uppercase tracking-widest">Data Sync</CardDescription>
                <CardTitle className="font-headline text-xl text-blue-400 flex items-center gap-2">
                  <RefreshCw className={`w-5 h-5 ${isLoadingData ? 'animate-spin' : ''}`} />
                  LIVE
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          <Card className="glass-panel border-primary/10 rounded-none bg-black/20">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="font-headline text-lg tracking-widest uppercase">Recent Registrations</CardTitle>
                {lastUpdated && (
                  <CardDescription className="text-[9px] uppercase tracking-widest mt-1">
                    Last updated: {lastUpdated.toLocaleTimeString()}
                  </CardDescription>
                )}
              </div>
              <Button
                onClick={fetchRegistrations}
                disabled={isLoadingData}
                variant="outline"
                size="sm"
                className="border-primary/20 rounded-none text-[10px] font-headline tracking-widest"
              >
                {isLoadingData ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <RefreshCw className="w-3 h-3 mr-2" />}
                REFRESH
              </Button>
            </CardHeader>
            <CardContent>
              {isLoadingData && registrations.length === 0 ? (
                <div className="text-center py-8">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest mt-4">Loading data...</p>
                </div>
              ) : registrations.length > 0 ? (
                <div className="space-y-2">
                  {registrations.slice(0, 5).map((reg, index) => (
                    <div key={index} className="text-[10px] font-code text-muted-foreground/60 flex justify-between items-center p-2 bg-white/5 rounded">
                      <span className="text-white font-medium">{reg.fullName}</span>
                      <span>{reg.selectedEvents.split(',')[0]}</span>
                      <span>₹{reg.totalAmount}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">No registrations yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="home" className="space-y-12">
          {/* Hero Section */}
          <Card className="glass-panel border-primary/20 rounded-none bg-black/40">
            <CardHeader>
              <CardTitle className="font-headline text-xl tracking-widest flex items-center gap-2">
                <HomeIcon className="w-5 h-5 text-primary" /> HERO SECTION MANAGER
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Main Headline</Label>
                  <Input placeholder="BEYOND THE HORIZON" className="bg-white/5 border-white/10 rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Sub Headline (Gradient)</Label>
                  <Input placeholder="HORIZON" className="bg-white/5 border-white/10 rounded-none" />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest">Description Meta</Label>
                <Textarea placeholder="The most immersive tech festival of the year..." className="bg-white/5 border-white/10 rounded-none min-h-[100px]" />
              </div>
              <Button className="bg-primary hover:bg-primary/80 rounded-none font-headline tracking-widest text-[10px] py-6 px-8">
                <Save className="w-4 h-4 mr-2" /> UPDATE HERO PROTOCOL
              </Button>
            </CardContent>
          </Card>

          {/* Sponsor Management */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass-panel border-accent/20 rounded-none bg-black/40 h-fit">
              <CardHeader>
                <CardTitle className="font-headline text-lg tracking-widest flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-accent" /> SPONSOR PROTOCOLS
                </CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest">Recruit new partners</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Company Identity</Label>
                  <Input
                    value={newSponsor.name}
                    onChange={(e) => setNewSponsor({ ...newSponsor, name: e.target.value })}
                    placeholder="e.g. Acme Corp"
                    className="bg-white/5 border-white/10 rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Logo Vector URL</Label>
                  <Input
                    value={newSponsor.logoUrl}
                    onChange={(e) => setNewSponsor({ ...newSponsor, logoUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="bg-white/5 border-white/10 rounded-none"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Sponsorship Tier</Label>
                  <select
                    value={newSponsor.tier}
                    onChange={(e) => setNewSponsor({ ...newSponsor, tier: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 p-2 text-xs rounded-none text-white"
                  >
                    <option value="Platinum">Platinum</option>
                    <option value="Gold">Gold</option>
                    <option value="Silver">Silver</option>
                  </select>
                </div>
                <Button onClick={handleAddSponsor} className="w-full bg-accent text-background hover:bg-accent/80 rounded-none font-headline tracking-widest text-[10px] py-4">
                  RECRUIT PARTNER
                </Button>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-headline text-xs tracking-widest text-accent uppercase mb-4">ACTIVE PARTNERS</h3>
              {sponsors.map((sponsor) => (
                <div key={sponsor.id} className="glass-panel p-4 border-white/5 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass-panel flex items-center justify-center p-1 bg-white">
                      <img src={sponsor.logoUrl} alt={sponsor.name} className="max-w-full max-h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="font-headline text-[11px] text-white tracking-widest uppercase">{sponsor.name}</h4>
                      <p className="text-[8px] text-accent uppercase tracking-widest font-bold">{sponsor.tier} Tier</p>
                    </div>
                  </div>
                  <Button onClick={() => handleDeleteSponsor(sponsor.id)} variant="ghost" className="text-muted-foreground hover:text-destructive p-2">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
              {sponsors.length === 0 && (
                <div className="text-center py-12 glass-panel border-white/5 bg-white/5">
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">No active partners found.</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="events">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass-panel border-primary/20 rounded-none bg-black/40 h-fit">
              <CardHeader>
                <CardTitle className="font-headline text-lg tracking-widest flex items-center gap-2">
                  <Plus className="w-4 h-4" /> ADD ARENA
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Event Title</Label>
                  <Input className="bg-white/5 border-white/10 rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Track</Label>
                  <select className="w-full bg-white/5 border border-white/10 p-2 text-xs rounded-none">
                    <option>Technical Track</option>
                    <option>Non-Technical Track</option>
                  </select>
                </div>
                <Button className="w-full bg-accent text-background hover:bg-accent/80 rounded-none font-headline tracking-widest text-[10px] py-4">
                  INITIALIZE EVENT
                </Button>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-headline text-xs tracking-widest text-primary uppercase mb-4">EXISTING PROTOCOLS</h3>
              {events.map((event) => (
                <div key={event.slug} className="glass-panel p-4 border-white/5 bg-white/5 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 glass-panel flex items-center justify-center text-primary">
                      <Gamepad2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-headline text-[11px] text-white tracking-widest uppercase">{event.title}</h4>
                      <p className="text-[8px] text-muted-foreground uppercase tracking-widest">{event.category}</p>
                    </div>
                  </div>
                  <Button variant="ghost" className="text-muted-foreground hover:text-destructive p-2">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="schedule">
          <Card className="glass-panel border-primary/20 rounded-none bg-black/40">
            <CardHeader>
              <CardTitle className="font-headline text-xl tracking-widest flex items-center gap-2">
                <CalendarIcon className="w-5 h-5 text-accent" /> TIMELINE ARCHITECT
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader className="border-white/10">
                  <TableRow className="hover:bg-transparent">
                    <TableHead className="text-[10px] uppercase tracking-widest">Time</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest">Event</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest">Location</TableHead>
                    <TableHead className="text-[10px] uppercase tracking-widest text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-white/5 hover:bg-white/5">
                    <TableCell className="text-[10px] font-code">09:00 AM</TableCell>
                    <TableCell className="text-[10px] uppercase tracking-widest text-white">Opening Ceremony</TableCell>
                    <TableCell className="text-[10px] uppercase tracking-widest">Main Arena</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" className="text-muted-foreground"><Trash2 className="w-3 h-3" /></Button>
                    </TableCell>
                  </TableRow>
                  {/* Additional rows mock */}
                </TableBody>
              </Table>
              <Button variant="outline" className="w-full mt-4 border-primary/20 rounded-none font-headline text-[10px] tracking-widest uppercase">
                <Plus className="w-4 h-4 mr-2" /> ADD TIME SLOT
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about">
          <Card className="glass-panel border-primary/20 rounded-none bg-black/40">
            <CardHeader>
              <CardTitle className="font-headline text-xl tracking-widest flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" /> STORYTELLING CONFIG
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label className="text-[10px] uppercase tracking-widest">Festival Story</Label>
                <Textarea className="bg-white/5 border-white/10 rounded-none min-h-[150px]" placeholder="Tech Aura started 5 years ago..." />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Vision Statement</Label>
                  <Input className="bg-white/5 border-white/10 rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Annual Theme</Label>
                  <Input className="bg-white/5 border-white/10 rounded-none" />
                </div>
              </div>
              <Button className="bg-primary hover:bg-primary/80 rounded-none font-headline tracking-widest text-[10px] py-6 px-8">
                <Save className="w-4 h-4 mr-2" /> COMMIT NARRATIVE
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="team">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="glass-panel border-primary/20 rounded-none bg-black/40 h-fit">
              <CardHeader>
                <CardTitle className="font-headline text-lg tracking-widest flex items-center gap-2">
                  <UserPlus className="w-4 h-4" /> RECRUIT ARCHITECT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Full Name</Label>
                  <Input className="bg-white/5 border-white/10 rounded-none" />
                </div>
                <div className="space-y-2">
                  <Label className="text-[10px] uppercase tracking-widest">Role</Label>
                  <Input className="bg-white/5 border-white/10 rounded-none" placeholder="e.g. Student Organizer" />
                </div>
                <Button className="w-full bg-accent text-background hover:bg-accent/80 rounded-none font-headline tracking-widest text-[10px] py-4">
                  ONBOARD MEMBER
                </Button>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-4">
              <h3 className="font-headline text-xs tracking-widest text-primary uppercase mb-4">ACTIVE ARCHITECTS</h3>
              {/* Team list mock */}
              <div className="glass-panel p-4 border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10" />
                  <div>
                    <h4 className="font-headline text-[11px] text-white tracking-widest uppercase">Shaikh Mohammed Khizer</h4>
                    <p className="text-[8px] text-muted-foreground uppercase tracking-widest">Core Committee</p>
                  </div>
                </div>
                <Button variant="ghost" className="text-muted-foreground hover:text-destructive p-2"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="registrations">
          <Card className="glass-panel border-primary/20 rounded-none bg-black/40">
            <CardHeader className="flex flex-row justify-between items-center">
              <div>
                <CardTitle className="font-headline text-xl tracking-widest flex items-center gap-2">
                  <Users className="w-5 h-5 text-accent" /> PARTICIPANT ARCHIVE
                </CardTitle>
                <CardDescription className="text-[10px] uppercase tracking-widest mt-1">
                  Live Manifest of Verified Identities
                  {lastUpdated && ` • Last updated: ${lastUpdated.toLocaleTimeString()}`}
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={fetchRegistrations}
                  disabled={isLoadingData}
                  variant="outline"
                  className="border-primary/20 text-[10px] font-headline tracking-widest rounded-none"
                >
                  {isLoadingData ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <RefreshCw className="w-3 h-3 mr-2" />}
                  REFRESH
                </Button>
                <Button
                  onClick={exportToCSV}
                  disabled={registrations.length === 0}
                  variant="outline"
                  className="border-primary/20 text-[10px] font-headline tracking-widest rounded-none"
                >
                  <Download className="w-3 h-3 mr-2" />
                  EXPORT MANIFEST
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name, email, phone, or registration ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-white/5 border-white/10 rounded-none"
                />
              </div>

              {/* Loading State */}
              {isLoadingData && registrations.length === 0 ? (
                <div className="text-center py-12">
                  <Loader2 className="w-12 h-12 animate-spin mx-auto text-primary mb-4" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Fetching registration data...</p>
                </div>
              ) : registrations.length === 0 ? (
                <div className="text-center py-12 glass-panel bg-white/5 border-white/5">
                  <Users className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                  <p className="text-[10px] uppercase tracking-widest text-muted-foreground">No registrations found</p>
                  <p className="text-[9px] uppercase tracking-widest text-muted-foreground/60 mt-2">
                    Registrations will appear here once participants complete payment
                  </p>
                </div>
              ) : (
                <>
                  <Table>
                    <TableHeader className="border-white/10">
                      <TableRow className="hover:bg-transparent">
                        <TableHead className="text-[10px] uppercase tracking-widest">Registration ID</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-widest">Identity</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-widest">Communication</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-widest">College</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-widest">Events</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-widest">Amount</TableHead>
                        <TableHead className="text-[10px] uppercase tracking-widest">Time</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredRegistrations.map((reg: Registration, index: number) => (
                        <TableRow key={index} className="border-white/5 hover:bg-white/5">
                          <TableCell className="text-[9px] font-code text-accent">
                            {reg.registrationId}
                          </TableCell>
                          <TableCell className="text-[10px] uppercase font-bold text-white tracking-widest">
                            {reg.fullName}
                          </TableCell>
                          <TableCell className="text-[10px] text-muted-foreground">
                            <div>{reg.email}</div>
                            <div className="text-[9px]">{reg.mobile}</div>
                          </TableCell>
                          <TableCell className="text-[9px] text-muted-foreground">
                            <div>{reg.college}</div>
                            <div className="text-[8px] text-muted-foreground/70">{reg.courseSemester}</div>
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {reg.selectedEvents.split(',').slice(0, 2).map((event, i) => (
                                <span
                                  key={i}
                                  className="text-[8px] px-1.5 py-0.5 bg-primary/20 text-primary border border-primary/20 font-headline uppercase"
                                >
                                  {event.trim()}
                                </span>
                              ))}
                              {reg.selectedEvents.split(',').length > 2 && (
                                <span className="text-[8px] text-muted-foreground">
                                  +{reg.selectedEvents.split(',').length - 2} more
                                </span>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-[10px] font-bold text-accent">
                            ₹{reg.totalAmount}
                          </TableCell>
                          <TableCell className="text-[9px] font-code text-muted-foreground/60">
                            {new Date(reg.timestamp).toLocaleString()}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>

                  {/* Results Count */}
                  <div className="text-[10px] text-muted-foreground uppercase tracking-widest text-center pt-4 border-t border-white/5">
                    Showing {filteredRegistrations.length} of {registrations.length} registrations
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
