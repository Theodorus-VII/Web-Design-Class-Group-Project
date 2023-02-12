import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { unlink } from 'fs';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetUser } from '../auth/decorator';
import { CreateAvatarDto } from './dto';

@Injectable()
export class AvatarsService {
    constructor(private prisma: PrismaService) { }

    // returns image link
    getAvatar(userId: number) {
        return this.prisma.avatars.findUnique({
            where: {
                userId
            }
        })
    }



    // create pf picture. just registers it to the database
    async setAvatar(imglink: string, user: User, userId: number) {
        try{
        const avatar = await this.prisma.avatars.create({
            data: {
                userId,
                imglink,
            },
        });
        return avatar
    } catch (error){
        
    }
    }

    async deleteAvatar(userId: number) {
        const avatar = this.prisma.avatars.findUnique({
            where: {
                userId
            }
        })

        try {
            if ((await avatar).userId == userId) {
                let temp = (await avatar).imglink;
                await this.prisma.avatars.delete({
                    where: {
                        userId: userId
                    }
                })

                return
            }
        } catch (error) {
            throw new ForbiddenException(
                'Access to resource denied'
            );
        }
    }
}
