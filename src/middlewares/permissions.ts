import { Request, Response, NextFunction } from 'express';

const permissionMiddleware = (roles: string[]) => (req: Request, res: Response, next: NextFunction) : Response | void => {
  try {
    const { userRole } = req;

    if (!userRole) return res.status(401).json({ message: 'Not authorized.' });

    if (!roles.includes(userRole)) return res.status(401).json({ message: 'Not authorized.' });

    return next();
  } catch {
    return res.status(401).json({ message: 'Not authorized.' });
  }
};

export default permissionMiddleware;