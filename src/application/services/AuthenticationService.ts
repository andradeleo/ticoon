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

export class AuthenticationService {
  constructor(
    private readonly authenticationRepository: AuthenticationRepository,
  ) {}

  // biome-ignore lint/nursery/useExplicitType: <explanation>
  async signUp(user: signUpType) {
    const { name, email, password } = schemaSignUp.parse(user);

    const currentUser = this.authenticationRepository.findUserByEmail(email);

    if (!currentUser) {
      return new UserAlreadyExists();
    }

    const hashedPassword = await hash(password, 10);

    await this.authenticationRepository.create({
      email,
      name,
      password: hashedPassword,
    });
  }

  // biome-ignore lint/nursery/useExplicitType: <explanation>
  async signIn(user: signInType) {
    const { email, password } = schemaSignIn.parse(user);

    const currentUser =
      await this.authenticationRepository.findUserByEmail(email);

    if (!currentUser) {
      throw new InvalidCredentials();
    }

    const isPasswordValid = await compare(password, currentUser.password);

    if (!isPasswordValid) {
      throw new InvalidCredentials();
    }

    const accessToken = sign(
      { sub: currentUser.id },
      // biome-ignore lint/style/noNonNullAssertion: <explanation>
      process.env.JWT_SECRET!,
      { expiresIn: "1d" },
    );

    return accessToken;
  }
}
