// app/page.tsx (ou onde você está usando o logout)
"use client";

import { useAuth } from "./contexts/AuthContext"; // Importa o useAuth
import { useState } from "react";
import { performLogin, performLogout } from "../hooks/useAuth"; // Importa as funções de login e logout
import { toast } from "react-toastify"; // Importa toast para mensagens de erro
import LoginForm from "./components/auth/LoginForm";

export default function Home() {
   const { isLoggedIn, logout } = useAuth(); // Desestruture o logout do contexto

   const handleLogout = async () => {
      try {
         await performLogout(); // Chama a função de logout da API
         logout(); // Atualiza o estado de loggedIn no contexto
      } catch (error) {
         console.error("Erro ao deslogar:", error);
      }
   };

   return (
      <div>
         {!isLoggedIn ? (
            <LoginForm />
         ) : (
            <div>
               <h1>You are logged in!</h1>
               <button onClick={handleLogout}>Logout</button>
            </div>
         )}
      </div>
   );
}
