import { adminAxios } from "@/lib/axios";
import { useMutation } from "react-query";

interface updateProp {
  full_name: string;
  phone_number: string;
  profile_image?: string | File; // Made optional and allow File type
}

export const updateProfile = async ({full_name, phone_number, profile_image}: updateProp) => {
  const formData = new FormData();
  
  formData.append("full_name", full_name);
  formData.append("phone_number", phone_number);
  
  // Only append profile_image if it's available
  if (profile_image) {
    formData.append("profile_image", profile_image);
  }
  
  const { data } = await adminAxios.patch(
    `/api/main/user_details/`,
    formData // Send FormData directly, not wrapped in an object
  );
  
  return data;
};

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: updateProfile,
  });