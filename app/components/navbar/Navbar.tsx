"use client";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // Adjust path if needed
import Link from "next/link";
import { CiBoxes } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";

export default function Navbar() {
   const { logout, isLoggedIn, userData } = useAuth(); // Get logout and auth state
   const [isOpen, setIsOpen] = useState(false);

   const handleLogout = async (e: React.MouseEvent) => {
      e.preventDefault();
      await logout();
   };

   return (
      <nav className="bg-violet-600">
         <div className="flex justify-between items-center w-full p-5">
            {/* Logo / Title */}
            <Link href={"/"}>
               <h1 className="text-white text-3xl">Bezeu Eventos</h1>
            </Link>

            {isLoggedIn && (
               <>
                  {/* Hamburger Icon (Mobile) */}
                  <button
                     className="block lg:hidden p-2 text-white"
                     onClick={() => setIsOpen(!isOpen)}
                  >
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           strokeWidth={2}
                           d="M4 6h16M4 12h16M4 18h16"
                        />
                     </svg>
                  </button>

                  {/* Desktop Menu */}
                  <div className="hidden lg:flex gap-4 items-center">
                     <span className="font-bold pr-10">
                        {`Bem vindo(a) ${userData?.username}`}
                     </span>

                     <Link
                        href="/fornecedores"
                        className="text-white flex items-center gap-2"
                     >
                        <CiBoxes size={24} />
                        Fornecedores
                     </Link>

                     <Link
                        href="/clientes"
                        className="text-white flex items-center gap-2"
                     >
                        <MdAttachMoney size={24} />
                        Clientes
                     </Link>

                     <button
                        className="text-white flex items-center gap-2"
                        onClick={handleLogout}
                     >
                        <IoIosLogOut size={24} />
                        Sair
                     </button>
                  </div>
               </>
            )}
         </div>

         {/* Mobile Menu */}
         {isLoggedIn && (
            <div
               className={`lg:hidden bg-violet-500 transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
               }`}
            >
               <Link
                  href="/fornecedores"
                  className="block p-4 text-white"
                  onClick={() => setIsOpen(false)}
               >
                  <CiBoxes size={24} /> Fornecedores
               </Link>

               <Link
                  href="/clientes"
                  className="block p-4 text-white"
                  onClick={() => setIsOpen(false)}
               >
                  <MdAttachMoney size={24} /> Clientes
               </Link>

               <button className="block p-4 text-white" onClick={handleLogout}>
                  <IoIosLogOut size={24} /> Sair
               </button>
            </div>
         )}
      </nav>
   );
}
