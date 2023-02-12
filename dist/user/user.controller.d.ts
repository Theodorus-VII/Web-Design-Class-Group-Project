import { User } from '@prisma/client';
import { ModUserDto } from './dto';
import { UserService } from './user.service';
export declare class UserController {
    private UserService;
    constructor(UserService: UserService);
    getMe(user: User): {
        user: User;
    };
    editUser(user: User, dto: ModUserDto): Promise<User>;
    deleteUser(user: User): Promise<void>;
}
