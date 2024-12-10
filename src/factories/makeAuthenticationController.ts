import { AuthenticationController } from "src/application/controllers/AuthenticationController";
import { AuthenticationRepository } from "src/application/repositories/AuthenticationRepository";
import { AuthenticationService } from "src/application/services/AuthenticationService";

export function makeAuthenticationController(): AuthenticationController {
  const authenticationRepository = new AuthenticationRepository();
  const authenticationService = new AuthenticationService(
    authenticationRepository,
  );
  return new AuthenticationController(authenticationService);
}
