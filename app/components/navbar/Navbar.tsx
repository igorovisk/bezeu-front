"use client";
import { useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // Use the context to handle logout
import Link from "next/link";
import { CiBoxes } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { FaRegNoteSticky } from "react-icons/fa6";

export default function Navbar() {
   const { logout, isLoggedIn, userData } = useAuth(); // Get the logout function from context
   const [isOpen, setIsOpen] = useState(false); // State to toggle the menu

   const handleLogout = async (e: React.MouseEvent) => {
      e.preventDefault();
      await logout();
   };
   return (
      isLoggedIn && (
         <nav className="bg-violet-600">
            <div className="flex justify-between items-center w-full p-5">
               <h1 className="text-white text-3xl">Bezeu Eventos</h1>

               {/* Hamburger Icon */}
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

               {/* Menu Links (Desktop) */}
               <div className="hidden lg:flex gap-4 items-center">
                  <span className="flex items-center justify-center gap-1">
                     <h1 className="font-bold pr-10">
                        Bem vindo(a) {userData?.username}
                     </h1>
                     |
                  </span>
                  <span className="flex items-center justify-center gap-1">
                     <CiBoxes size={24} />
                     <Link
                        type="button"
                        className="rounded text-white font-bold"
                        href={"/fornecedores"}
                     >
                        Fornecedores
                     </Link>
                  </span>
                  |
                  <span className="flex items-center justify-center gap-1">
                     <MdAttachMoney size={24} />
                     <button
                        type="button"
                        className="rounded text-white font-bold"
                        onClick={handleLogout}
                     >
                        Clientes
                     </button>
                  </span>
                  |
                  <span className="flex items-center justify-center gap-1">
                     <FaRegNoteSticky size={24} />
                     <button
                        type="button"
                        className="rounded text-white font-bold"
                     >
                        Notas
                     </button>
                  </span>
                  |
                  <span className="flex items-center justify-center gap-1">
                     <IoIosLogOut size={24} />
                     <button
                        type="button"
                        className="rounded text-white font-bold"
                        onClick={handleLogout}
                     >
                        Sair
                     </button>
                  </span>
               </div>
            </div>

            {/* Mobile Menu with Transition */}
            <div
               className={`pt-3 text-center lg:hidden flex flex-col gap-1 bg-violet-500 overflow-hidden transition-all duration-300 ease-in-out transform ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
               }`}
            >
               <span className="flex items-center justify-center gap-1 p-4 w-[50%] mx-auto">
                  <CiBoxes size={24} />
                  <Link
                     type="button"
                     className="rounded text-white font-bold"
                     href={"/fornecedores"}
                  >
                     Fornecedores
                  </Link>
               </span>
               <hr></hr>
               <span className="flex items-center justify-center gap-1 p-4 w-[50%] mx-auto">
                  <MdAttachMoney size={24} />
                  <button
                     type="button"
                     className="rounded text-white font-bold"
                     onClick={handleLogout}
                  >
                     Clientes
                  </button>
               </span>
               <hr></hr>
               <span className="flex items-center justify-center gap-1 p-4 w-[50%] mx-auto">
                  <FaRegNoteSticky size={24} />
                  <button
                     type="button"
                     className="rounded text-white font-bold"
                  >
                     Notas
                  </button>
               </span>
               <hr></hr>
               <span className="flex items-center justify-center gap-1 p-4 w-[50%] mx-auto">
                  <IoIosLogOut size={24} />
                  <button
                     type="button"
                     className="rounded text-white font-bold"
                     onClick={handleLogout}
                  >
                     Sair
                  </button>
               </span>
            </div>
         </nav>
      )
   );
}
