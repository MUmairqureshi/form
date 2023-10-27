import { type NextRequest, NextResponse } from "next/server";
import { db } from "../../components/lib/drizzle";
import { eq, or, and } from "drizzle-orm";
import { UsersTable , NewUser} from "../../components/lib/schema";
import { NextApiResponse } from "next";

import { formCities ,formCountries } from "../../components/lib/data";
import { IApplyForm } from "@/app/components/types";
 

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
console.log(phoneNumber.toString().length)

 if (phoneNumber.toString().length !== 10) {
    return NextResponse.json(
      {
        message: "Invalids phone number length!",
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


  const newForCountry = [...formCountries, "Pakistan"];
  if (!newForCountry.includes(country)) {
    return NextResponse.json(
      {
        message: "Invalid Country!",
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
  console.log("error" , error)
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

export async function GET(request: NextRequest) {
  try {


      const res = await db.select().from(UsersTable);
console.log(res)
      return NextResponse.json({ data: res })
  } catch (err) {
      console.log((err as { message: string }).message)
      return NextResponse.json({ message: "Somthing went wrong" })
  }
}






