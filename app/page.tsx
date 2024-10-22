"use client";

import { useAuth } from "./contexts/AuthContext"; // Usa o hook atualizado
import { toast } from "react-toastify"; // Para mensagens de erro
export default function Home() {
   const { logout } = useAuth(); // Desestrutura o estado e função do contexto

   const handleLogout = async () => {
      try {
         await logout(); // Agora chama diretamente a função do contexto
         toast.success("Logout realizado com sucesso");
      } catch (error) {
         console.error("Erro ao deslogar:", error);
         toast.error("Erro ao realizar logout");
      }
   };

   return <div>oi</div>;
}
