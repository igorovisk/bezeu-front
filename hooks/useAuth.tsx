// hooks/useAuth.ts
import api from "../app/services/axios"; // Seu axios instance
import { useAuth } from "@/app/contexts/AuthContext"; // Mantenha a importação, mas não chame o hook aqui

// Função para fazer login
export async function performLogin(email: string, password: string) {
   const response = await api.post("/login", { email, password });
   return response; // Retorna a resposta para o componente que chama esta função
}

// Função para logout
export async function performLogout() {
   const response = await api.post("/logout"); // Chama a API para fazer logout
   return response; // Retorna a resposta para o componente que chama esta função
}
