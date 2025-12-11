import { PrismaClient } from "@prisma/client";
import { Password, Token, Validation } from "../lib/utils";
import { RegisterInput, LoginInput, AuthResponse } from "../types/auth";

const prisma = new PrismaClient();

export class AuthService {
  static async register(data: RegisterInput): Promise<AuthResponse> {
    try {
      if (!Validation.isEmail(data.email)) {
        return {
          success: false,
          message: "Email inválido",
        };
      }

      if (!Validation.isStrongPassword(data.password)) {
        return {
          success: false,
          message:
            "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula e um número",
        };
      }

      const existingUser = await prisma.user.findUnique({
        where: { email: data.email },
      });

      if (existingUser) {
        return {
          success: false,
          message: "Email já cadastrado",
        };
      }

      const hashedPassword = await Password.hash(data.password);

      const user = await prisma.user.create({
        data: {
          email: data.email,
          password: hashedPassword,
          name: data.name,
          role: "USER",
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      const token = Token.generate(user.id);

      return {
        success: true,
        message: "Usuário registrado com sucesso",
        user,
        token,
      };
    } catch (error: any) {
      console.error("Registration error:", error);
      return {
        success: false,
        message: "Erro ao registrar usuário",
      };
    }
  }

  static async login(data: LoginInput): Promise<AuthResponse> {
    try {
      if (!Validation.isEmail(data.email)) {
        return {
          success: false,
          message: "Email inválido",
        };
      }

      const user = await prisma.user.findUnique({
        where: { email: data.email },
        select: {
          id: true,
          email: true,
          password: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "Credenciais inválidas",
        };
      }

      const isValidPassword = await Password.compare(
        data.password,
        user.password
      );

      if (!isValidPassword) {
        return {
          success: false,
          message: "Credenciais inválidas",
        };
      }

      const { password, ...userWithoutPassword } = user;

      const token = Token.generate(user.id);

      return {
        success: true,
        message: "Login realizado com sucesso",
        user: userWithoutPassword,
        token,
      };
    } catch (error: any) {
      console.error("Login error:", error);
      return {
        success: false,
        message: "Erro ao realizar login",
      };
    }
  }

  static async getProfile(userId: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!user) {
        return {
          success: false,
          message: "Usuário não encontrado",
        };
      }

      return {
        success: true,
        message: "Perfil obtido com sucesso",
        user,
      };
    } catch (error: any) {
      console.error("Get profile error:", error);
      return {
        success: false,
        message: "Erro ao obter perfil",
      };
    }
  }

  static async updateProfile(userId: string, data: { name?: string }) {
    try {
      const user = await prisma.user.update({
        where: { id: userId },
        data: {
          name: data.name,
        },
        select: {
          id: true,
          email: true,
          name: true,
          role: true,
          createdAt: true,
          updatedAt: true,
        },
      });

      return {
        success: true,
        message: "Perfil atualizado com sucesso",
        user,
      };
    } catch (error: any) {
      console.error("Update profile error:", error);
      return {
        success: false,
        message: "Erro ao atualizar perfil",
      };
    }
  }
}
