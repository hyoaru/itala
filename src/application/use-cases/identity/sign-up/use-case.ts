import type { IdentityProvider } from "@/application/ports/identity-provider";
import type { UseCase } from "../interface";
import type { SignUpRequest } from "./request";

export class SignUp implements UseCase<void> {
  private request: SignUpRequest;
  private idp: IdentityProvider;

  public constructor(idp: IdentityProvider, request: SignUpRequest) {
    this.request = request;
    this.idp = idp;
  }

  public async execute(): Promise<void> {
    await this.idp.signUp(
      this.request.email,
      this.request.firstName,
      this.request.lastName,
      this.request.password,
    );
  }
}
