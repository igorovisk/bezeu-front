"use client";
import { createContext, useContext, useState, ReactNode } from "react";

interface AuthContextType {
   isLoggedIn: boolean;
   login: () => void; // Função para definir o estado de loggedIn como true
   logout: () => void; // Função para definir o estado de loggedIn como false
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isLoggedIn, setIsLoggedIn] = useState(false);

   // Função para logar o usuário
   const login = () => setIsLoggedIn(true);
   // Função para deslogar o usuário
   const logout = () => {
      setIsLoggedIn(false);
      // Aqui você pode adicionar lógica para remover cookies ou fazer logout na API
   };

   return (
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
         {children}
      </AuthContext.Provider>
   );
};

// Hook para acessar o contexto de autenticação
export const useAuth = () => {
   const context = useContext(AuthContext);
   if (context === undefined) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
