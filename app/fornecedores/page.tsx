"use client";

import { toast } from "react-toastify"; // Para mensagens de erro
import Navbar from "../components/navbar/Navbar";
import { useAuth } from "../contexts/AuthContext";
import { ChangeEvent, useState } from "react";
import api from "../services/axios";

export default function Home() {
   const { isLoggedIn, logout, userData } = useAuth(); // Desestrutura o estado e função do contexto
   const [name, setName] = useState<String>("");
   const [document, setDocument] = useState<String>("");
   const [phone, setPhone] = useState<String>("");
   const [description, setDescription] = useState<String>("");

   return <div>Lista de fornecedores</div>;
}
