import { PostNotionRepositoryes } from "../../../repositories/post/posts-notion-repositories";
import { PostCreateController } from "./post-create-controller";
import { PostsCreateUseCase } from "./post-create-usecase";


const postNotionRepositoryes = new PostNotionRepositoryes();

const postsCreateUseCase = new PostsCreateUseCase(
    postNotionRepositoryes
);

const postCreateController = new PostCreateController(
    postsCreateUseCase

);

export { postsCreateUseCase, postCreateController }