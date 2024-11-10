import { Request, Response } from "express";
import { PostsCreateUseCase } from "./post-create-usecase";

export class PostCreateController {
    constructor(private postsCreateUseCase: PostsCreateUseCase) {}
    async handle(req: Request, res: Response): Promise<void> { 
        try {
            const { data } = req.body
    
            const posts = await this.postsCreateUseCase.execute(data);  

            if(posts && "error" in posts && "status" in posts) {
                res.status(posts.status).json({ error: posts.error }); 
                return;
            }

            res.status(200).json(posts);  
            return;
        } catch (error: any) {
            res.status(500).json({ error: "erro desconhecido" });  
        }
    }
}
