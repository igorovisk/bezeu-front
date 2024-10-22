// app/layout.tsx
import { Roboto } from "@next/font/google";
import { ReactNode } from "react";
import { AuthProvider } from "./contexts/AuthContext"; // Adjust the path if necessary
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/navbar/Navbar";

export const metadata = {
   title: "Bezeu Eventos",
   description: "Gerenciamento de fornecedores/clientes",
};

const roboto = Roboto({
   weight: ["400", "700"],
   subsets: ["latin"], // Subconjuntos da fonte
});

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body>
            <AuthProvider>
               <section
                  className={`flex flex-col w-full h-screen ${roboto.className}`}
               >
                  <Navbar />
                  {children}
                  <ToastContainer position="top-right" autoClose={3000} />
               </section>
            </AuthProvider>
         </body>
      </html>
   );
}
