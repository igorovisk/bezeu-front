import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
   console.log("Passou pelo middleware");
   // Obtenha o cookie de sessão
   const sessionCookie = request.cookies.get("token");

   // Verifique se o cookie de sessão existe e está configurado corretamente
   if (!sessionCookie) {
      // Redirecionar para a página de login se o cookie não estiver presente
      return NextResponse.redirect(new URL("/login", request.url));
   }

   // Realize verificações adicionais no cookie, se necessário
   // Por exemplo, decodificar e validar o token JWT, se usado

   // Continue para a próxima rota se o usuário estiver autenticado
   return NextResponse.next();
}

// Defina quais rotas o middleware deve proteger
export const config = {
   matcher: ["/", "/fornecedores", "/clientes"], // Exemplo de mais rotas
};
