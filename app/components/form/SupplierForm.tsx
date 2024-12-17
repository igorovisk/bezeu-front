"use client";

import { toast } from "react-toastify"; // Para mensagens de erro
import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import api from "../../services/axios";
import { useRouter } from "next/navigation";

export default function SupplierForm() {
   const { userData } = useAuth(); // Desestrutura o estado e função do contexto
   const [name, setName] = useState<String>("");
   const [document, setDocument] = useState<String>("");
   const [phone, setPhone] = useState<String>("");
   const [description, setDescription] = useState<String>("");
   const router = useRouter();

   async function handleSubmit(event: React.FormEvent) {
      event.preventDefault();
      try {
         const newSupplierResponse = await api.post(
            `users/${userData?.id}/suppliers`,
            {
               name,
               document,
               phone,
               description,
            }
         ); // Chama a função login do contexto

         if (newSupplierResponse.status == 200) {
            toast.success("Fornecedor cadastrado com sucesso!");
            console.log(newSupplierResponse, " Supp response");

            router.push("/fornecedores");
         }
      } catch (error: any) {
         // If the server responded with an error status code
         console.log(error.response.data.message, "Error Message");
         toast.error(error.response.data.message);
         console.log("Error caiu aqui");
      }
   }

   return (
      <div className="flex w-full h-full bg-white">
         <form
            className="text-center bg-slate-100 lg:w-[300px]  mx-auto mt-10 p-5 text-black gap-2 w-full h-fit justify-center items-center "
            onSubmit={handleSubmit}
         >
            <h1 className="font-bold text-xl  text-center m-auto items-center justify-center flex mb-5">
               Novo Fornecedor
            </h1>
            <span className="flex flex-col gap-4 justify-center items-center w-full h-full">
               <span className="flex flex-col justify-start items-start font-bold  ">
                  <label htmlFor="">Nome</label>
                  <input
                     type="text"
                     id="name"
                     placeholder="Nome do fornecedor"
                     className="p-2"
                     onChange={(e) => setName(e.target.value)}
                  />
               </span>
               <span className="flex flex-col justify-start items-start font-bold">
                  <label htmlFor="document">CPF/CNPJ</label>
                  <input
                     type="text"
                     id="document"
                     placeholder="Documento do fornecedor"
                     className="p-2"
                     onChange={(e) => setDocument(e.target.value)}
                  />
               </span>
               <span className="flex flex-col justify-start items-start font-bold">
                  <label htmlFor="">Telefone</label>
                  <input
                     type="text"
                     id="phone"
                     placeholder="Telefone do fornecedor"
                     className="p-2"
                     onChange={(e) => setPhone(e.target.value)}
                  />
               </span>
               <span className="flex flex-col justify-start items-start font-bold">
                  <label htmlFor="">Descrição</label>
                  <input
                     type="textarea"
                     id="description"
                     placeholder="Descrição do fornecedor"
                     className="p-2"
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </span>
            </span>

            <button
               type="submit"
               className="mt-10 bg-green-400 p-4 rounded font-bold"
            >
               Cadastrar
            </button>
         </form>
      </div>
   );
}
