"use client";

import Link from "next/link";
import { IoMdAddCircleOutline } from "react-icons/io";
import SupplierList from "../components/list/SupplierList";

export default function FornecedoresPage() {
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
            <SupplierList />
         </div>
      </section>
   );
}
