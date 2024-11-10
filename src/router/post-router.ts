import { Request, Response, Router } from "express";
import { postFindAllController } from "../useCases/posts/findById";
import { postCreateController } from "../useCases/posts/create";
import { postDeleteController } from "../useCases/posts/delete";

const PostsRouter = Router();

PostsRouter.route('/post').get((req: Request, res: Response) => postFindAllController.handle(req, res));
PostsRouter.route('/post').post((req: Request, res: Response) => postCreateController.handle(req, res));
PostsRouter.route('/post').delete((req: Request, res: Response) => postDeleteController.handle(req, res));



export default PostsRouter;
