"use client"; 
import Input from './Input'
import Loader from './Loder'
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
// import { IApplyForm } from "./types/index";
import { yupResolver } from "@hookform/resolvers/yup";
import { mainFormSchema } from "./yupValidation";
import { formCities, formQualifications } from "./formData.jsx";
import { useToast } from "@chakra-ui/react";
import { Poppins } from "next/font/google";
 

const poppins = Poppins({
  weight: ["300", "400", "500", "800", "900"],
  subsets: ["latin"],
});

export default function FORM() {
  const toast = useToast();

  const [loading, setLoading] = useState(false);
  const [isApplied, setIsApplied] = useState(false);
  const [formValues, setFormValues] = useState();
  const [occupiedErr, setOccupiedErr] = useState({
    phoneNumber: "",
 
  });
  const [showSocialInvitation, setShowSocialInvitation] = useState(null);

  useEffect(() => {
    const facebook = localStorage.getItem("facebook");
    const youtube = localStorage.getItem("youtube");
    const twitter = localStorage.getItem("twitter");
    const instagram = localStorage.getItem("instagram");

    if (!(facebook && youtube && twitter && instagram)) {
      setShowSocialInvitation(true);
    } else setShowSocialInvitation(false);
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(mainFormSchema),
  });

  const onFormSubmit = async (data) => {
    try {
      setLoading(true);
      const formData = {
        firstName: data.firstName.toLowerCase(),
        lastName: data.lastName.toLowerCase(),
        phoneNumber: Number(`92${data.phoneNumber}`),

        // email: data.email.toLowerCase(),
      };

      const res = await fetch("/api/applyform", {
        body: JSON.stringify(formData),
        method: "POST",
      });

      const resData = await res.json();
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
      localStorage.removeItem("facebook");
      localStorage.removeItem("youtube");
      localStorage.removeItem("twitter");
      localStorage.removeItem("instagram");

      setIsApplied(true);
    } catch (err) {
      toast.closeAll();
      toast({
        title: `${err.message || "Unknown Error"}`,
        status: "error",
        duration: 5000,
        isClosable: true,
      });

   
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="mb-20 flex flex-col items-center justify-center">
     

      {showSocialInvitation === null && (
        <div className="justify-centers flex h-[85vh] items-center">
          <Loader width="w-32" height="h-32" />
        </div>
      )}



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
            placeholder="First Name"
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

         

          <div className="flex w-full justify-center">
            <button
              type="submit"
              style={poppins.style}
              disabled={loading}
              className="text mt-5 w-52  bg-main py-4 text-center text-base font-semibold tracking-widest text-white transition-all hover:translate-y-1 disabled:opacity-60 disabled:hover:cursor-not-allowed sm:w-full  bg-blue-950 sm:py-3 sm:text-sm"
            >
              {loading ? <Loader width="w-4" height="h-4" /> : "SUBMIT"}
            </button>
          </div>
        </form>

    </main>
  );
}