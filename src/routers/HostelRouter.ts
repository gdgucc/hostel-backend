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
        const slug = req.params.slug;

        Hostel.findOne({slug})
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

    public CreateHostel(req: Request, res: Response): void {

        const name: string = req.body.name;
        const slug: string = req.body.slug;
        const description: string = req.body.description;
        const room_type: string = req.body.room_type;
        const location: string = req.body.location ;
        
        const hostel = new Hostel({
            name,
            slug,
            description,
            room_type,
            location 
        });

        hostel.save()
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
        this.router.get('/', this.GetHostels);
        this.router.get('/:slug', this.GetHostel);
        this.router.post('/', this.CreateHostel);
    }
}

const hostelRoutes = new HostelRouter();
hostelRoutes.routes();

export default hostelRoutes.router;