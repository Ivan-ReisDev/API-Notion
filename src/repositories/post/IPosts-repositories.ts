import { Post } from "../../entities/Post";

export interface IPostRepository {
    find(id: string): Promise<Post | null>;
    create(postData: Post): Promise<Post | null>;
    deleteById(id: string): Promise<boolean>;
    updateById(id: string, postData: Post): Promise<Post | null>;
}