import { PrismaService } from '../prisma/prisma.service';
import { ModUserDto } from './dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    editUser(Userid: number, dto: ModUserDto): Promise<import(".prisma/client").User>;
    deleteUser(userid: number): Promise<void>;
}
