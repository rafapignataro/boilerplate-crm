import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import User from '../models/User';

class UserController {
  public async index(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;

      const repository = getRepository(User);

      if (id) {
        const user = await repository.findOne({ where: { id } });

        if (!user) throw new Error('There is no user with this id.');

        return res.status(200).json(user);
      }

      const data = await repository.find();

      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async create(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, role } = req.body;

      const repository = getRepository(User);

      const userExists = await repository.findOne({ where: { email } });

      if (userExists) {
        return res.status(409).json({ message: 'Email already taken!' });
      }

      const user = repository.create({ email, password, role });

      await repository.save(user);

      return res.json(user);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    return res.json({ message: `User ${id} updated!` });
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    return res.json({ message: `User ${id} deleted!` });
  }
}

export default new UserController();