

export interface IApplyForm {
    firstName: string;
    lastName: string;
    phoneNumber: number;
    city: string;
    country : string
    email: string;

  }
  
export type TFields =
| "firstName"
| "lastName"
| "phoneNumber"
| "city"
| "country"
| "email"
