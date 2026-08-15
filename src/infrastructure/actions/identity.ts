import {
  SignIn,
  SignUp,
  type SignInRequest,
  type SignUpRequest,
} from "@/application/use-cases";
import { mutationOptions } from "@tanstack/react-query";
import {
  CognitoIdentityProvider,
  DecoratedIdentityProvider,
} from "../adapters/identity-provider";

const baseKey = "identity";

const identityProvider = new DecoratedIdentityProvider(
  new CognitoIdentityProvider(),
);

export const identityActions = {
  signIn: () =>
    mutationOptions({
      mutationKey: [baseKey, "signIn"],
      mutationFn: (request: SignInRequest) =>
        new SignIn(identityProvider, {
          email: request.email,
          password: request.password,
        }).execute(),
    }),
  signUp: () =>
    mutationOptions({
      mutationKey: [baseKey, "signUp"],
      mutationFn: (request: SignUpRequest) =>
        new SignUp(identityProvider, {
          email: request.email,
          firstName: request.firstName,
          lastName: request.lastName,
          password: request.password,
        }).execute(),
    }),
};
