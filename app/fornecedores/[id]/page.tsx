"use client";

import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";

interface ProductInterface {
   id: string;
   name: string;
   quantity: number;
   costPerUnit: number;
}

interface SupplierInterface {
   id: string;
   name: string;
   phone: string;
   email: string;
   document: string;
   description: string;
   products?: ProductInterface[];
}

export default function ViewFornecedor(props: any) {
   const { id } = props.params; // ID do fornecedor vindo da URL
   const { userData } = useAuth();
   const [supplier, setSupplier] = useState<SupplierInterface>();
   const [newProduct, setNewProduct] = useState<ProductInterface>({
      id: "",
      name: "",
      quantity: 0,
      costPerUnit: 0,
   });

   const router = useRouter();

   useEffect(() => {
      if (userData?.suppliers) {
         const foundSupplier = userData.suppliers.find(
            (sup: SupplierInterface) => sup.id === id
         );

         if (foundSupplier) {
            setSupplier(foundSupplier);
         }
      }
   }, [userData, id]);

   const handleAddProduct = () => {
      if (supplier) {
         const updatedProducts = supplier.products
            ? [
                 ...supplier.products,
                 { ...newProduct, id: Date.now().toString() },
              ]
            : [{ ...newProduct, id: Date.now().toString() }];

         setSupplier({ ...supplier, products: updatedProducts });
         setNewProduct({ id: "", name: "", quantity: 0, costPerUnit: 0 });
         toast.success("Produto adicionado com sucesso!");
      }
   };

   const handleDeleteProduct = (productId: string) => {
      if (supplier) {
         const updatedProducts = supplier.products?.filter(
            (product) => product.id !== productId
         );
         setSupplier({ ...supplier, products: updatedProducts });
         toast.success("Produto deletado com sucesso!");
      }
   };

   const handleEditProduct = (product: ProductInterface) => {
      setNewProduct(product);
   };

   return (
      <section className="flex flex-col w-full h-full bg-gray-50 text-gray-900 p-6 gap-6">
         {/* Header */}
         <h1 className="text-4xl font-bold text-center text-white bg-blue-600 p-4 rounded-md shadow">
            Detalhes do Fornecedor
         </h1>

         {/* Supplier Details */}
         <div className="bg-white p-6 rounded-md shadow border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
               Dados Básicos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <h3 className="font-semibold">Nome:</h3>
                  <p>{supplier?.name}</p>
               </div>
               <div>
                  <h3 className="font-semibold">Telefone:</h3>
                  <p>{supplier?.phone}</p>
               </div>
               <div>
                  <h3 className="font-semibold">Email:</h3>
                  <p>{supplier?.email}</p>
               </div>
               <div>
                  <h3 className="font-semibold">CPF/CNPJ:</h3>
                  <p>{supplier?.document}</p>
               </div>
               <div className="md:col-span-2">
                  <h3 className="font-semibold">Descrição:</h3>
                  <p>{supplier?.description}</p>
               </div>
            </div>
         </div>

         {/* Products Section */}
         <div className="bg-white p-6 rounded-md shadow border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
               Produtos Alugados
            </h2>
            <ul className="flex flex-col gap-4">
               {supplier?.products?.map((product) => (
                  <li
                     key={product.id}
                     className="flex justify-between items-center p-4 bg-gray-100 rounded-md shadow"
                  >
                     <div>
                        <h3 className="font-semibold">{product.name}</h3>
                        <p>
                           Quantidade: {product.quantity} | Custo por unidade:
                           R$
                           {product.costPerUnit.toFixed(2)}
                        </p>
                        <p>
                           Total: R$
                           {(product.quantity * product.costPerUnit).toFixed(2)}
                        </p>
                        <p>
                           Data de retirada no fornecedor:
                           {product.rentStartDate}
                        </p>
                        <p>
                           Data de devolução:
                           {product.rentEndDate}
                        </p>
                     </div>
                     <div className="flex gap-2">
                        <button
                           onClick={() => handleEditProduct(product)}
                           className="text-blue-600 hover:text-blue-800"
                        >
                           <AiOutlineEdit size={20} />
                        </button>
                        <button
                           onClick={() => handleDeleteProduct(product.id)}
                           className="text-red-600 hover:text-red-800"
                        >
                           <AiOutlineDelete size={20} />
                        </button>
                     </div>
                  </li>
               ))}
            </ul>
         </div>

         {/* Add Product Form */}
         <div className="bg-white p-6 rounded-md shadow border">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
               Cadastrar Produto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <div>
                  <label className="block font-semibold">Nome do Produto</label>
                  <input
                     type="text"
                     value={newProduct.name}
                     onChange={(e) =>
                        setNewProduct({ ...newProduct, name: e.target.value })
                     }
                     className="w-full p-2 border rounded-md"
                  />
               </div>
               <div>
                  <label className="block font-semibold">Quantidade</label>
                  <input
                     type="number"
                     value={newProduct.quantity}
                     onChange={(e) =>
                        setNewProduct({
                           ...newProduct,
                           quantity: Number(e.target.value),
                        })
                     }
                     className="w-full p-2 border rounded-md"
                  />
               </div>
               <div>
                  <label className="block font-semibold">
                     Custo por Unidade (R$)
                  </label>
                  <input
                     type="number"
                     value={newProduct.costPerUnit}
                     onChange={(e) =>
                        setNewProduct({
                           ...newProduct,
                           costPerUnit: Number(e.target.value),
                        })
                     }
                     className="w-full p-2 border rounded-md"
                  />
               </div>
               <div className="flex items-end">
                  <button
                     onClick={handleAddProduct}
                     className="w-full bg-green-600 text-white p-2 rounded-md shadow hover:bg-green-700"
                  >
                     <AiOutlinePlus className="inline-block mr-2" size={20} />
                     Adicionar Produto
                  </button>
               </div>
            </div>
         </div>
      </section>
   );
}
