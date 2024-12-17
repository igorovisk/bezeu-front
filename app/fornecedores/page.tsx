"use client";

import { useAuth } from "../contexts/AuthContext";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import SupplierList from "../components/list/SupplierList";
import { useRouter } from "next/navigation"; // Correct hook for router
import { FaSpinner } from "react-icons/fa"; // Ícone de carregamento

export default function FornecedoresPage() {
   const { userData } = useAuth(); // Desestrutura o estado e função do contexto
   const context = useAuth();
   const router = useRouter();
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      async function fetchData() {
         setLoading(true); // Inicia o carregamento
         await context.fetchUserData();
         setLoading(false); // Finaliza o carregamento
      }
      fetchData();
   }, [router]);

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="animate-spin text-3xl text-blue-500" />
         </div>
      );
   }

   return (
      <section className="flex flex-col w-full h-full bg-white text-white p-5">
         <div className="sm:flex  lg:justify-between items-center text-center ">
            <h1 className="flex font-bold text-2xl  w-full  p-5 text-center justify-center items-center m-auto">
               FORNECEDORES
            </h1>
            <Link
               type="button"
               className="rounded text-white bg-green-500 p-4 my-2 mx-5 font-bold flex items-center justify-center gap-2 lg:whitespace-nowrap"
               href={"/fornecedores/criar-fornecedor"}
            >
               <IoMdAddCircleOutline size={24} />
               <h1 className="text-nowrap">Novo Fornecedor</h1>
            </Link>
         </div>
         <div className=" w-full h-full">
            <SupplierList
               title={"Seus Fornecedores"}
               data={userData?.suppliers}
               userId={userData?.id}
            />
         </div>
      </section>
   );
}
