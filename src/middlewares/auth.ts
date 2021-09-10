import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface TokenPayload {
  id: string;
  role: string;
  iat: number;
  exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) : Response | void {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Not authenticated.' });

  const token = authorization.replace('Bearer', '').trim();
  try {
    const data = jwt.verify(token, 'secret');

    const { id, role } = data as TokenPayload;

    req.userId = id;
    req.userRole = role;

    return next();
  } catch {
    return res.status(401).json({ message: 'Not authenticated.' });
  }
}