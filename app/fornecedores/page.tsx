"use client";

import { toast } from "react-toastify"; // Para mensagens de erro
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { ChangeEvent, useState } from "react";
import api from "../services/axios";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import List from "../components/list/List";

export default function FornecedoresPage() {
   const { logout, userData } = useAuth(); // Desestrutura o estado e função do contexto
   const [suppliers, setSuppliers] = useState(userData?.suppliers);

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
            <List title={"Seus Fornecedores"}></List>
         </div>
      </main>
   );
}
