import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const register = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      
      // Check if profilePicture is a File object
      if (data.profilePicture && data.profilePicture instanceof File) {
        formData.append("profilePicture", data.profilePicture);
      } else {
        throw new Error("Profile picture is required");
      }

      const response = await api.post("/api/users/register", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Redirect to login page
      router.push("/login");

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    register,
    isLoading,
    error,
    setError,
  };
};
