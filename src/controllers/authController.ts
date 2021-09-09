import { Request, Response } from 'express';
import { getRepository, Repository } from 'typeorm';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/User';

class AuthController {
  public async authenticate (req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const repository = getRepository(User);

      const user = await repository.findOne({ where: { email } });

      if(!user) return res.status(401).json({ message: 'Unauthorized' });

      const isValidPassword = await bcrypt.compare(password, user.password);

      if(!isValidPassword) return res.status(401).json({ message: 'Unauthorized' });

      const token = jwt.sign({ id: user.id }, 'secret', { expiresIn: '1d' });

      return res.status(200).json({
        user,
        token
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new AuthController();