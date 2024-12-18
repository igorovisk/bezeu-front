export default interface UserData {
   id: string;
   email: string;
   username: string;
   clients?: Array<ClientInterface>;
   // clients?: Array<{
   //    id: string;
   //    name: string;
   //    description: string | null;
   //    color: string;
   //    document: string;
   //    phone: string;
   //    Project: Array<{
   //       id: string;
   //       name: string;
   //       description: string;
   //    }>;
   // }>;
   suppliers?: Array<SupplierInterface>;
   // suppliers?: Array<{
   //    id: string;
   //    name: string;
   //    description: string | null;
   //    color: string;
   //    document: string;
   //    phone: string;
   //    Products?: Array<any>;
   // }>;
   profileImage: string | null;
   role: string;
   createdAt: string;
}
