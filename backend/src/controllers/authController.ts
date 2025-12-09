import { Request, Response } from 'express';
import { AuthService } from '../services/authService'; 
import { RegisterInput, LoginInput } from '../types/auth'; 
import { AuthRequest } from '../middleware/authMiddleware'; 

export class AuthController {
  // Registrar usuário
  static async register(req: Request, res: Response) {
    try {
      const { email, password, name }: RegisterInput = req.body;

      // Validação básica
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

      // Setar cookie com token
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // ✅ Mudado para 'lax' (funciona melhor em dev)
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
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

  // Login de usuário
  static async login(req: Request, res: Response) {
    try {
      const { email, password }: LoginInput = req.body;

      // Validação básica
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

      // Setar cookie com token
      res.cookie('token', result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax', // ✅ Mudado para 'lax'
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
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

  // Logout
  static async logout(req: Request, res: Response) {
    try {
      // Limpar cookie
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

  // Obter perfil do usuário atual
  static async getProfile(req: AuthRequest, res: Response) {
    try {
      // Agora req.user está disponível (middleware já validou)
      const userId = req.user!.id; // ✅ Usamos ! porque middleware já validou
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

  // Atualizar perfil
  static async updateProfile(req: AuthRequest, res: Response) {
    try {
      const userId = req.user!.id;
      const { name } = req.body;

      // Validação básica
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

  // Verificar autenticação (health check para auth)
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