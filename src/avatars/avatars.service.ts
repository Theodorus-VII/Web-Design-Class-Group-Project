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
        try {
            const avatar = await this.prisma.avatars.create({
                data: {
                    userId,
                    imglink,
                },
            });
            return avatar
        } catch (error) {
            try {
                this.deleteAvatar(userId)
                this.setAvatar(imglink, user, userId)

            } catch{}
        }
    }

    async deleteAvatar(userId: number) {
        console.log("delete")
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
            console.log(
                'Access to resource denied'
            );
        }
    }
}
