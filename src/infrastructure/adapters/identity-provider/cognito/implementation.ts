import type { IdentityProvider } from "@/application/ports/identity-provider";
import {
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  InitiateAuthCommand,
  SignUpCommand,
} from "@aws-sdk/client-cognito-identity-provider";

export class CognitoIdentityProvider implements IdentityProvider {
  private cognitoClientId: string;
  private cognitoClient: CognitoIdentityProviderClient;

  public constructor() {
    this.cognitoClientId = import.meta.env.VITE_AWS_COGNITO_CLIENT_ID;
    this.cognitoClient = new CognitoIdentityProviderClient({
      region: import.meta.env.VITE_AWS_REGION,
    });
  }

  public async signUp(
    email: string,
    firstName: string,
    lastName: string,
    password: string,
  ): Promise<void> {
    await this.cognitoClient.send(
      new SignUpCommand({
        ClientId: this.cognitoClientId,
        Username: email,
        Password: password,
        UserAttributes: [
          { Name: "email", Value: email },
          { Name: "custom:first_name", Value: firstName },
          { Name: "custom:last_name", Value: lastName },
        ],
      }),
    );
  }

  public async signIn(email: string, password: string): Promise<void> {
    await this.cognitoClient.send(
      new InitiateAuthCommand({
        ClientId: this.cognitoClientId,
        AuthFlow: "USER_PASSWORD_AUTH",
        AuthParameters: {
          USERNAME: email,
          PASSWORD: password,
        },
      }),
    );
  }

  public async verify(email: string, code: string): Promise<void> {
    await this.cognitoClient.send(
      new ConfirmSignUpCommand({
        ClientId: this.cognitoClientId,
        Username: email,
        ConfirmationCode: code,
      }),
    );
  }
}
