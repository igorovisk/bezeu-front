interface SupplierInterface {
   id: string;
   name: string;
   description: string | null;
   color: string;
   phone: string;
   Products?: Array<any>;
}
