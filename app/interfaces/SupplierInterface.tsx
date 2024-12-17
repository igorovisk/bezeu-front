interface SupplierInterface {
   id: string;
   name: string;
   email?: string;
   document?: string;
   description: string | null;
   color?: string;
   phone?: string;
   Products?: Array<any>;
}
