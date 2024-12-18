interface ClientInterface {
   clients?: Array<{
      id: string;
      name: string;
      description: string | null;
      color: string;
      document: string;
      phone: string;
      Project: Array<{
         id: string;
         name: string;
         description: string;
      }>;
   }>;
}
