import { Router, Request, Response, NextFunction } from 'express';
import User from '../models/User';

class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }
    
    public SignUp(req: Request, res: Response) :void {

        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

        const user = new User({
            name,
            email,
            password
        });

        user.save()
        .then((data) => {
            const status = res.statusCode;
            res.json({
                status,
                data
            });
        })
        .catch((error) => {
            const status = res.statusCode;
            res.json({
                status,
                error
            });            
        });
    }

    routes() {
        this.router.post('/', this.SignUp)
    }
}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;