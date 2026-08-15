import { IdentityProviderError } from "./error";

export class IdentityProviderInvalidPasswordError extends IdentityProviderError {
  constructor(options?: ErrorOptions) {
    super("Password does not meet the required strength", options);
    this.name = "IdentityProviderInvalidPasswordError";
  }
}
