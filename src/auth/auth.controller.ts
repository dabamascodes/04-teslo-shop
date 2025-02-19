import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';

import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';

import { CreateUserDto, LoginUserDto } from './dto';
import { User } from './entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}



  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create( createUserDto );
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login( loginUserDto );
  }

  @Get('private')
  @UseGuards( AuthGuard() )
  testingPrivateRoute(
    // @Req() request: Express.Request
    @GetUser() user: User // TODO? -> Custom Decorator
  ) {

    // TODO! -> Fucnciona con: @Req() request: Express.Request
    // console.log({ request });
    // console.log({ user: request.user });

    // TODO? -> Custom Decorator
    console.log({ user })

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user: user,
    }
  }



}
