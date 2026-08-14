import type { UseCase } from "@/application/use-cases";
import type { Middleware } from "./middlewares";

export class UseCaseBus {
  private middlewares: Middleware<unknown>[];

  public constructor(middlwares?: Middleware<unknown>[]) {
    this.middlewares = middlwares || [];
  }

  public async dispatch<T>(useCase: UseCase<T>): Promise<T> {
    let handler = () => useCase.execute();

    for (const middleware of [...this.middlewares].reverse()) {
      const next = handler;
      handler = () => (middleware as Middleware<T>).handle(useCase, next);
    }

    return handler();
  }
}
