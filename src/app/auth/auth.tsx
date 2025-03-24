
import { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FullPageLoader } from "@/components/loader/full-page-loader";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const getRole = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_PUBLIC_API_URL}/api/auth/user/role`,
          { withCredentials: true }
        );
    
        const result = res.data;
    
        if (result.success.code !== 200) {
          return navigate("/login");
        }
        
        if (
          result.success.data.role === "Admin" ||
          result.success.data.role === "Employee" ||
          result.success.data.role === "Manager"){
          if (result.success.data.role === "Employee") {
          setTimeout(() => navigate("/overview"), 1000);
          } else {
          setTimeout(() => navigate("/"), 1000);
          }
        }
      } catch (error) {
        return navigate("/login");
      }
    };
    getRole();
  }, [navigate]);
  return <FullPageLoader text={"Authenticating"} />;
};

export default Auth;
