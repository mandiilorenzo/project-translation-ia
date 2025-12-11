import { Request, Response } from 'express';
import { AuthService } from '../services/authService'; 
import { RegisterInput, LoginInput, AuthRequest  } from '../types/auth'; 

export class AuthController {
  
  static async register(req: Request, res: Response) {
    try {
      const { email, password, name }: RegisterInput = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios'
        });
      }

      const result = await AuthService.register({ email, password, name });

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', 
        maxAge: 7 * 24 * 60 * 60 * 1000 
      });

      res.status(201).json(result);

    } catch (error: any) {
      console.error('Register controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { email, password }: LoginInput = req.body;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message: 'Email e senha são obrigatórios'
        });
      }

      const result = await AuthService.login({ email, password });

      if (!result.success) {
        return res.status(401).json(result);
      }

      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', 
        maxAge: 7 * 24 * 60 * 60 * 1000 
      });

      res.status(200).json(result);

    } catch (error: any) {
      console.error('Login controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async logout(req: Request, res: Response) {
    try {
      res.clearCookie('token');
      
      res.status(200).json({
        success: true,
        message: 'Logout realizado com sucesso'
      });

    } catch (error: any) {
      console.error('Logout controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async getProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id; 
      const result = await AuthService.getProfile(userId);

      if (!result.success) {
        return res.status(404).json(result);
      }

      res.status(200).json(result);

    } catch (error: any) {
      console.error('Get profile controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { name } = req.body;

      if (name && name.trim().length < 2) {
        return res.status(400).json({
          success: false,
          message: 'Nome deve ter pelo menos 2 caracteres'
        });
      }

      const result = await AuthService.updateProfile(userId, { name: name?.trim() });

      if (!result.success) {
        return res.status(400).json(result);
      }

      res.status(200).json(result);

    } catch (error: any) {
      console.error('Update profile controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }

  static async verify(req: AuthRequest, res: Response) {
    try {
      res.status(200).json({
        success: true,
        message: 'Autenticado',
        user: req.user
      });

    } catch (error: any) {
      console.error('Verify auth controller error:', error);
      res.status(500).json({
        success: false,
        message: 'Erro interno do servidor'
      });
    }
  }
}