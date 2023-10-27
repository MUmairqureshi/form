"use client";
import { useState } from "react";
import { useToast } from "@chakra-ui/react";
import type { UseFormWatch } from "react-hook-form";
// import { Loader, OtpTimer, Input } from "@/components";

export default function EmailAndOtpFields({
  register,
  errors,
  watch,
  occupiedErr,
  setOccupiedErr,
}: {
  register: any;
  errors: any;
  watch: UseFormWatch<any>;
  occupiedErr: { email: string };
  setOccupiedErr: any;
}) {
  const toast = useToast();

  const [loading, setLoading] = useState<boolean>(false);
  const [resendOtpAvailable, setResendOtpAvailable] = useState<boolean>(true);

  const email  = async () => {
    const email = watch("email");
    if (errors.email || !email) return;
    setLoading(true);

    
  };
  return (
    <div>
      <div className="my-6">
        <label htmlFor="email" className="mb-6 mt-4 text-slate-700 md:text-xl">
          Email *
        </label>

        <div className="mb-2 mt-1 flex">
          <input
            type="email"
            id="email"
            className={`block h-12 w-full border border-gray-400 bg-gray-100 p-3 ${
              errors?.email || occupiedErr?.email
                ? "border-red-400 ring-red-500"
                : "focus:border-sub focus:ring-sub"
            } rounded-l outline-none focus:ring-1 md:text-xl`}
            placeholder="Email"
            {...register("email")}
            onFocus={
              !!occupiedErr?.email
                ? () => {
                    setOccupiedErr({
                      email: "",
                      otp: "",
                    });
                  }
                : () => {}
            }
          />
          
        </div>

        {(errors?.email || occupiedErr?.email) && (
          <p className="mb-4 text-red-400">{`${
            errors?.email?.message || occupiedErr?.email
          }`}</p>
        )}
      </div>
 
    </div>
  );
}