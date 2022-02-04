import { FeedPostEntity } from 'src/feed/models/post.entity';
import { Role } from './role.enum';
export declare class UserEntity {
    id: number;
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: Role;
    feedPosts: FeedPostEntity[];
}
