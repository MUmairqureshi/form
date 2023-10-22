import {  NextRequest, NextResponse } from "next/server";
import { db } from "../../components/lib/drizzle";
import { eq, or, and } from "drizzle-orm";
import { UsersTable , NewUser} from "../../components/lib/schema";
import { NextApiResponse } from "next";

import { formCities ,formCountries } from "../../components/lib/data";
import { IApplyForm } from "@/app/components/types";
// import { DevBundlerService } from "next/dist/server/lib/dev-bundler-service";
// import { createConnection } from "../nodeMailer";
// // import { sendConfirmationEmail } from "@/lib/confirmationTemplates";
// import { otpCodes } from "@/lib/schema/otpCodes";
// import { sendConfirmationEmail } from "@/lib/confirmationTemplates";

export async function POST(request: NextRequest, res: NextApiResponse){

  const {
    firstName,
    lastName,
    phoneNumber,
    country,
    city,
    email,

  } : IApplyForm = await request.json();
  if (firstName.length < 3 || firstName.length > 1000) {
    return NextResponse.json(
      {
        message: "Invalid first name length!",
      },
      {
        status: 500,
      }
    );
  }
 if (lastName.length < 3 || lastName.length > 1000) {
    return NextResponse.json(
      {
        message: "Invalid first name length!",
      },
      {
        status: 500,
      }
    );
  }


 if (phoneNumber.toString().length !== 12) {
    return NextResponse.json(
      {
        message: "Invalid phone number length!",
      },
      {
        status: 500,
      }
    );
  }

  if (email.length > 1000) {
    return NextResponse.json(
      {
        message: "Invalid Email length!",
      },
      {
        status: 500,
      }
    );
  }




 const newForCities = [...formCities, "karachi"];
  if (!newForCities.includes(city)) {
    return NextResponse.json(
      {
        message: "Invalid City!",
      },
      {
        status: 500,
      }
    );
  }


  const newForCountry = [...formCountries, "pakistan"];
  if (!newForCities.includes(country)) {
    return NextResponse.json(
      {
        message: "Invalid City!",
      },
      {
        status: 500,
      }
    );
  }



 if (
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !city ||
    !country
  ) {
    return NextResponse.json(
      { message: "Fields are empty!" },
      {
        status: 404,
      }
    );
  }



  const appliedUser : NewUser   = {
    firstName,
    lastName,
    phoneNumber,
    city,
    country,
    email,

  };



  try{
    // const olduser = await db
    // .select()
    // .form(UsersTable)
    // .where(
    //   or(
    //     eq(UsersTable.email , email),
    //     eq(UsersTable.phoneNumber , phoneNumber)
    //   )
    // )
    const oldUsers = await db
    .select()
    .from(UsersTable)
    .where(
      or(
        eq(UsersTable.email, email),
        eq(UsersTable.phoneNumber, phoneNumber)
      )
    );
    if(!oldUsers){
      
      throw new Error("Internal Server Error");
    }
    const oldUser  = oldUsers[0];
    if(!!oldUser &&  oldUser.email == email){
      throw new Error("An application with this email already exists.");

  }
  else if (!!oldUser && oldUser.phoneNumber == phoneNumber) {
    throw new Error("An application with this Phone number already exists.");
  }
  const users = await db.insert(UsersTable).values(appliedUser).returning();
  const user = users[0];



  return NextResponse.json({
    message: "Applied Successfirsty",
    users,
  });



} catch (error : any) {
  return NextResponse.json(
    {
      message: error.message,
    },
    {
      status: 500,
    }
  );
}
}


 

   

   
 
 


  // const appliedUser = {
  //   firstName,
  //   lastName,
  //   phoneNumber,
  //   city,
  //   email,
  //  highestQualification,
  // };

  // try {
  //   const oldUsers = await db
  //     .select()
  //     .from(UsersTable)
  //     .where(
  //       or(
  //         eq(UsersTable.email, email),
  //         eq(UsersTable.phoneNumber, phoneNumber)
  //       )
  //     );
  //   if (!oldUsers) {
  //     throw new Error("Internal Server Error");
  //   }
  //   const oldUser = oldUsers[0];
  //   if (!!oldUser && oldUser.email == email) {
  //     throw new Error("An application with this email already exists.");
  //   }  else if (!!oldUser && oldUser.phoneNumber == phoneNumber) {
  //     throw new Error("An application with this Phone number already exists.");
  //   }

  // } catch (error) {
  //   return NextResponse.json(
  //     {
  //       message: error.message,
  //     },
  //     {
  //       status: 500,
  //     }
  //   );
  // }
