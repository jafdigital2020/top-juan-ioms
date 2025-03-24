import { useEffect, useState, ReactNode } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FullPageLoader } from "../loader/full-page-loader";

interface ProtectionProps {
  children: ReactNode;
}

export function NonLoggedInPage({ children: Component }: ProtectionProps) {
  // If auth, send to /auth
  // If not auth, render

  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/auth/is-auth`,
          { withCredentials: true }
        );

        const result = res.data;

        if (result.success && result.success.data && result.success.data.isAuth) {
          navigate("/auth");
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        setIsAuth(false);
      }
    };

    checkAuthState();
  }, [navigate]);

  if (isAuth === null) {
    return <FullPageLoader text={"Authenticating"} />;
  }

  if (isAuth === false) {
    return <>{Component}</>;
  }
}

export function LoggedInPageProtection({
  children: Component,
}: ProtectionProps) {
  const [isAuth, setIsAuth] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthState = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/auth/is-auth`,
          { withCredentials: true }
        );

        const result = res.data;

        if (result.success && result.success.data && result.success.data.isAuth) {
          setIsAuth(true);
        } else {
          setTimeout(() => navigate("/login"), 2000);
        }
      } catch (error) {
        navigate("/login");
      }
    };

    checkAuthState();
  }, [navigate]);

  if (isAuth === null) {
    return <FullPageLoader text={"Authenticating"} />;
  }

  if (isAuth === true) {
    return <>{Component}</>;
  }
}

export function RoleBasedRouteProtection({
  children: Component,
}: ProtectionProps) {
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRole = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/auth/user/role`,
          { withCredentials: true }
        );

        const result = res.data;

        if (result.success && result.success.data && result.success.data.role) {
          setRole(result.success.data.role);
        } else {
          navigate("/auth");
        }
      } catch (error) {
        navigate("/login");
      }
    };

    getRole();
  }, [navigate]);

  if (role === null) {
    return <FullPageLoader text={"Authenticating..."} />;
  }

  return <>{Component}</>;
}
