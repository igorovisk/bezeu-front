"use client";
import { useAuth } from "@/app/contexts/AuthContext"; // Adjust path if needed
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CiBoxes } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";

export default function Sidebar() {
   const { logout, isLoggedIn, userData } = useAuth(); // Get logout and auth state
   const pathname = usePathname();

   const handleLogout = async (e: React.MouseEvent) => {
      e.preventDefault();
      await logout();
   };

   function checkIfIsActive(href: string) {
      return pathname === href;
   }

   if (!isLoggedIn) return null;

   return (
      <aside className=" hidden md:flex  w-[16rem] flex-col bg-gray-100 text-gray-800 shadow dark:bg-gray-900 dark:text-gray-200 p-6 ">
         <div className="mb-4 flex items-center">
            <h1 className="text-lg font-medium">Bezeu Eventos</h1>
         </div>
         <div className="flex-1 overflow-y-auto h-full overflow-x-hidden hover:overflow-x-hidden">
            <nav className="space-y-1">
               <span className="block text-sm font-medium mb-4">
                  {`Bem vindo(a) ${userData?.username}`}
               </span>
               <Link
                  href="/fornecedores"
                  className={`flex items-center space-x-2 p-3 px-4 rounded-lg ${
                     checkIfIsActive("/fornecedores")
                        ? "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  }`}
               >
                  <CiBoxes size={20} />
                  <span>Fornecedores</span>
               </Link>
               <Link
                  href="/clientes"
                  className={`flex items-center space-x-2 p-3 px-4 rounded-lg ${
                     checkIfIsActive("/clientes")
                        ? "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  }`}
               >
                  <MdAttachMoney size={20} />
                  <span>Clientes</span>
               </Link>
               <Link
                  href="/notes"
                  className={`flex items-center space-x-2 p-3 px-4 rounded-lg ${
                     checkIfIsActive("/anotacoes")
                        ? "bg-gray-200 text-gray-800 dark:bg-gray-800 dark:text-gray-100"
                        : "text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                  }`}
               >
                  <FaNoteSticky size={20} />
                  <span>Anotações</span>
               </Link>
            </nav>
         </div>
         <div className="mt-4">
            <button
               className="flex items-center space-x-2 p-2 rounded-lg text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-800 dark:hover:text-gray-100 w-full"
               onClick={handleLogout}
            >
               <IoIosLogOut size={20} />
               <span>Sair</span>
            </button>
         </div>
      </aside>
   );
}
