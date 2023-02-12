import { User } from '@prisma/client';
export declare class UserController {
    getMe(user: User): {
        user: User;
    };
}
