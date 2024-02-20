import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { User } from 'interfaces/user';
import { CustomRequest } from 'interfaces/query';

export default class UserController {
  private users: User[] = [];

  async registration(req: CustomRequest<User>, res: Response): Promise<Response> {
    const { login, password } = req.body;

    if (this.users.find(user => user?.login === login)) {
      return res.status(400).send({ message: 'User already exist' });
    }

    const hashPassword = await bcrypt.hash(password, 3);
    this.users.push({login, password: hashPassword});
    return res.status(200).send({ message: 'Succesfully register' });
  }

  login(req: CustomRequest<User>, res: Response): Response {
    const { login, password } = req.body;
    const user = this.users.find(user => user.login === login);

    if (!user) {
      return res.status(400).send({ message: 'User not found'});
    }

    const isPassEquals = bcrypt.compareSync(password, user?.password);

    if (!isPassEquals) {
      return res.status(400).send({ message: 'Password not right'});
    }

    return res.status(200).send({ message: 'Success login'});
  }

  getUsers(req: Request, res: Response): Response {
    if (!this.users.length) {
      return res.status(400).send({ message: 'No register users'});
    }
    return res.status(200).send(this.users);
  }
}
