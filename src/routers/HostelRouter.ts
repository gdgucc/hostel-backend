import { Router, Request, Response, NextFunction } from 'express';
import Hostel from '../models/Hostel';


class HostelRouter {

    router: Router;

    constructor() {
        this.router = Router();
        this.routes();
    }

    public GetHostels(req: Request, res: Response): void {

        Hostel.find({})
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

    public GetHostel(req: Request, res: Response): void {
        
    }

    public CreateHostel(req: Request, res: Response): void {

    }

    routes() {

    }
}