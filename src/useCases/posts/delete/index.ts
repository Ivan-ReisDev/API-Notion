import { PostNotionRepositoryes } from "../../../repositories/post/posts-notion-repositories";
import { PostDeleteController } from "./post-delete-controller";
import { PostDeleteUseCase } from "./post-delete-usecase";

const postNotionRepositoryes = new PostNotionRepositoryes();

const postDeleteUseCase = new PostDeleteUseCase(
    postNotionRepositoryes
);

const postDeleteController = new PostDeleteController(
    postDeleteUseCase

);

export { postDeleteUseCase, postDeleteController }