"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import api from "../services/axios"; // Importando instância do axios
import { toast } from "react-toastify"; // Para mensagens de erro
import UserData from "../interfaces/UserInterface";

interface AuthContextType {
   isLoggedIn: boolean;
   login: (email: string, password: string) => Promise<void>;
   logout: () => Promise<void>;
   userData: UserData | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);
   const [userData, setUserData] = useState<UserData | null>(null);
   // Função para realizar login
   const login = async (email: string, password: string) => {
      try {
         const response = await api.post("/login", { email, password });
         if (response.status === 200) {
            const meResponse = await api.get("/me");
            console.log(meResponse, "me response");
            if ((meResponse.status = 200)) {
               setIsLoggedIn(true);
               setUserData(meResponse.data);
            }
         } else {
            toast.error("Usuário ou senha incorretos");
         }
      } catch (error) {
         console.error("Erro no login:", error);
         toast.error("Erro ao realizar login");
      }
   };

   // Função para realizar logout
   const logout = async () => {
      try {
         await api.post("/logout");
         setIsLoggedIn(false);
      } catch (error) {
         console.error("Erro no logout:", error);
         toast.error("Erro ao realizar logout");
      }
   };

   return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout, userData }}>
         {children}
      </AuthContext.Provider>
   );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth deve ser usado dentro de um AuthProvider");
   }
   return context;
};
