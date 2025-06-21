
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, MapPin, Phone } from "lucide-react";

interface SecurityPerson {
  id: string;
  name: string;
  role: string;
  status: "on-duty" | "off-duty" | "break";
  location: string;
  contact: string;
}

interface SecurityPersonnelCardProps {
  person: SecurityPerson;
}

const SecurityPersonnelCard = ({ person }: SecurityPersonnelCardProps) => {
  const getStatusColor = (status: SecurityPerson["status"]) => {
    switch (status) {
      case "on-duty":
        return "bg-green-100 text-green-800";
      case "off-duty":
        return "bg-gray-100 text-gray-800";
      case "break":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div>
              <CardTitle className="text-lg">{person.name}</CardTitle>
              <p className="text-sm text-gray-600">{person.role}</p>
            </div>
          </div>
          <Badge className={getStatusColor(person.status)}>
            {person.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <MapPin className="w-4 h-4" />
          <span>{person.location}</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-600">
          <Phone className="w-4 h-4" />
          <span>{person.contact}</span>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="flex-1">
            Contact
          </Button>
          <Button variant="outline" size="sm" className="flex-1">
            Assign
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SecurityPersonnelCard;
