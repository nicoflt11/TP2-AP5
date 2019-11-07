export default interface Order {
    id?: number;
    createdAt?: object;
    packages: Package[];
    contact: ContactY;
    carrier: Carrier;
  }

  interface Package {
    length: Length;
    width: Length;
    height: Length;
    weight: Length;
    products: Product[];
  }

  interface ContactY {
    firstname: string;
    lastname: string;
    phone: string;
    mail: string;
    billingAddress: BillingAddress;
    deliveryAddress: BillingAddress;
  }
  
  interface Carrier {
    name: string;
    contact: ContactX;
  }
  
  interface ContactX {
    firstname: string;
    lastname: string;
    phone: string;
    mail: string;
    headOfficeAddress: BillingAddress;
  }
  
  interface BillingAddress {
    postalCode: string;
    city: string;
    addressLine1: string;
    addressLine2: string;
  }
  
  interface Product {
    quantity: number;
    label: string;
    ean: string;
  }
  
  interface Length {
    unit: string;
    value: number;
  }