import { Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { FeedPost } from '../models/post.interface';
export declare class FeedService {
    private readonly feedPostRepository;
    constructor(feedPostRepository: Repository<FeedPost>);
    createPost(feedPost: FeedPost): Observable<FeedPost>;
    findPosts(take?: number, skip?: number): Observable<FeedPost[]>;
    findAllPost(): Observable<FeedPost[]>;
    updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult>;
    deletePost(id: number): Observable<DeleteResult>;
}
