import {
  schemaSignIn,
  schemaSignUp,
  type signInType,
  type signUpType,
} from "src/schemas/authentication";
import { UserAlreadyExists } from "../errors/UserAlreadyExists";
import type { AuthenticationRepository } from "../repositories/AuthenticationRepository";
import { compare, hash } from "bcryptjs";
import { InvalidCredentials } from "../errors/InvalidCredentials";
import { sign } from "jsonwebtoken";
import type { IOutput } from "../interfaces/output";
import type { userType } from "src/schemas/user";

export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  async signUp(user: signUpType): Promise<IOutput> {
    const { name, email, password } = schemaSignUp.parse(user);

    const { body } = await this.authenticationRepository.findUserByEmail(email);

    if (!body.data) {
      throw new UserAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    await this.authenticationRepository.create({
      email,
      name,
      password: hashedPassword,
    });

    return {
      statusCode: 201,
      body: {
        success: true,
        data: null,
      },
    };
  }

  async signIn(user: signInType): Promise<IOutput> {
    const { email, password } = schemaSignIn.parse(user);

    const result = await this.authenticationRepository.findUserByEmail(email);

    if (!result.body.data) {
      throw new InvalidCredentials();
    }

    const { password: userPassword } = result.body.data.user as userType;

    const isPasswordValid = await compare(password, userPassword);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      { sub: result.body.data.id },
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    return {
      statusCode: 200,
      body: {
        success: true,
        data: {
          accessToken,
        },
      },
    };
  }
}
