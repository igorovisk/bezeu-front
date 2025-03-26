"use client";
import {
   FaPhoneAlt,
   FaUser,
   FaEdit,
   FaTrash,
   FaUpload,
   FaSpinner,
   FaExternalLinkAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import api from "../../services/axios";
import { toast } from "react-toastify"; // Para mensagens de erro
import { useAuth } from "@/app/contexts/AuthContext";

export default function SupplierList() {
   const router = useRouter();
   const [expanded, setExpanded] = useState<string | null>(null);
   const [isMobile, setIsMobile] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");
   const context = useAuth();
   const [loading, setLoading] = useState(true);
   const userData = context.userData;

   useEffect(() => {
      async function fetchData() {
         setLoading(true); // Inicia o carregamento
         await context.fetchUserData();
         setLoading(false); // Finaliza o carregamento
      }
      fetchData();
   }, [router]);

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const filteredData = userData?.suppliers?.filter(
      (supplier: SupplierInterface) =>
         supplier.name.toLowerCase().includes(searchTerm.toLowerCase())
   );

   const toggleExpand = (id: string) => {
      if (isMobile) {
         setExpanded(expanded === id ? null : id);
      }
   };

   const handleEdit = (id: string) => {
      router.push(`/fornecedores/${id}/edit`);
   };

   const handleDelete = async (id: string) => {
      console.log(`Deleting fornecedor with id ${id}`);
      try {
         const deleteSupplierResponse = await api.patch(
            `users/${userData?.id}/suppliers/${id}`
         );

         if (deleteSupplierResponse.status == 200) {
            toast.success("Fornecedor DELETADO com sucesso!");
            // Atualize os dados do usuário após a exclusão
            await context.fetchUserData(); // Chama a função para atualizar os dados do usuário no contexto
         }
      } catch (error: any) {
         console.log(error.response.data.message, "Error Message");
         toast.error(error.response.data.message);
         toast.error("Ocorreu algum erro ao deletar o fornecedor");
      }
   };

   const handleUpload = (id: string) => {
      router.push(`/fornecedores/${id}/documentos/`);
      console.log(`Uploading document for fornecedor with id ${id}`);
   };

   const handleView = (id: string) => {
      router.push(`/fornecedores/${id}`);
   };

   if (loading) {
      return (
         <div className="flex justify-center items-center min-h-screen">
            <FaSpinner className="animate-spin text-3xl text-blue-500" />
         </div>
      );
   }

   return (
      <>
         {/* Campo de busca */}
         <div className="mb-4 p-2 px-5">
            <input
               type="text"
               placeholder="Buscar fornecedor..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full p-3 border border-gray-300 rounded-lg text-black"
            />
         </div>

         <div className="overflow-x-auto">
            {/* Tabela para desktop */}
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg hidden md:table">
               <thead className="bg-slate-800 text-white">
                  <tr>
                     <th className="px-6 py-3 text-left text-xm uppercase tracking-wider font-bold">
                        Nome do Fornecedor
                     </th>
                     <th className="py-3 w-fit whitespace-nowrap uppercase tracking-wider text-xm font-bold">
                        Ações
                     </th>
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-100">
                  {filteredData
                     ?.slice() // Create a shallow copy of the array to avoid mutating the original
                     .sort((a: SupplierInterface, b: SupplierInterface) =>
                        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
                     )
                     .filter((supplier: SupplierInterface) => !supplier.deleted)
                     .map((supplier: SupplierInterface, index: number) => (
                        <tr
                           key={index}
                           className="hover:bg-gray-100 bg-slate-100"
                        >
                           <td className="px-6 py-4 whitespace-nowrap text-md font-medium text-gray-900 flex items-center gap-2">
                              <FaUser className="text-gray-500" />
                              {supplier.name}
                           </td>
                           <td className="py-4 w-0 whitespace-nowrap">
                              <div className="flex items-center gap-3 px-5">
                                 <button
                                    onClick={() => handleEdit(supplier.id)}
                                    className="text-yellow-500 hover:text-yellow-600 text-lg"
                                    title="Edit"
                                 >
                                    <FaEdit size={26} />
                                 </button>
                                 <button
                                    onClick={() => handleDelete(supplier.id)}
                                    className="text-red-500 hover:text-red-600 text-lg"
                                    title="Delete"
                                 >
                                    <FaTrash size={26} />
                                 </button>
                                 <button
                                    onClick={() => handleUpload(supplier.id)}
                                    className="text-blue-500 hover:text-blue-600 text-lg"
                                    title="Upload Documents"
                                 >
                                    <FaUpload size={26} />
                                 </button>
                                 <button
                                    onClick={() => handleView(supplier.id)}
                                    className="text-green-500 hover:text-green-600 text-lg"
                                    title="View"
                                 >
                                    <FaExternalLinkAlt size={26} />
                                 </button>
                              </div>
                           </td>
                        </tr>
                     ))}
               </tbody>
            </table>

            {/* Layout para mobile */}
            <div className="grid grid-cols-1 md:hidden">
               {filteredData?.map(
                  (supplier: SupplierInterface, index: number) => (
                     <div
                        key={index}
                        className="bg-white shadow-md rounded-lg p-1 hover:bg-gray-200"
                     >
                        <h2
                           className="text-xl font-bold flex items-center gap-2 bg-sky-700 p-3 cursor-pointer"
                           onClick={() => toggleExpand(supplier.id)}
                        >
                           <FaUser className="text-white" />
                           {supplier.name}
                        </h2>

                        {isMobile && expanded === supplier.id && (
                           <>
                              <p className="text-gray-500 mt-2">
                                 {supplier.description}
                              </p>
                              <div className="flex items-center gap-2 mt-4 text-blue-600">
                                 <FaPhoneAlt className="text-gray-500" />
                                 <a
                                    href={`mailto:${supplier.phone}`}
                                    className="hover:underline"
                                 >
                                    {supplier.phone}
                                 </a>
                              </div>

                              <div className="flex justify-center gap-6 mt-6 items-center">
                                 <button
                                    onClick={() => handleEdit(supplier.id)}
                                    className="text-yellow-500 hover:text-yellow-600 text-2xl"
                                    title="Edit"
                                 >
                                    <FaEdit />
                                 </button>
                                 <button
                                    onClick={() => handleDelete(supplier.id)}
                                    className="text-red-500 hover:text-red-600 text-2xl"
                                    title="Delete"
                                 >
                                    <FaTrash />
                                 </button>
                                 <button
                                    onClick={() => handleUpload(supplier.id)}
                                    className="text-blue-500 hover:text-blue-600 text-2xl"
                                    title="Upload Documents"
                                 >
                                    <FaUpload />
                                 </button>
                                 <button
                                    onClick={() => handleView(supplier.id)}
                                    className="text-green-500 hover:text-green-600 text-2xl"
                                    title="View"
                                 >
                                    <FaExternalLinkAlt />
                                 </button>
                              </div>
                           </>
                        )}
                     </div>
                  )
               )}
            </div>
         </div>
      </>
   );
}
