import { Request, Response,  NextFunction } from "express";
type RequestHandler = (req: Request, res: Response, next: NextFunction) => any;
const asyncHandler = (requestHandler: RequestHandler)  => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
    }
}
export { asyncHandler };