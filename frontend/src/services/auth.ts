import { api } from "./api";
import { AuthResponse, LoginInput, RegisterInput, UpdateProfileResponse } from "../types/auth";

export const AuthService = {
  login: async (data: LoginInput) => {
    const response = await api.post<AuthResponse>("/api/auth/login", data);
    return response.data;
  },

  register: async (data: RegisterInput) => {
    const response = await api.post<AuthResponse>("/api/auth/register", data);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("medtranslate_token");
    localStorage.removeItem("medtranslate_user");
    window.location.href = "/Login";
  },

  updateProfile: async (name: string) => {
    const response = await api.put<UpdateProfileResponse>("/auth/profile", {
      name,
    });
    return response.data;
  },
};
