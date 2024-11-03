"use client";

import { toast } from "react-toastify"; // Para mensagens de erro
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { ChangeEvent, useEffect, useState } from "react";
import api from "../services/axios";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import List from "../components/list/List";
import { useRouter } from "next/navigation"; // Correct hook for router

export default function FornecedoresPage() {
   const { logout, userData } = useAuth(); // Desestrutura o estado e função do contexto
   const [suppliers, setSuppliers] = useState(userData?.suppliers);
   const context = useAuth();
   const router = useRouter();

   useEffect(() => {
      context.fetchUserData(); // Validate session on component mount
   }, [router]);

   return (
      <main className="flex flex-col w-full h-fit">
         <div className="flex justify-end p-5">
            <Link
               type="button"
               className="rounded text-white bg-green-500 p-4 font-bold flex items-center justify-center gap-2"
               href={"/fornecedores/criar-fornecedor"}
            >
               <IoMdAddCircleOutline size={24} />
               Novo Fornecedor
            </Link>
         </div>
         <div className="bg-slate-100 w-full">
            <List title={"Seus Fornecedores"} data={userData?.suppliers} />
         </div>
      </main>
   );
}
