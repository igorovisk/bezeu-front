"use client";

import { useAuth } from "../contexts/AuthContext"; // Usa o hook atualizado
import LoginForm from "../components/form/LoginForm";
import { toast } from "react-toastify"; // Para mensagens de erro
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
   const { isLoggedIn, logout, userData } = useAuth(); // Desestrutura o estado e função do contexto
   const router = useRouter();

   useEffect(() => {
      if (isLoggedIn) {
         router.push("/"); // Redirect on successful login
      }
   }, [isLoggedIn, router]);

   const handleLogout = async () => {
      try {
         await logout(); // Agora chama diretamente a função do contexto
         toast.success("Logout realizado com sucesso");
      } catch (error) {
         console.error("Erro ao deslogar:", error);
         toast.error("Erro ao realizar logout");
      }
   };

   return (
      <div>
         <LoginForm />
      </div>
   );
}
