"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/AuthContext"; // Adjust path if needed
import Link from "next/link";
import { CiBoxes } from "react-icons/ci";
import { IoIosLogOut } from "react-icons/io";
import { MdAttachMoney } from "react-icons/md";
import { FaNoteSticky, FaRegNoteSticky } from "react-icons/fa6";
import { usePathname } from "next/navigation";

export default function Navbar() {
   const { logout, isLoggedIn, userData } = useAuth(); // Get logout and auth state
   const [isOpen, setIsOpen] = useState(false);
   const [isActive, setIsActive] = useState<string>("");
   const handleLogout = async (e: React.MouseEvent) => {
      e.preventDefault();
      await logout();
   };
   const pathname = usePathname();
   console.log(pathname);

   function checkIfIsActive(href: string) {
      return pathname == href;
   }
   useEffect(() => {
      setIsActive(pathname);
   }, [pathname]);

   return (
      <nav className="bg-violet-900">
         <div className="flex justify-between items-center w-full p-5 font-bold">
            {/* Logo / Title */}
            <Link href={"/"}>
               <h1 className="text-white text-3xl">Bezeu Eventos</h1>
            </Link>

            {isLoggedIn && (
               <>
                  {/* Hamburger Icon (Mobile) */}
                  <button
                     className={`block lg:hidden p-2 text-white ${
                        isOpen && "bg-white rounded !text-black"
                     }`}
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
                  <div className="hidden lg:flex gap-6 items-center active:">
                     <span className="font-bold pr-10">
                        {`Bem vindo(a) ${userData?.username}`}
                     </span>

                     <Link
                        href="/fornecedores"
                        className={`flex items-center gap-1  ${
                           checkIfIsActive("/fornecedores") &&
                           "bg-white p-2 text-black rounded"
                        }`}
                     >
                        <CiBoxes size={24} />
                        Fornecedores
                     </Link>

                     <Link
                        href="/clientes"
                        className={`flex items-center gap-1  ${
                           checkIfIsActive("/clientes") &&
                           "bg-white p-2 text-black rounded"
                        }`}
                     >
                        <MdAttachMoney size={24} />
                        Clientes
                     </Link>

                     <button className="text-white flex items-center gap-1">
                        <FaNoteSticky size={24} />
                        Anotações
                     </button>

                     <button
                        className="text-white flex items-center gap-1"
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
               className={`flex flex-col  justify-center items-center lg:hidden bg-violet-800 transition-all duration-300 gap-4 ease-in-out ${
                  isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
               } pt-3`}
            >
               <Link
                  href="/fornecedores"
                  className={`flex text-white justify-center items-center p-4   gap-2  ${
                     checkIfIsActive("/fornecedores") &&
                     "bg-white p-2 !text-black rounded"
                  } `}
                  onClick={() => setIsOpen(false)}
               >
                  <CiBoxes size={24} /> Fornecedores
               </Link>

               <Link
                  href="/clientes"
                  className={`flex text-white justify-center items-center p-4   gap-2  ${
                     checkIfIsActive("/clientes") &&
                     "bg-white p-2 !text-black rounded"
                  } `}
                  onClick={() => setIsOpen(false)}
               >
                  <MdAttachMoney size={24} /> Clientes
               </Link>

               <button className="flex justify-center items-center p-4 text-white gap-2 ">
                  <FaNoteSticky size={24} />
                  Anotações
               </button>

               <button
                  className="flex justify-center items-center p-4 text-white gap-2 "
                  onClick={handleLogout}
               >
                  <IoIosLogOut size={24} /> Sair
               </button>
            </div>
         )}
      </nav>
   );
}
