import * as yup from "yup";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;


export const mainFormSchema = yup.object({
  firstName: yup
    .string()
    .required("Name is required")
    .min(3, "Please enter more then 3 characters")
    .max(100, "Character limit reached, maximum allowed characters is 100."),
  lastName: yup
    .string()
    .required("Last Name is required")
    .min(3, "Please enter more then 3 characters")
    .max(100, "Character limit reached, maximum allowed characters is 100."),
 
  phoneNumber: yup
    .string()
    .required("Phone Number is required")
    .min(10, "Please enter more then 10 characters")
    .max(10, "Character limit reached, maximum allowed characters is 11."),
  city: yup
    .string()
    .required("City is required")
    .min(2, "Please select your City")
    .max(45, "Character limit reached, maximum allowed characters is 45."),
  country: yup
    .string()
    .required("Country is required")
    .min(2, "Please select your country")
    .max(45, "Character limit reached, maximum allowed characters is 45."),
 
  email: yup
    .string()
    .email("Email is not valid")
    .required("Email is required")
    .max(55, "Character limit reached, maximum allowed characters is 55.")
    .matches(emailRegex, "Email is not valid"),
 
 
 
});



// export const regNoRequirementsSchema = yup.object({
//   regNo: yup
//     .string()
//     .required("Registration Number is required")
//     .matches(regNoRegex, "Registration Number is not valid"),
//   cnic: yup
//     .string()
//     .required("CNIC Number is required without -")
//     .min(13, "CNIC must be 13 characters.")
//     .max(13, "CNIC must be 13 characters."),
// });
