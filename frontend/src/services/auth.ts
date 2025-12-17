import { api } from "./api";

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: {
    id: string;
    name: string;
    email: string;
  };
  token: string;
}

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
};
