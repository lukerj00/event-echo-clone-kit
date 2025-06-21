
import { useState } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Shield, 
  Users, 
  Calendar, 
  AlertTriangle, 
  LogOut, 
  Plus,
  Eye,
  MapPin,
  Clock
} from "lucide-react";
import EventCard from "@/components/EventCard";
import SecurityPersonnelCard from "@/components/SecurityPersonnelCard";
import StatsCard from "@/components/StatsCard";

interface DashboardProps {
  user: User;
}

const Dashboard = ({ user }: DashboardProps) => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Error",
        description: "Failed to sign out",
        variant: "destructive",
      });
    }
  };

  const mockEvents = [
    {
      id: "1",
      name: "Corporate Conference 2024",
      location: "Convention Center",
      date: "2024-01-15",
      status: "active" as const,
      securityLevel: "high" as const,
      attendees: 500,
    },
    {
      id: "2",
      name: "Music Festival",
      location: "City Park",
      date: "2024-01-20",
      status: "upcoming" as const,
      securityLevel: "medium" as const,
      attendees: 2000,
    },
  ];

  const mockPersonnel = [
    {
      id: "1",
      name: "John Smith",
      role: "Lead Security Officer",
      status: "on-duty" as const,
      location: "Main Entrance",
      contact: "+1 (555) 123-4567",
    },
    {
      id: "2",
      name: "Sarah Johnson",
      role: "Security Guard",
      status: "off-duty" as const,
      location: "Patrol Route A",
      contact: "+1 (555) 987-6543",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">Event Security Pro</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.email}</span>
              <Button variant="outline" size="sm" onClick={handleSignOut}>
                <LogOut className="w-4 h-4 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: "overview", label: "Overview", icon: Eye },
              { id: "events", label: "Events", icon: Calendar },
              { id: "personnel", label: "Personnel", icon: Users },
              { id: "alerts", label: "Alerts", icon: AlertTriangle },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StatsCard
                title="Active Events"
                value="3"
                icon={Calendar}
                trend="+2 from last week"
                color="blue"
              />
              <StatsCard
                title="Security Personnel"
                value="12"
                icon={Users}
                trend="8 on duty"
                color="green"
              />
              <StatsCard
                title="Total Attendees"
                value="2,847"
                icon={MapPin}
                trend="+15% from last month"
                color="purple"
              />
              <StatsCard
                title="Active Alerts"
                value="2"
                icon={AlertTriangle}
                trend="1 high priority"
                color="red"
              />
            </div>

            {/* Recent Events */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Recent Events</CardTitle>
                  <CardDescription>Latest event security activities</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Event
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEvents.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeTab === "events" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Events</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockEvents.map((event) => (
                <EventCard key={event.id} event={event} detailed />
              ))}
            </div>
          </div>
        )}

        {activeTab === "personnel" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-gray-900">Security Personnel</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Personnel
              </Button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {mockPersonnel.map((person) => (
                <SecurityPersonnelCard key={person.id} person={person} />
              ))}
            </div>
          </div>
        )}

        {activeTab === "alerts" && (
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Security Alerts</h2>
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-12">
                  <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Alerts</h3>
                  <p className="text-gray-500">All systems are operating normally.</p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
