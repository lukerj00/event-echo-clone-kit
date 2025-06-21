
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Shield } from "lucide-react";

interface Event {
  id: string;
  name: string;
  location: string;
  date: string;
  status: "active" | "upcoming" | "completed";
  securityLevel: "low" | "medium" | "high";
  attendees: number;
}

interface EventCardProps {
  event: Event;
  detailed?: boolean;
}

const EventCard = ({ event, detailed = false }: EventCardProps) => {
  const getStatusColor = (status: Event["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "upcoming":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getSecurityLevelColor = (level: Event["securityLevel"]) => {
    switch (level) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{event.name}</CardTitle>
          <Badge className={getStatusColor(event.status)}>
            {event.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{event.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Calendar className="w-4 h-4" />
          <span>{new Date(event.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Users className="w-4 h-4" />
          <span>{event.attendees.toLocaleString()} attendees</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-gray-600" />
            <Badge className={getSecurityLevelColor(event.securityLevel)}>
              {event.securityLevel} security
            </Badge>
          </div>
          {detailed && (
            <Button variant="outline" size="sm">
              Manage
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EventCard;
