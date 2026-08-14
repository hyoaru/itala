import {
  CognitoIdentityProvider,
  DecoratedIdentityProvider,
} from "./adapters/identity-provider";
import { LoggingMiddleware } from "./middlewares";
import { UseCaseBus } from "./use-case-bus";

const identityProvider = new DecoratedIdentityProvider(
  new CognitoIdentityProvider(),
);

const useCaseBus = new UseCaseBus([new LoggingMiddleware()]);

export { useCaseBus, identityProvider };
