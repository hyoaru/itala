export class IdentityProviderInvalidCredentialsError extends Error {
  constructor(email: string, options?: ErrorOptions) {
    super(`Invalid credentials for ${email}`, options);
    this.name = "IdentityProviderError";
    Object.setPrototypeOf(
      this,
      IdentityProviderInvalidCredentialsError.prototype,
    );
  }
}
