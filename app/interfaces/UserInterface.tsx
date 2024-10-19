export default interface UserData {
   id: string;
   email: string;
   username: string;
   clients: Array<{
      id: string;
      name: string;
      description: string | null;
      color: string;
      Project: Array<{
         id: string;
         name: string;
         description: string;
      }>;
   }>;
   profileImage: string | null;
   role: string;
   createdAt: string;
}
