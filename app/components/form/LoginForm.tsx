"use client";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // Hook atualizado
import { toast } from "react-toastify"; // Importa toast para mensagens de erro

export default function LoginForm() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const { login } = useAuth();

   async function handleSubmit(event: React.FormEvent) {
      event.preventDefault();
      await login(email, password); // Chama a função login do contexto
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
               <button
                  type="submit"
                  className="mt-10 bg-transparent p-4 rounded font-bold border-green-400 border text-green-400 hover:bg-green-400 hover:text-white"
               >
                  Fazer login
               </button>
            </div>
         </form>
      </section>
   );
}
``;
