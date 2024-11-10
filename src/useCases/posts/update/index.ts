import { PostNotionRepositoryes } from "../../../repositories/post/posts-notion-repositories";
import { PostUpdateController } from "./post-update-controlle";
import { PostUpdateUseCase } from "./post-update-usecase";
import { PostUpdateValidator } from "./validation/post-update-validator"; 

const postNotionRepositoryes = new PostNotionRepositoryes();
const postUpdateValidator = new PostUpdateValidator(); 

const postUpdateUseCase = new PostUpdateUseCase(
  postNotionRepositoryes,
  postUpdateValidator 
);

const postUpdateController = new PostUpdateController(
  postUpdateUseCase
);

export { postUpdateUseCase, postUpdateController }
