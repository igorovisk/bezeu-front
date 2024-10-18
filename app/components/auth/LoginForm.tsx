"use client";
import { useAuth } from "@/app/contexts/AuthContext";
import { performLogin } from "@/hooks/useAuth";
import { useState } from "react";
import { toast } from "react-toastify"; // Importa toast para mensagens de erro

export default function LoginForm() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login } = useAuth();

   async function handleSubmit(event: React.FormEvent) {
      event.preventDefault();
      try {
         const response = await performLogin(email, password); // Chama a função de login
         if (response.status === 200) {
            login(); // Chama a função login do contexto se a resposta for bem-sucedida
         } else {
            toast.error("Usuário ou senha estão incorretos"); // Mensagem de erro se o login falhar
         }
      } catch (error) {
         console.error("Erro no login:", error);
         toast.error("Usuário ou senha estão incorretos"); // Mensagem de erro
      }
   }

   return (
      <section>
         <form
            className="flex flex-col justify-center items-center h-screen"
            onSubmit={handleSubmit}
         >
            <h1 className="text-center text-white text-5xl mb-10">
               Bezeu Eventos
            </h1>
            <div className="flex flex-col gap-2">
               <label htmlFor="email">Email</label>
               <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="p-2 text-black"
                  placeholder="Insira seu email"
               />
               <label htmlFor="password">Senha</label>
               <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="p-2 text-black"
                  placeholder="Insira sua senha"
               />
               <button type="submit" className="mt-10 bg-green-400 p-4 rounded">
                  Fazer login
               </button>
            </div>
         </form>
      </section>
   );
}
