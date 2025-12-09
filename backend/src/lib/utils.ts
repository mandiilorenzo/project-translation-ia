import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export class Password {
  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, 10);
  }

  static async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}

export class Token {
  static generate(userId: string): string {
    return jwt.sign(
      { userId },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );
  }

  static verify(token: string): any {
    return jwt.verify(token, process.env.JWT_SECRET!);
  }
}

export class Validation {
  static isEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  static isStrongPassword(password: string): boolean {
    // Mínimo 8 caracteres, 1 letra maiúscula, 1 minúscula, 1 número
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/;
    return passwordRegex.test(password);
  }
}

export class ApiResponse {
  static success(message: string, data?: any) {
    return {
      success: true,
      message,
      data
    };
  }

  static error(message: string, errors?: any) {
    return {
      success: false,
      message,
      errors
    };
  }
}