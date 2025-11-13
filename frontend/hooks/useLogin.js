import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const login = async (data) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await api.post("/api/users/login", {
        email: data.email,
        password: data.password,
      });

      // Redirect based on user role
      if (response.data.user?.role === "admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/");
      }

      return { success: true, data: response.data };
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Login failed. Please try again.";
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
    setError,
  };
};
