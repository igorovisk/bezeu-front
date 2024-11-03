"use client";
import {
   createContext,
   useContext,
   useEffect,
   useState,
   ReactNode,
} from "react";
import api from "../services/axios"; // Import Axios instance
import { toast } from "react-toastify";
import UserData from "../interfaces/UserInterface";
import { useRouter } from "next/navigation"; // Correct hook for router

interface AuthContextType {
   isLoggedIn: boolean;
   login: (email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
   userData: UserData | null;
   fetchUserData: () => {};
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userData, setUserData] = useState<UserData | null>(null);
   const router = useRouter();

   // Function to validate session and fetch user data
   const fetchUserData = async () => {
      try {
         const response = await api.get("/me");
         if (response.status === 200) {
            if (response.data) {
               setUserData(response.data);
               setIsLoggedIn(true);
            }
         } else {
            setIsLoggedIn(false);
            setUserData(null);
         }
      } catch (error) {
         console.error("Session validation failed:", error);
         setIsLoggedIn(false);
         setUserData(null);
         router.push("/login"); // Redirect to login if session is invalid
      }
   };

   // Fetch user data on initial load and when user navigates
   useEffect(() => {
      fetchUserData(); // Validate session on component mount
   }, [router]);

   useEffect(() => {
      if (!userData) {
         setIsLoggedIn(false);
      }
   }, []);

   // Login function
   const login = async (email: string, password: string) => {
      try {
         const response = await api.post("/login", { email, password });
         if (response.status == 200) {
            console.log(response.status);
            await fetchUserData(); // Fetch user data after login
            router.push("/"); // Navigate after successful login
         } else {
            toast.error("Usuário ou senha incorretos");
         }
      } catch (error) {
         console.error("Erro no login:", error);
         toast.error("Erro ao realizar login");
      }
   };

   // Logout function
   const logout = async () => {
      try {
         await api.post("/logout");
         setIsLoggedIn(false);
         setUserData(null);
         router.push("/login"); // Redirect to login after logout
      } catch (error) {
         console.error("Erro no logout:", error);
         toast.error("Erro ao realizar logout");
      }
   };

   return (
      <AuthContext.Provider
         value={{ isLoggedIn, login, logout, userData, fetchUserData }}
      >
         {children}
      </AuthContext.Provider>
   );
};

// Hook to access the auth context
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
