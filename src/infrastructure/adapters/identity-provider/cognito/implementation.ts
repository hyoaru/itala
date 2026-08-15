import {
  IdentityProviderCodeDeliveryFailureError,
  IdentityProviderEmailAlreadyExistsError,
  IdentityProviderError,
  IdentityProviderInvalidCodeError,
  IdentityProviderInvalidCredentialsError,
  IdentityProviderInvalidEmailError,
  IdentityProviderInvalidPasswordError,
  IdentityProviderPasswordResetRequiredError,
  IdentityProviderUserNotConfirmedError,
  IdentityProviderUserNotFoundError,
  type IdentityProvider,
} from "@/application/ports/identity-provider";
import {
  AliasExistsException,
  CodeDeliveryFailureException,
  CodeMismatchException,
  CognitoIdentityProviderClient,
  ConfirmSignUpCommand,
  ExpiredCodeException,
  InitiateAuthCommand,
  InvalidEmailRoleAccessPolicyException,
  InvalidParameterException,
  InvalidPasswordException,
  LimitExceededException,
  NotAuthorizedException,
  PasswordResetRequiredException,
  ResendConfirmationCodeCommand,
  SignUpCommand,
  UsernameExistsException,
  UserNotConfirmedException,
  UserNotFoundException,
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
    try {
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
    } catch (error) {
      if (error instanceof IdentityProviderError) {
        throw error;
      }
      if (
        error instanceof UsernameExistsException ||
        error instanceof AliasExistsException
      ) {
        throw new IdentityProviderEmailAlreadyExistsError(email, {
          cause: error,
        });
      }
      if (error instanceof InvalidPasswordException) {
        throw new IdentityProviderInvalidPasswordError({ cause: error });
      }
      if (
        error instanceof InvalidParameterException ||
        error instanceof InvalidEmailRoleAccessPolicyException
      ) {
        throw new IdentityProviderInvalidEmailError(email, { cause: error });
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new IdentityProviderError(`Identity provider error: ${message}`, {
        cause: error,
      });
    }
  }

  public async signIn(email: string, password: string): Promise<void> {
    try {
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
    } catch (error) {
      if (error instanceof IdentityProviderError) {
        throw error;
      }
      if (
        error instanceof NotAuthorizedException ||
        error instanceof UserNotFoundException
      ) {
        throw new IdentityProviderInvalidCredentialsError(email, {
          cause: error,
        });
      }
      if (error instanceof UserNotConfirmedException) {
        throw new IdentityProviderUserNotConfirmedError(email, {
          cause: error,
        });
      }
      if (error instanceof PasswordResetRequiredException) {
        throw new IdentityProviderPasswordResetRequiredError(email, {
          cause: error,
        });
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new IdentityProviderError(`Identity provider error: ${message}`, {
        cause: error,
      });
    }
  }

  public async verify(email: string, code: string): Promise<void> {
    try {
      await this.cognitoClient.send(
        new ConfirmSignUpCommand({
          ClientId: this.cognitoClientId,
          Username: email,
          ConfirmationCode: code,
        }),
      );
    } catch (error) {
      if (error instanceof IdentityProviderError) {
        throw error;
      }
      if (
        error instanceof CodeMismatchException ||
        error instanceof ExpiredCodeException
      ) {
        throw new IdentityProviderInvalidCodeError({ cause: error });
      }
      if (error instanceof UserNotFoundException) {
        throw new IdentityProviderUserNotFoundError(email, { cause: error });
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new IdentityProviderError(`Identity provider error: ${message}`, {
        cause: error,
      });
    }
  }

  public async sendVerification(email: string): Promise<void> {
    try {
      await this.cognitoClient.send(
        new ResendConfirmationCodeCommand({
          ClientId: this.cognitoClientId,
          Username: email,
        }),
      );
    } catch (error) {
      if (error instanceof IdentityProviderError) {
        throw error;
      }
      if (
        error instanceof CodeDeliveryFailureException ||
        error instanceof LimitExceededException
      ) {
        throw new IdentityProviderCodeDeliveryFailureError(email, {
          cause: error,
        });
      }
      if (error instanceof UserNotFoundException) {
        throw new IdentityProviderUserNotFoundError(email, { cause: error });
      }
      const message = error instanceof Error ? error.message : String(error);
      throw new IdentityProviderError(`Identity provider error: ${message}`, {
        cause: error,
      });
    }
  }
}
