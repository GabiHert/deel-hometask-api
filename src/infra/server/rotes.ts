import express, { Response } from "express";
import { ControllerAdapter } from "../../integration/adapters/controller";
import { MiddlewareAdapter } from "../../integration/adapters/middleware";
import { ProfileRequest } from "./request";
export class Routes {
  public app = express();
  constructor(
    globalMiddlewares: Array<MiddlewareAdapter>,
    private readonly profileIdAuthenticationMiddleware: MiddlewareAdapter,
    private readonly contractIdPathParameterValidatorMiddleware: MiddlewareAdapter,
    private readonly jobIdIdPathParameterValidatorMiddleware: MiddlewareAdapter,
    private readonly profileIdPathParameterValidatorMiddleware: MiddlewareAdapter,
    private readonly controller: ControllerAdapter
  ) {
    this.applyGlobalMiddlewares(globalMiddlewares);
    this.initializeRoutes();
  }

  public applyGlobalMiddlewares(
    globalMiddlewares: Array<MiddlewareAdapter>
  ): void {
    globalMiddlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initializeRoutes(): void {
    // Route: GET /contracts/:id
    this.app.get(
      "/contracts/:id",
      this.app.use(this.profileIdAuthenticationMiddleware),
      this.app.use(this.contractIdPathParameterValidatorMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const contractDto = await this.controller.GetContractById(
          req.profileId || 0,
          parseInt(req.params.id)
        );

        res.status(200).json(contractDto);
      }
    );

    // Route: GET /contracts
    this.app.get(
      "/contracts",
      this.app.use(this.profileIdAuthenticationMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const contractDtos = await this.controller.ListContracts(
          req.profileId || 0
        );
        res.status(200).json(contractDtos);
      }
    );

    // Route: GET /jobs/unpaid
    this.app.get(
      "/jobs/unpaid",
      this.app.use(this.profileIdAuthenticationMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const jobDtos = await this.controller.ListUnpaidJobs(
          req.profileId || 0
        );
        res.status(200).json(jobDtos);
      }
    );

    // Route: POST /jobs/:job_id/pay
    this.app.post(
      "/jobs/:job_id/pay",
      this.app.use(this.profileIdAuthenticationMiddleware),
      this.app.use(this.jobIdIdPathParameterValidatorMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const jobDto = await this.controller.PayJob(
          req.profileId || 0,
          parseInt(req.params.job_id)
        );
        res.status(200).json(jobDto);
      }
    );

    // Route: POST /balances/deposit/:userId
    this.app.post(
      "/balances/deposit/:clientId",
      this.app.use(this.profileIdAuthenticationMiddleware),
      this.app.use(this.profileIdPathParameterValidatorMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const jobDto = await this.controller.DepositToClient(
          parseInt(req.params.clientId)
        );
        res.status(200).json(jobDto);
      }
    );

    // Route: GET /admin/best-profession
    this.app.get(
      "/admin/best-profession",
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const mostSuccessfulProfessionDto =
          await this.controller.GetMostSuccessfulProfession(
            req.query.start as string,
            req.query.end as string
          );
        res.status(200).json(mostSuccessfulProfessionDto);
      }
    );

    // Route: GET /admin/best-clients
    this.app.get(
      "/admin/best-clients",
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const bestClients = await this.controller.GetBestClients(
          req.query.start as string,
          req.query.end as string,
          parseInt(req.query.limit as string)
        );
        res.status(200).json(bestClients);
      }
    );
  }
}
