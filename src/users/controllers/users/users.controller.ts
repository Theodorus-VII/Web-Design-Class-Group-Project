import { Controller, Get, Param, ParseBoolPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { Body } from '@nestjs/common/decorators';
import { Request, Response } from 'express';
import { createUserDto } from 'src/users/dtos/createUseer.dto';

@Controller('users')
export class UsersController {
    // @Get()
    // getUsers() {
    //     return [{ username: 'Anon', email: 'anon@anon.com' }];
    // }

    @Get('posts')
    getUsersPosts() {
        return [{
            username: 'Anon', email: 'anon@anon.com', posts: [
                {
                    id: 4, title: 'crap'
                }
            ]
        }];
    }



    @Post('create')
    @UsePipes(new ValidationPipe())
    createUser(@Body() userData: createUserDto){
        console.log(userData);
        return {};
    }



    // parameters in get requests
    // @Get(':param')
    // 2 param version has to run with 2 params.
    @Get(':param/:secondparam')
    getUserByID(@Param('param') param: string, @Param('secondparam') secondparam: string){
        console.log(param);
        return { param , secondparam};
    }



    @Get()
    getUsers(@Query('sortBy', ParseBoolPipe) sortBy: Boolean){
        console.log(sortBy);
        return [{ username: 'Anon', email: 'anon@anon.com' }];
    }

}
