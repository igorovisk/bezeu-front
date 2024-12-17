"use client";

import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import api from "../../../services/axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function EditFornecedor(props: any) {
   const { id } = props.params; // ID do fornecedor vindo da URL
   const { userData } = useAuth(); // Obtenha o userData do AuthContext
   const [name, setName] = useState<string>("");
   const [document, setDocument] = useState<string>("");
   const [phone, setPhone] = useState<string>("");
   const [description, setDescription] = useState<string>("");
   const router = useRouter();

   useEffect(() => {
      if (userData?.suppliers) {
         const foundSupplier = userData.suppliers.find(
            (sup: SupplierInterface) => sup.id === id
         );

         if (foundSupplier) {
            setName(foundSupplier.name || "");
            setDocument(foundSupplier.document || ""); // Garantindo que document não seja undefined
            setPhone(foundSupplier.phone || "");
            setDescription(foundSupplier.description || "");
         }
      }
   }, [userData, id]);

   console.log(`users/${userData?.id}/suppliers/${id}`);
   async function handleSubmit(event: React.FormEvent) {
      event.preventDefault();
      try {
         const editSupplierResponse = await api.put(
            `users/${userData?.id}/suppliers/${id}`,
            {
               name,
               document,
               phone,
               description,
            }
         );

         if (editSupplierResponse.status === 200) {
            toast.success("Fornecedor EDITADO com sucesso!");
            console.log(editSupplierResponse, " Supp response");

            router.push("/fornecedores");
         }
      } catch (error: any) {
         const errorMessage =
            error?.response?.data?.message || "Erro ao cadastrar fornecedor.";
         console.log(errorMessage, "Error Message");
         toast.error(errorMessage);
      }
   }

   return (
      <section className="flex flex-col w-full h-full bg-white text-black p-5">
         <div>
            <form
               className="text-center bg-slate-100 sm:w-[300px] w-fit h-fit mx-auto mt-10 p-5 text-black"
               onSubmit={handleSubmit}
            >
               <h1 className="font-bold text-xl text-center m-auto justify-center items-center flex mb-5">
                  EDITANDO FORNECEDOR
               </h1>
               <span className="flex flex-col gap-2 justify-start items-start font-bold">
                  <label htmlFor="name">Nome</label>
                  <input
                     type="text"
                     id="name"
                     placeholder="Nome do fornecedor"
                     className="p-2"
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                  />
               </span>
               <span className="flex flex-col gap-2 justify-start items-start font-bold">
                  <label htmlFor="document">CPF/CNPJ</label>
                  <input
                     type="text"
                     id="document"
                     placeholder="Documento do fornecedor"
                     className="p-2"
                     value={document}
                     onChange={(e) => setDocument(e.target.value)}
                  />
               </span>
               <span className="flex flex-col gap-2 justify-start items-start font-bold">
                  <label htmlFor="phone">Telefone</label>
                  <input
                     type="text"
                     id="phone"
                     placeholder="Telefone do fornecedor"
                     className="p-2"
                     value={phone}
                     onChange={(e) => setPhone(e.target.value)}
                  />
               </span>
               <span className="flex flex-col gap-2 justify-start items-start font-bold">
                  <label htmlFor="description">Descrição</label>
                  <input
                     type="text"
                     id="description"
                     placeholder="Descrição do fornecedor"
                     className="p-2"
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                  />
               </span>
               <span className="flex gap-2 justify-center items-center">
                  <button
                     type="button"
                     onClick={() => router.push("/fornecedores")}
                     className="mt-10 bg-red-400 p-4 rounded font-bold w-full"
                  >
                     Cancelar
                  </button>
                  <button
                     type="submit"
                     className="mt-10 bg-green-400 p-4 rounded font-bold w-full"
                  >
                     Editar
                  </button>
               </span>
            </form>
         </div>
      </section>
   );
}
