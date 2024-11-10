import { PostNotionRepositoryes } from "../../../repositories/post/posts-notion-repositories";
import { PostFindAllController } from "./post-find-controller";
import { PostFindAllUseCase } from "./post-find-usecase";

const postNotionRepositoryes = new PostNotionRepositoryes();

const postFindAllUseCase = new PostFindAllUseCase(
    postNotionRepositoryes
);

const postFindAllController = new PostFindAllController(
    postFindAllUseCase

);

export { postFindAllUseCase, postFindAllController }