import type { UseCase } from "@/application/use-cases";

export interface Middleware<T> {
  handle(command: UseCase<T>, nextHandler: () => Promise<T>): Promise<T>;
}
