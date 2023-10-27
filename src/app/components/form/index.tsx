"use client"; 
import EmailAndOtpFields from './email'
import Input  from './input'
import Loader from './Loder'
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IApplyForm } from "../types/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { mainFormSchema } from "./yupValidation";
import { formCities, formCountry } from "./formData";
import { useToast } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
 
const poppins = Poppins({
  weight: ["300", "400", "500", "800", "900"],
  subsets: ["latin"],
});

export default function Page() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState<boolean>(false);
  const [formValues, setFormValues] = useState<any>();
  const [occupiedErr, setOccupiedErr] = useState({
    phoneNumber: "",

    email: "",
  }); 

 
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IApplyForm>({
    mode: "onTouched",
    resolver: yupResolver(mainFormSchema),
  });

  const onFormSubmit = async (data: IApplyForm) => {
    console.log(data)
    try {
      setLoading(true);
      const formData = {
        firstName: data.firstName.toLowerCase(),
        lastName: data.lastName.toLowerCase(),
        phoneNumber: Number(`92${data.phoneNumber}`),
        city: data.city,
        country: data.country,
        email: data.email.toLowerCase(),

      };

      const res = await fetch("/api/applyform", {
       
        body: JSON.stringify(formData),
        method: "POST",
      });
      console.log(res)
      const resData: any = await res.json();
      if (!resData.users) throw new Error(resData.message);

      setFormValues({
        ...formData,
        ...(resData.users[0] && { users: resData.users[0] }),
      });

      toast({
        title: `${resData.message}`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // localStorage.removeItem("facebook");
      // localStorage.removeItem("youtube");
      // localStorage.removeItem("twitter");
      // localStorage.removeItem("instagram");

      setIsApplied(true);
    } catch (err: any) {
      toast.closeAll();
      toast({
        title: `${err.message || "Unknown Error"}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

      if (err.message == "An application with this email already exists.") {
        setOccupiedErr({ ...occupiedErr, email: err.message });
      }  else if (
        err.message == "An application with this Phone number already exists."
      ) {
        setOccupiedErr({ ...occupiedErr, phoneNumber: err.message });
      }  
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mb-20 flex flex-col items-center justify-center">
   

 

       


        <form
          className="w z-10 mx-4 my-10 w-full max-w-2xl rounded bg-opacity-30 px-4 py-8 text-black shadow-lg backdrop-blur-3xl md:mx-10 md:px-6"
          onSubmit={handleSubmit(onFormSubmit)}
          noValidate
        >
          <h1
            style={poppins.style}
            className="mb-8 text-center text-lg font-bold text-main md:text-3xl"
          >
            Registration Form{" "}
          </h1>
          
          <Input
            type="text"
            id="firstName"
            placeholder="Full Name"
            required={true}
            register={register}
            errors={errors}
          />
          <Input
            type="text"
            id="lastName"
            placeholder="Last Name"
            required={true}
            register={register}
            errors={errors}
          />
          <EmailAndOtpFields
            watch={watch}
            register={register}
            errors={errors}
            occupiedErr={occupiedErr}
            setOccupiedErr={setOccupiedErr}
          />
        
          <Input
            type="tel"
            id="phoneNumber"
            placeholder="Phone Number"
            required={true}
            register={register}
            errors={errors}
            occupiedErr={occupiedErr}
            setOccupiedErr={setOccupiedErr}
          />
          <label htmlFor="city" className="text-slate-700 md:text-xl">
            City *
          </label>
          <select
            {...register("city", { required: true })}
            id="city"
            className={`mb-2 mt-2 block w-full rounded border border-gray-400 bg-gray-100 p-3 md:text-lg ${
              errors?.city
                ? "border-red-400 ring-red-500"
                : "focus:border-sub focus:ring-sub"
            } outline-none focus:ring-1`}
            required
          >
            <option value="karachi">Karachi</option>
            {formCities.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.city && (
            <p className="mb-4 text-red-400">{errors.city?.message}</p>
          )}
        
          <label htmlFor="country" className="text-slate-700 md:text-xl">
            Country *
          </label>
          <select
            {...register("country", { required: true })}
            id="country"
            className={`mb-2 mt-2 block w-full rounded border border-gray-400 bg-gray-100 p-3 md:text-lg ${
              errors?.country
                ? "border-red-400 ring-red-500"
                : "focus:border-sub focus:ring-sub"
            } outline-none focus:ring-1`}
            required
          >
            <option value="karachi">Country</option>
            {formCountry.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="mb-4 text-red-400">{errors.country?.message}</p>
          )}

        
          <div className="flex w-full justify-center">
            <button
              type="submit"
              style={poppins.style}
              disabled={loading}
              className="text mt-5 w-52   bg-sky-950 py-4 text-center text-base font-semibold tracking-widest text-white transition-all hover:translate-y-1 disabled:opacity-60 disabled:hover:cursor-not-allowed sm:w-full sm:py-3 sm:text-sm"
            >
              {loading ? <Loader width="w-4" height="h-4" /> : "SUBMIT"}
            </button>
          </div>
        </form>
      
    </main>  );
}