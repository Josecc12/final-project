'use client'
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Mail, AtSign, Briefcase } from "lucide-react";

type User = {
  id: number;
  name: string;
  lastname: string;
  username: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  is_active: boolean;
  role: {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
  };
};

type Props = {
  params:{
    id: number;
  }
}

export default function UserDetail({params}:Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log("Fetching user data");
        console.log("token", localStorage.getItem("token"));
        const token = localStorage.getItem("token");
        
        if (!token) {
          console.log("No token found");
          throw new Error("No token found");
          
        }

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users/${params.id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch user data");
        console.error(err);
       // router.push("/login"); // Redirigir al login si no hay token o hay error
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!user) {
    return <p>No user data found</p>;
  }

  return (
    <div className="mt-24">
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="flex flex-col items-center space-y-4">
          <Avatar className="w-24 h-24">
            <AvatarImage
              src="/placeholder.svg?height=96&width=96"
              alt={`${user.name} ${user.lastname}`}
            />
            <AvatarFallback>
              {user.name[0]}
              {user.lastname[0]}
            </AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold">
            {user.name} {user.lastname}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-4">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Nombre completo</p>
              <p className="text-sm text-muted-foreground">
                {user.name} {user.lastname}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <AtSign className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Nombre de usuario</p>
              <p className="text-sm text-muted-foreground">
                {user.username}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Mail className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Correo electrónico</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Briefcase className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Rol</p>
              <p className="text-sm text-muted-foreground">
                {user.role.name}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
