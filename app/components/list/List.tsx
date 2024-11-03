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

export default function List({ title, data }: any) {
   const router = useRouter();

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
         <h1 className="font-bold text-2xl mb-6">{title}</h1>
         <div className="overflow-x-auto">
            <table className="min-w-full table-auto bg-white shadow-md rounded-lg hidden md:table">
               <thead className="bg-slate-800 text-white">
                  <tr>
                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Nome do Fornecedor
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Descrição
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Telefone/Email
                     </th>
                     <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                        Ações
                     </th>
                  </tr>
               </thead>
               <tbody className="bg-white divide-y divide-gray-200">
                  {data &&
                     data.map((supplier: SupplierInterface, index: number) => {
                        console.log(supplier);
                        return (
                           <tr key={index} className="hover:bg-gray-100">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center gap-2">
                                 <FaUser className="text-gray-500" />
                                 {supplier.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                 {supplier.description}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 flex items-center gap-2">
                                 <FaPhoneAlt className="text-gray-500" />
                                 <a
                                    href={`mailto:${supplier.phone}`}
                                    className="hover:underline"
                                 >
                                    {supplier.phone}
                                 </a>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                 <div className="flex items-center gap-2 justify-between">
                                    <button
                                       onClick={() => handleEdit(supplier.id)}
                                       className="text-yellow-500 hover:text-yellow-600"
                                       title="Edit"
                                    >
                                       <FaEdit />
                                    </button>
                                    <button
                                       onClick={() => handleDelete(supplier.id)}
                                       className="text-red-500 hover:text-red-600"
                                       title="Delete"
                                    >
                                       <FaTrash />
                                    </button>
                                    <button
                                       onClick={() => handleUpload(supplier.id)}
                                       className="text-blue-500 hover:text-blue-600"
                                       title="Upload Documents"
                                    >
                                       <FaUpload />
                                    </button>
                                    <button
                                       onClick={() => handleView(supplier.id)}
                                       className="text-green-500 hover:text-green-600"
                                       title="View"
                                    >
                                       <FaExternalLinkAlt />
                                    </button>
                                 </div>
                              </td>
                           </tr>
                        );
                     })}
               </tbody>
            </table>

            {/* Mobile layout - cartões com ícones maiores e centralizados */}
            <div className="grid grid-cols-1 gap-6 md:hidden">
               {data &&
                  data.map((supplier: SupplierInterface, index: number) => {
                     return (
                        <div
                           key={index}
                           className="bg-white shadow-md rounded-lg p-5 hover:bg-gray-100"
                        >
                           <h2 className="text-xl font-bold flex items-center gap-2">
                              <FaUser className="text-gray-500" />
                              {supplier.name}
                           </h2>
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

                           {/* Ícones maiores e centralizados no mobile */}
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
                        </div>
                     );
                  })}
            </div>
         </div>
      </>
   );
}
