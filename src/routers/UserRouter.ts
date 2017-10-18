import { Router, Request, Response, NextFunction } from 'express';
import { sign } from 'jsonwebtoken';
import User from '../models/User';

class UserRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public SignUp(req: Request, res: Response): void {

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

    public LogIn(req: Request, res: Response): void {

        const email = req.body.email;
        const password = req.body.password;

        User.findOne({ email })
            .then((user) => {
                const status = res.statusCode;
                user.schema.methods.comparePassword(password, function (err, isMatch) {
                    if (err) {
                        res.json({ err })
                    }
                    let token = sign(user, 'UniqueGDGKEY', { expiresIn: 3600 })
                    res.json({
                        status,
                        token: token
                    })
                })
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
        this.router.post('/login', this.LogIn)
    }
}

const userRoutes = new UserRouter();
userRoutes.routes();

export default userRoutes.router;