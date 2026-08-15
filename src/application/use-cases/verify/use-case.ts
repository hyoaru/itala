import type { IdentityProvider } from "@/application/ports/identity-provider";
import type { UseCase } from "../interface";
import type { VerifyRequest } from "./request";

export class Verify implements UseCase<void> {
  private request: VerifyRequest;
  private idp: IdentityProvider;

  public constructor(idp: IdentityProvider, request: VerifyRequest) {
    this.request = request;
    this.idp = idp;
  }

  public async execute(): Promise<void> {
    await this.idp.verify(this.request.code);
  }
}
