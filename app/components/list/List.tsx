"use client";
import { performLogout } from "@/hooks/useAuth";

export default function List() {
   //    async function handleLogout(e: React.MouseEvent) {
   //       e.preventDefault();
   //       await performLogout();
   //    }

   return (
      <ul className="flex flex-col text-black bg-slate-200 w-fit p-5">
         <h1 className="font-bold text-xl">Title</h1>
         children
      </ul>
   );
}
