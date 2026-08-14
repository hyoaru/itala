import type { UseCase } from "@/application/use-cases";
import { logger } from "@/infrastructure/logger";
import type { Middleware } from "../../interface";

export class LoggingMiddleware<T> implements Middleware<T> {
  public async handle(
    useCase: UseCase<T>,
    nextHandler: () => Promise<T>,
  ): Promise<T> {
    const useCaseName = useCase.constructor.name;
    logger.debug(`Handling usecase: ${useCaseName}`, { useCase });

    try {
      const result = await nextHandler();
      logger.debug(`Successfully handled usecase: ${useCaseName}`, { result });
      return result;
    } catch (error) {
      logger.error(`Error handling usecase: ${useCaseName}`, { error });
      throw error;
    }
  }
}
