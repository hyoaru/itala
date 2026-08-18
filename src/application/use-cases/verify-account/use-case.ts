import type { IdentityProvider } from "@/application/ports/identity-provider";
import type { UseCase } from "../interface";
import type { VerifyAccountRequest } from "./request";

export class VerifyAccount implements UseCase<void> {
  private request: VerifyAccountRequest;
  private idp: IdentityProvider;

  public constructor(idp: IdentityProvider, request: VerifyAccountRequest) {
    this.request = request;
    this.idp = idp;
  }

  public async execute(): Promise<void> {
    await this.idp.verify(this.request.email, this.request.code);
  }
}
