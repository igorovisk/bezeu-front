// app/layout.tsx
import { ReactNode } from "react";
import { AuthProvider } from "./contexts/AuthContext"; // Adjust the path if necessary
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const metadata = {
   title: "My App",
   description: "An app with toast notifications",
};

export default function RootLayout({ children }: { children: ReactNode }) {
   return (
      <html lang="en">
         <body>
            <AuthProvider>
               {children}
               <ToastContainer position="top-right" autoClose={3000} />
            </AuthProvider>
         </body>
      </html>
   );
}
