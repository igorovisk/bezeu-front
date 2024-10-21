"use client";

import { toast } from "react-toastify"; // Para mensagens de erro
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { ChangeEvent, useState } from "react";
import api from "../services/axios";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";

export default function ClientesPage() {
   const { isLoggedIn, logout, userData } = useAuth(); // Desestrutura o estado e função do contexto
   const [name, setName] = useState<String>("");
   const [document, setDocument] = useState<String>("");
   const [phone, setPhone] = useState<String>("");
   const [description, setDescription] = useState<String>("");

   return (
      <main className="flex flex-col w-full ">
         <div className="flex justify-end p-5">
            <Link
               type="button"
               className="rounded text-white bg-green-500 p-4 font-bold flex items-center justify-center gap-2"
               href={"/clientes/criar-cliente"}
            >
               <IoMdAddCircleOutline size={24} />
               Novo Cliente
            </Link>
         </div>
      </main>
   );
}
