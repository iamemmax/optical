// "use client";
// import { useUser } from "@/app/(auth)/(onboarding)/api/getUserDetails";
// import CameraIcon from "@/app/icons/(dashboard)/CameraIcon";
// import CopyIcon from "@/app/icons/(dashboard)/CopyIcon";
// import DeleteIcon from "@/app/icons/(dashboard)/DeleteIcon";
// import UploadIcon from "@/app/icons/(dashboard)/UploadIcon";
// // import UploadIcon from "@/app/icons/(dashboard)/UploadIcon";
// import { Button, ErrorModal } from "@/components/core";
// import useClipboard from "@/hooks/useClipboard copy";
// import { SmallSpinner } from "@/icons/core";
// import { cn } from "@/utils/classNames";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Label } from "@radix-ui/react-label";
// import Image from "next/image";
// import React, { useRef, useState } from "react";
// import { Controller, useForm } from "react-hook-form";
// import { z } from "zod";
// import { useUpdateProfile } from "../misc/api/profile/updateProfile";
// import { useErrorModalState } from "@/hooks";
// import { formatAxiosErrorMessage } from "@/utils";
// import { AxiosError } from "axios";
// import { useQueryClient } from "react-query";
// import toast from "react-hot-toast";
// // import { Photo, Upload, Delete, CopyIcon4 } from '@/components/icons' // Adjust the import path



// const formValues = z.object({
//   full_name: z.string().trim().min(1, { message: "Name is required" }),
//   phone_number: z
//     .string()
//     .min(11, { message: "Phone number should be at least 11 digits" })
//     .regex(
//       /^(080|070|090|081|091)\d{8}$/, // Matches numbers starting with 080, 070, 090, 081, or 091 followed by 8 more digits
//       {
//         message:
//           "Invalid phone number. It should start with 080, 070, 090, 081, or 091 and be 11 digits long.",
//       }
//     ),
//   email: z
//     .string()
//     .email({ message: "Invalid email format" })
//     .min(1, { message: "Email is required" }),

//   // bvn: z.string().trim().optional(),
//   bvn: z.string().trim().min(11, { message: "Bvn must be aleast 11 digits" }),
// });
// const ProfilePage = () => {
//   const {
//     isErrorModalOpen,
//     setErrorModalState,
//     openErrorModalWithMessage,
//     errorModalMessage,
//   } = useErrorModalState();
//   const userData = useUser()
//   const [profilePic, setProfilePic] = useState<string | null>(userData?.data?.profile_image ?? "");
//   const [isUploadingImage, setIsUploadingImage] = useState(false);
//   const [isDeleting, setIsDeleting] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const [profileImage, setProfileImage] = useState<File | null>();
//   // const [userData, setUserData] = useState<UserData | null>(null);

//   const {
//     control,
//     handleSubmit,
//     register,
//     formState: { errors },
//     setValue,
//   } = useForm<formValues>({
//     resolver: zodResolver(formValues),
//     defaultValues: {
//       bvn: userData?.data?.bvn_number || "",
//       email: userData?.data?.email || "",
//       full_name: userData?.data?.full_name || "",
//       phone_number: userData?.data?.phone_number || "",
//     },
//     mode: "onChange",
//   });

//   type formValues = z.infer<typeof formValues>;

//   const handleClick = () => {
//     fileInputRef.current?.click();
//   };

//   const handleProfilePicChange = (
//     event: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setProfilePic(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//     }
//     setProfileImage(file)
//   };

//   const handleFileUpload = async () => {
//     try {
//       setIsUploadingImage(true);

//     } catch (error) {
//       console.error("Error uploading file:", error);
//     } finally {
//       setIsUploadingImage(false);
//     }
//   };

//   const handleDelete = async (id: string) => {
//     try {
//       setIsDeleting(true);

//       setProfilePic(null);
//     } catch (error) {
//       console.error("Error deleting file:", error);
//     } finally {
//       setIsDeleting(false);
//     }
//   };
//   const queryClient = useQueryClient()
//   const { mutate: handleUpdate } = useUpdateProfile()
//   const onSubmit = (data: formValues) => {
//     handleUpdate({
//       full_name: data?.full_name,
//       phone_number: data?.phone_number,
//       profile_image: profileImage as File

//     }, {
//       onSuccess: () => {
//         toast.success("profile updated successfully")
//         queryClient.invalidateQueries({ queryKey: ["user-details"] })
//       },
//       onError: (error) => {
//         const errorMessage = formatAxiosErrorMessage(error as AxiosError);
//         openErrorModalWithMessage(String(errorMessage));
//       },
//     })
//   };
//   const { copy } = useClipboard();

//   return (
//     <div className="px-4">
//       <div className="border-b-[.0313rem] border-[#696969] border-opacity-50 pb-5">
//         <h1 className="md:text-2xl text-base font-verdana font-bold text-white">
//           Personal Information
//         </h1>
//         <p className="md:text-lg text-sm font-outfit text-white/70">
//           Update your logo and company details here.
//         </p>
//       </div>

//       <div className="max-w-[75rem]">
//         <section className="mt-8 flex max-sm:flex-col flex-row justify-between  items-center">
//           <div className="flex justify-between items-center gap-4">
//             <div className="flex justify-center max-md:mb-4">
//               <div className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden">
//                 <Image
//                   alt="profile"
//                   src={
//                     profilePic ?
//                       (profilePic?.startsWith("http://") ||
//                         profilePic?.startsWith("https://"))

//                       : "/images/userIcon.png"
//                   }
//                   className="rounded-full"
//                   layout="fill"
//                   objectFit="cover"
//                 />
//               </div>
//               <div className="mt-[2rem] md:mt-[2.8rem] cursor-pointer -ml-[1.5rem] z-50">
//                 <CameraIcon onClick={handleClick} />
//               </div>
//               <input
//                 type="file"
//                 ref={fileInputRef}
//                 accept="image/*"
//                 style={{ display: "none" }}
//                 onChange={handleProfilePicChange}
//               />
//             </div>
//             {(profilePic !== "" && profilePic !== null) && (
//               <>
//                 {!isDeleting && (
//                   <Button
//                     className="bg-transparent gap-1 border-[0.3px] border-[#032282] px-4 py-3"
//                     id="upload"
//                     onClick={handleFileUpload}
//                   >
//                     <UploadIcon />
//                     <p className="text-white font-medium">Upload</p>
//                     {(isUploadingImage || isLoading) && <SmallSpinner color="#032282" />}
//                   </Button>
//                 )}
//               </>
//             )}
//             {profilePic !== "" && profilePic !== null && (
//               <Button
//                 className="bg-transparent gap-1 px-4 py-3"
//                 onClick={() => handleDelete("")}
//               >
//                 <DeleteIcon stroke="white" />
//                 <p className="text-white font-medium">Remove</p>
//                 {(isUploadingImage || isDeleting) && (
//                   <SmallSpinner color="#032282" />
//                 )}
//               </Button>
//             )}
//           </div>

//           <div className="flex flex-col md:flex-row gap-4 justify-between  items-center lg:mt-0">
//             <div className="flex items-center flex-wrap gap-4 ">
//               <div
//                 className="flex items-center justify-center flex-col gap-x-2 border-[0.3px] border-white bg-[#090E29] px-4 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
//                 onClick={() =>
//                   copy(
//                     `https://opticraft/?get-started=true&referral_code=64dgdh`
//                   )
//                 }
//               >
//                 <p className="text-white text-[.5rem]">
//                   Your unique referral link
//                 </p>
//                 <div className="flex">
//                   <p className="text-white max-w-[6.25rem] text-xxs truncate">
//                     {`https://opticraft/?referral_code=${userData?.data?.referral_code}`}
//                   </p>
//                   <Button className="text-white px-0 py-[.0625rem] flex items-start bg-[#090E29] text-xs font-medium">
//                     <CopyIcon height={15} width={15} fillColor="#fff" />
//                   </Button>
//                 </div>
//               </div>
//               <div
//                 className="flex items-center justify-center flex-col gap-x-2 bg-[#090E29] border-[0.3px] border-white px-6 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
//                 onClick={() => copy(userData?.data?.referral_code ?? "")}
//               >
//                 <p className="text-white text-[.5rem]">Referral Code</p>
//                 <div className="flex">
//                   <p className="text-white max-w-[3.25rem] text-xxs truncate">
//                     {userData?.data?.referral_code ?? ""}
//                   </p>
//                   <Button className="text-white px-0 py-[.0625rem] flex items-start bg-transparent text-xs font-medium">
//                     <CopyIcon height={15} width={15} fillColor="#fff" />
//                   </Button>
//                 </div>
//               </div>
//               <div className="">
//                 <Button className="bg-white text-[#2B3AA6] font-outfit text-sm h-[46px]">
//                   Edit Profile
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>
//         <div className="mt-[2.625rem]">
//           <section>
//             <div className="mt-10">
//               <form onSubmit={handleSubmit(onSubmit)} encType="multipart/formdata">
//                 <div className="grid grid-rows-1 lg:grid-cols-2 gap-x-[4.5rem] items-start gap-y-6 font-sans text-sm">
//                   <div className="flex flex-col">
//                     <Label
//                       htmlFor="name"
//                       className="text-white text-sm font-outfit"
//                     >
//                       Full Name
//                     </Label>
//                     <input
//                       placeholder="Enter full name"
//                       type="text"
//                       id="name"
//                       className={`${cn(`${errors?.full_name ? "border-red-700" : "border-[#696969]"} py-3 bg-[#060B22]  text-white border-[0.5px] outline-none  h-[3.3125rem] border-opacity-55 rounded-lg px-4  mt-2`)} `}
//                       {...register("full_name")}
//                     />
//                     {errors?.full_name && (
//                       <p className="text-red-700 text-xs mt-1">
//                         {errors?.full_name?.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex flex-col">
//                     <Label
//                       htmlFor="email"
//                       className="text-white text-sm font-outfit"
//                     >
//                       Email
//                     </Label>
//                     <input
//                       placeholder="Enter email"
//                       type="text"
//                       id="email"
//                       className={`${cn(`${errors?.email ? "border-red-700" : "border-[#696969]"} py-3 bg-[#060B22] border-[0.5px] outline-none   text-white h-[3.3125rem] border-opacity-55 rounded-lg px-4  mt-2`)} `}
//                       {...register("email")}
//                     //   disabled
//                     />

//                     {errors?.email && (
//                       <p className="text-red-700 text-xs mt-1">
//                         {errors?.email?.message}
//                       </p>
//                     )}
//                   </div>
//                   <div className="flex flex-col">
//                     <Label
//                       htmlFor="Phone_number"
//                       className="mb-1 block  text-white text-sm font-outfit"
//                     >
//                       Phone number
//                     </Label>
//                     <Controller
//                       control={control}
//                       name={`phone_number`}
//                       render={({ field }) => (
//                         <input
//                           {...field}
//                           {...field}
//                           className={`${errors?.bvn
//                               ? "border border-red-700"
//                               : "border-[#696969]"
//                             }  text-xs outline-none  text-white  rounded-lg w-full  bg-[#060B22] border-[0.5px]  h-[3.3125rem] border-opacity-55  px-4`}
//                           id="account_no"
//                           placeholder="Enter Phone Number"
//                           type="text"
//                           maxLength={11}
//                           onChange={(e) => {
//                             const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
//                             // Handle input sanitization on change (typing)
//                             const validPhoneNumber = target.value.replace(
//                               /[^0-9]/g,
//                               ""
//                             );
//                             field.onChange(validPhoneNumber);
//                           }}
//                           onPaste={(e) => {
//                             e.target as HTMLInputElement;
//                             // Intercept paste event to sanitize pasted content
//                             const pastedValue = e.clipboardData.getData("text");
//                             // Remove non-numeric characters and limit to 11 digits
//                             const sanitizedValue = pastedValue
//                               .replace(/[^0-9]/g, "")
//                               .slice(0, 11); // Only allow first 11 digits
//                             e.preventDefault(); // Prevent the default paste behavior
//                             field.onChange(sanitizedValue); // Apply sanitized value
//                           }}
//                           onInput={(e) => {
//                             const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
//                             // Handle input sanitization on input changes
//                             const validPhoneNumber = target.value.replace(
//                               /[^0-9]/g,
//                               ""
//                             );
//                             field.onChange(validPhoneNumber);
//                           }}
//                         // onChange={(e) => field.onChange(e.target.value)}
//                         />
//                       )}
//                     />
//                     {errors?.phone_number && (
//                       <p className="text-red-700 text-xs mt-1">
//                         {errors?.phone_number?.message}
//                       </p>
//                     )}
//                   </div>

//                   <div className="w-full     text-sm font-normal">
//                     <Label
//                       className="mb-1 block  text-white text-sm font-outfit"
//                       htmlFor="bvn"
//                     >
//                       BVN
//                     </Label>
//                     <div className="relative mt-[.25rem]">
//                       <Controller
//                         control={control}
//                         name={`bvn`}
//                         render={({ field }) => (
//                           <input
//                             {...field}
//                             {...field}
//                             className={`${errors?.bvn
//                                 ? "border border-red-700"
//                                 : "border-[#696969]"
//                               }  text-xs outline-none   rounded-lg w-full  text-white bg-[#060B22] border-[0.5px]  h-[3.3125rem] border-opacity-55  px-4`}
//                             id="account_no"
//                             placeholder="Enter bvn"
//                             type="text"
//                             readOnly
//                             maxLength={11}
//                             onChange={(e) => {
//                               const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
//                               // Handle input sanitization on change (typing)
//                               const validPhoneNumber = target.value.replace(
//                                 /[^0-9]/g,
//                                 ""
//                               );
//                               field.onChange(validPhoneNumber);
//                             }}
//                             onPaste={(e) => {
//                               e.target as HTMLInputElement;
//                               // Intercept paste event to sanitize pasted content
//                               const pastedValue =
//                                 e.clipboardData.getData("text");
//                               // Remove non-numeric characters and limit to 11 digits
//                               const sanitizedValue = pastedValue
//                                 .replace(/[^0-9]/g, "")
//                                 .slice(0, 11); // Only allow first 11 digits
//                               e.preventDefault(); // Prevent the default paste behavior
//                               field.onChange(sanitizedValue); // Apply sanitized value
//                             }}
//                             onInput={(e) => {
//                               const target = e.target as HTMLInputElement; // Casting e.target to HTMLInputElement
//                               // Handle input sanitization on input changes
//                               const validPhoneNumber = target.value.replace(
//                                 /[^0-9]/g,
//                                 ""
//                               );
//                               field.onChange(validPhoneNumber);
//                             }}
//                           // onChange={(e) => field.onChange(e.target.value)}
//                           />
//                         )}
//                       />
//                       {errors?.bvn && (
//                         <p className="text-red-700 text-xs mt-1">
//                           {errors?.bvn?.message}
//                         </p>
//                       )}
//                     </div>
//                   </div>


//                 </div>
//                 <div className="mt-10  border-t-[0.5px] border-[#696969] flex items-center gap-6 border-opacity-60 pt-10">
//                   <Button
//                     type="button"
//                     className="bg-transparent py-3 px-8 text-xs  font-outfit text-nowrap rounded-10 border-[0.3px] border-white border-opacity-60"
//                   >
//                     Cancel
//                   </Button>
//                   <Button
//                     type="submit"
//                     className="bg-[#fff] py-3 px-7 text-xs font-outfit  text-nowrap rounded-10 border-[0.3px] text-[#032282]"
//                   >
//                     Save Changes
//                   </Button>
//                 </div>
//               </form>
//             </div>
//           </section>
//         </div>
//       </div>

//       <ErrorModal
//         isErrorModalOpen={isErrorModalOpen}
//         setErrorModalState={() => {
//           setErrorModalState(false);
//         }}
//         subheading={
//           errorModalMessage || "Please check your inputs and try again."
//         }
//       ></ErrorModal>
//     </div>
//   );
// };

// export default ProfilePage;










"use client";
import { useUser } from "@/app/(auth)/(onboarding)/api/getUserDetails";
import CameraIcon from "@/app/icons/(dashboard)/CameraIcon";
import CopyIcon from "@/app/icons/(dashboard)/CopyIcon";
import DeleteIcon from "@/app/icons/(dashboard)/DeleteIcon";
import UploadIcon from "@/app/icons/(dashboard)/UploadIcon";
import { Button, ErrorModal } from "@/components/core";
import useClipboard from "@/hooks/useClipboard copy";
import { SmallSpinner } from "@/icons/core";
import { cn } from "@/utils/classNames";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import Image from "next/image";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useUpdateProfile } from "../misc/api/profile/updateProfile";
import { useErrorModalState } from "@/hooks";
import { formatAxiosErrorMessage } from "@/utils";
import { AxiosError } from "axios";
import { useQueryClient } from "react-query";
import toast from "react-hot-toast";

// Define schema first
const formSchema = z.object({
  full_name: z.string().trim().min(1, { message: "Name is required" }),
  phone_number: z
    .string()
    .min(11, { message: "Phone number should be at least 11 digits" })
    .regex(
      /^(080|070|090|081|091)\d{8}$/, // Matches numbers starting with 080, 070, 090, 081, or 091 followed by 8 more digits
      {
        message:
          "Invalid phone number. It should start with 080, 070, 090, 081, or 091 and be 11 digits long.",
      }
    ),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(1, { message: "Email is required" }),
  bvn: z.string().trim().min(11, { message: "BVN must be at least 11 digits" }),
});

// Derive type from schema
type FormValues = z.infer<typeof formSchema>;

const ProfilePage = () => {
  const {
    isErrorModalOpen,
    setErrorModalState,
    openErrorModalWithMessage,
    errorModalMessage,
  } = useErrorModalState();
  
  const userData = useUser();
  const [profilePic, setProfilePic] = useState<string | null>(userData?.data?.profile_image ?? "");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<File | null>(null);

  const {
    control,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bvn: userData?.data?.bvn_number || "",
      email: userData?.data?.email || "",
      full_name: userData?.data?.full_name || "",
      phone_number: userData?.data?.phone_number || "",
    },
    mode: "onChange",
  });

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleProfilePicChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
      setProfileImage(file);
    }
  };

  const handleFileUpload = async () => {
    try {
      setIsUploadingImage(true);
      // Add your upload logic here
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setProfilePic(null);
      setProfileImage(null);
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const queryClient = useQueryClient();
  const { mutate: handleUpdate } = useUpdateProfile();
  
  const onSubmit = (data: FormValues) => {
    handleUpdate({
      full_name: data.full_name,
      phone_number: data.phone_number,
      profile_image: profileImage || undefined, // Only send if available
    }, {
      onSuccess: () => {
        toast.success("Profile updated successfully");
        queryClient.invalidateQueries({ queryKey: ["user-details"] });
      },
      onError: (error) => {
        const errorMessage = formatAxiosErrorMessage(error as AxiosError);
        openErrorModalWithMessage(String(errorMessage));
      },
    });
  };

  const { copy } = useClipboard();

  return (
    <div className="px-4">
      <div className="border-b-[.0313rem] border-[#696969] border-opacity-50 pb-5">
        <h1 className="md:text-2xl text-base font-verdana font-bold text-white">
          Personal Information
        </h1>
        <p className="md:text-lg text-sm font-outfit text-white/70">
          Update your logo and company details here.
        </p>
      </div>

      <div className="max-w-[75rem]">
        <section className="mt-8 flex max-sm:flex-col flex-row justify-between items-center">
          <div className="flex justify-between items-center gap-4">
            <div className="flex justify-center max-md:mb-4">
              <div className="relative w-[70px] h-[70px] md:w-[80px] md:h-[80px] rounded-full overflow-hidden">
                <Image
                  alt="profile"
                  src={
                    profilePic && (profilePic.startsWith("http://") || profilePic.startsWith("https://"))
                      ? profilePic
                      : profilePic || "/images/userIcon.png"
                  }
                  className="rounded-full"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="mt-[2rem] md:mt-[2.8rem] cursor-pointer -ml-[1.5rem] z-50">
                <CameraIcon onClick={handleClick} />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleProfilePicChange}
              />
            </div>
            
            {profilePic && (
              <>
                
                <Button
                  className="bg-transparent gap-1 px-4 py-3"
                  onClick={handleDelete}
                  disabled={isUploadingImage || isDeleting}
                >
                  <DeleteIcon stroke="white" />
                  <p className="text-white font-medium">Remove</p>
                  {(isUploadingImage || isDeleting) && (
                    <SmallSpinner color="#032282" />
                  )}
                </Button>
              </>
            )}
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-between items-center lg:mt-0">
            <div className="flex items-center flex-wrap gap-4">
              <div
                className="flex items-center justify-center flex-col gap-x-2 border-[0.3px] border-white bg-[#090E29] px-4 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
                onClick={() =>
                  copy(
                    `https://opticraft/?get-started=true&referral_code=${userData?.data?.referral_code}`
                  )
                }
              >
                <p className="text-white text-[.5rem]">
                  Your unique referral link
                </p>
                <div className="flex">
                  <p className="text-white max-w-[6.25rem] text-xxs truncate">
                    {`https://opticraft/?referral_code=${userData?.data?.referral_code}`}
                  </p>
                  <Button className="text-white px-0 py-[.0625rem] flex items-start bg-[#090E29] text-xs font-medium">
                    <CopyIcon height={15} width={15} fillColor="#fff" />
                  </Button>
                </div>
              </div>
              <div
                className="flex items-center justify-center flex-col gap-x-2 bg-[#090E29] border-[0.3px] border-white px-6 rounded-lg cursor-pointer border-opacity-30 py-[.5625rem]"
                onClick={() => copy(userData?.data?.referral_code ?? "")}
              >
                <p className="text-white text-[.5rem]">Referral Code</p>
                <div className="flex">
                  <p className="text-white max-w-[3.25rem] text-xxs truncate">
                    {userData?.data?.referral_code ?? ""}
                  </p>
                  <Button className="text-white px-0 py-[.0625rem] flex items-start bg-transparent text-xs font-medium">
                    <CopyIcon height={15} width={15} fillColor="#fff" />
                  </Button>
                </div>
              </div>
              <div className="">
                <Button className="bg-white text-[#2B3AA6] font-outfit text-sm h-[46px]">
                  Edit Profile
                </Button>
              </div>
            </div>
          </div>
        </section>

        <div className="mt-[2.625rem]">
          <section>
            <div className="mt-10">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-rows-1 lg:grid-cols-2 gap-x-[4.5rem] items-start gap-y-6 font-sans text-sm">
                  <div className="flex flex-col">
                    <Label
                      htmlFor="name"
                      className="text-white text-sm font-outfit"
                    >
                      Full Name
                    </Label>
                    <input
                      placeholder="Enter full name"
                      type="text"
                      id="name"
                      className={cn(
                        "py-3 bg-[#060B22] text-white border-[0.5px] outline-none h-[3.3125rem] border-opacity-55 rounded-lg px-4 mt-2",
                        errors?.full_name ? "border-red-700" : "border-[#696969]"
                      )}
                      {...register("full_name")}
                    />
                    {errors?.full_name && (
                      <p className="text-red-700 text-xs mt-1">
                        {errors.full_name.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <Label
                      htmlFor="email"
                      className="text-white text-sm font-outfit"
                    >
                      Email
                    </Label>
                    <input
                      placeholder="Enter email"
                      type="text"
                      id="email"
                      className={cn(
                        "py-3 bg-[#060B22] border-[0.5px] outline-none text-white h-[3.3125rem] border-opacity-55 rounded-lg px-4 mt-2",
                        errors?.email ? "border-red-700" : "border-[#696969]"
                      )}
                      {...register("email")}
                      disabled
                    />
                    {errors?.email && (
                      <p className="text-red-700 text-xs mt-1">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col">
                    <Label
                      htmlFor="phone_number"
                      className="mb-1 block text-white text-sm font-outfit"
                    >
                      Phone number
                    </Label>
                    <Controller
                      control={control}
                      name="phone_number"
                      render={({ field }) => (
                        <input
                          {...field}
                          className={cn(
                            "text-xs outline-none text-white rounded-lg w-full bg-[#060B22] border-[0.5px] h-[3.3125rem] border-opacity-55 px-4",
                            errors?.phone_number ? "border-red-700" : "border-[#696969]"
                          )}
                          id="phone_number"
                          placeholder="Enter Phone Number"
                          type="text"
                          maxLength={11}
                          onChange={(e) => {
                            const target = e.target as HTMLInputElement;
                            const validPhoneNumber = target.value.replace(/[^0-9]/g, "");
                            field.onChange(validPhoneNumber);
                          }}
                          onPaste={(e) => {
                            const pastedValue = e.clipboardData.getData("text");
                            const sanitizedValue = pastedValue
                              .replace(/[^0-9]/g, "")
                              .slice(0, 11);
                            e.preventDefault();
                            field.onChange(sanitizedValue);
                          }}
                          onInput={(e) => {
                            const target = e.target as HTMLInputElement;
                            const validPhoneNumber = target.value.replace(/[^0-9]/g, "");
                            field.onChange(validPhoneNumber);
                          }}
                        />
                      )}
                    />
                    {errors?.phone_number && (
                      <p className="text-red-700 text-xs mt-1">
                        {errors.phone_number.message}
                      </p>
                    )}
                  </div>

                  <div className="w-full text-sm font-normal">
                    <Label
                      className="mb-1 block text-white text-sm font-outfit"
                      htmlFor="bvn"
                    >
                      BVN
                    </Label>
                    <div className="relative mt-[.25rem]">
                      <Controller
                        control={control}
                        name="bvn"
                        render={({ field }) => (
                          <input
                            {...field}
                            className={cn(
                              "text-xs outline-none rounded-lg w-full text-white bg-[#060B22] border-[0.5px] h-[3.3125rem] border-opacity-55 px-4",
                              errors?.bvn ? "border-red-700" : "border-[#696969]"
                            )}
                            id="bvn"
                            placeholder="Enter BVN"
                            type="text"
                            readOnly
                            maxLength={11}
                          />
                        )}
                      />
                      {errors?.bvn && (
                        <p className="text-red-700 text-xs mt-1">
                          {errors.bvn.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-10 border-t-[0.5px] border-[#696969] flex items-center gap-6 border-opacity-60 pt-10">
                  <Button
                    type="button"
                    className="bg-transparent py-3 px-8 text-xs font-outfit text-nowrap rounded-10 border-[0.3px] border-white border-opacity-60"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="bg-[#fff] py-3 px-7 text-xs font-outfit text-nowrap rounded-10 border-[0.3px] text-[#032282]"
                    disabled={isLoading}
                  >
                    Save Changes
                    {isLoading && <SmallSpinner color="#032282" />}
                  </Button>
                </div>
              </form>
            </div>
          </section>
        </div>
      </div>

      <ErrorModal
        isErrorModalOpen={isErrorModalOpen}
        setErrorModalState={() => {
          setErrorModalState(false);
        }}
        subheading={
          errorModalMessage || "Please check your inputs and try again."
        }
      />
    </div>
  );
};

export default ProfilePage;