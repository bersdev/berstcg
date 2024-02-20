import { Router } from 'express';
import UserController from 'controllers/user.controller';


export default class UserRotes {
  public router: Router = Router();
  private controller = new UserController();

  constructor() {
    this.registerRoutes();
  }

  registerRoutes(): void {
    this.router.post('/register', this.controller.registration.bind(this.controller));
    this.router.post('/login', this.controller.login.bind(this.controller));
    this.router.get('/users', this.controller.getUsers.bind(this.controller));
  }
}
