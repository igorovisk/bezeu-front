// hooks/useAuth.ts
import api from "../app/services/axios"; // Seu axios instance

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
