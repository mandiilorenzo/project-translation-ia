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

export interface UpdateProfileResponse {
    success: boolean
    message: string
    user: {
        id: string
        name: string
        email: string
        role: string
        createdAt: string
        updatedAt: string
    }
}