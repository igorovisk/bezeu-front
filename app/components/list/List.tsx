"use client";
import {
   FaPhoneAlt,
   FaUser,
   FaEdit,
   FaTrash,
   FaUpload,
   FaExternalLinkAlt,
} from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function List({ data }: any) {
   const router = useRouter();
   const [expanded, setExpanded] = useState<string | null>(null);
   const [isMobile, setIsMobile] = useState(false);
   const [searchTerm, setSearchTerm] = useState("");

   useEffect(() => {
      const handleResize = () => {
         setIsMobile(window.innerWidth <= 768);
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   const filteredData = data?.filter((supplier: SupplierInterface) =>
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

   const handleDelete = (id: string) => {
      console.log(`Deleting fornecedor with id ${id}`);
   };

   const handleUpload = (id: string) => {
      console.log(`Uploading document for fornecedor with id ${id}`);
   };

   const handleView = (id: string) => {
      router.push(`/fornecedores/${id}`);
   };

   return (
      <>
         {/* Campo de busca */}
         <div className="mb-4 p-2 px-5">
            <input
               type="text"
               placeholder="Buscar fornecedor..."
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
               className="w-full p-3 border border-gray-300 rounded-lg"
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
                  {filteredData?.map(
                     (supplier: SupplierInterface, index: number) => (
                        <tr key={index} className="hover:bg-gray-100">
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
                     )
                  )}
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
