"use client";

import { useAuth } from "../../../contexts/AuthContext";
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

export default function ViewDocumentosFornecedor(props: any) {
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
         Documentos
      </section>
   );
}
