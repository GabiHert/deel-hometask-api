import express from "express";
import { DepositMoneyToClientUseCase } from "../../application/usecases/deposit-money-to-client";
import { MiddlewareAdapter } from "../../integration/adapters/middleware";
import { ClientController } from "../../integration/entrypoint/controllers/client-controller";
import { ContractController } from "../../integration/entrypoint/controllers/contract-controller";
import { JobController } from "../../integration/entrypoint/controllers/job-controller";
import { MetricsController } from "../../integration/entrypoint/controllers/metrics-controller";
import { errorHandlerMiddleware } from "../../integration/entrypoint/middlewares/error-handler";
import { ProfileAuthenticationMiddleware } from "../../integration/entrypoint/middlewares/profile-authentication";
import { ClientDepositBodyValidator } from "../../integration/entrypoint/validations/client-deposit";
import { ContractIdPathParameterValidator } from "../../integration/entrypoint/validations/contract-id-path-parameter";
import { JobIdPathParameterValidator } from "../../integration/entrypoint/validations/job-id-path-parameter";
import { ProfileIdPathParameterValidator } from "../../integration/entrypoint/validations/profile-id-path-parameter";
import { ClientRepository } from "../../integration/repositories/clients";
import { ContractRepository } from "../../integration/repositories/contracts";
import { JobRepository } from "../../integration/repositories/jobs";
import { ProfileRepository } from "../../integration/repositories/profiles";
import { Routes } from "../server/rotes";

export class Injector {
  private constructor() {}
  static Inject(): Routes {
    const app = express();

    const globalMiddlewares: Array<MiddlewareAdapter> = [
      errorHandlerMiddleware,
    ];
    const contractIdPathParameterValidatorMiddleware =
      new ContractIdPathParameterValidator().validate;
    const jobIdIdPathParameterValidatorMiddleware =
      new JobIdPathParameterValidator().validate;
    const profileIdPathParameterValidatorMiddleware =
      new ProfileIdPathParameterValidator().validate;
    const clientDepositBodyValidationMiddleware =
      new ClientDepositBodyValidator().validate;

    const profileRepository = new ProfileRepository();
    const contractRepository = new ContractRepository();
    const jobRepository = new JobRepository();
    const clientRepository = new ClientRepository(jobRepository);
    const depositToClientUseCase = new DepositMoneyToClientUseCase(
      clientRepository
    );
    const profileIdAuthenticationMiddleware =
      new ProfileAuthenticationMiddleware(profileRepository).create();
    const metricsController = new MetricsController(profileRepository);
    const jobController = new JobController(jobRepository);
    const contractController = new ContractController(contractRepository);
    const clientController = new ClientController(depositToClientUseCase);

    const routes = new Routes(
      globalMiddlewares,
      profileIdAuthenticationMiddleware,
      contractIdPathParameterValidatorMiddleware,
      jobIdIdPathParameterValidatorMiddleware,
      profileIdPathParameterValidatorMiddleware,
      clientDepositBodyValidationMiddleware,
      metricsController,
      jobController,
      contractController,
      clientController,
      app
    );
    return routes;
  }
}
