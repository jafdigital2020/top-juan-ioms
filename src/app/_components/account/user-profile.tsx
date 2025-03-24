import { Card } from "@/components/ui/card";
import { Mail, MapPinned, Phone } from "lucide-react";


interface UserProfileProps {
  name: string;
  role: string;
  profilePicture: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  name,
  role,
  profilePicture,
}) => {
  return (
    <Card className="px-4 py-6 ">
      <img
        src={profilePicture}
        alt="Profile"
        className="w-24 h-24 rounded-full mx-auto mb-4"
      />
      <h2 className="text-md text-center font-semibold text-brown-600">{name}</h2>
      <h3 className="text-sm text-center text-gray-500">{role}</h3>
  
  <div className="flex flex-col text-sm pt-6 space-y-4 px-4">
    <div className="flex text-sm space-x-2">
      <Mail className="w-4 h-4 text-gray-500" />
      <h3>testmail@gmail.com</h3>
    </div>
    <div className="flex text-sm  space-x-2">
      <Phone className="w-4 h-4 text-gray-500" />
      <h3>testmail@gmail.com</h3>
    </div>
    <div className="flex text-sm  space-x-2">
      <MapPinned className="w-4 h-4 text-gray-500" />
      <h3>Address</h3>
    </div>
  </div>




    </Card>
  );
};

export default UserProfile