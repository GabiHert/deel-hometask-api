import express, { Response } from "express";
import { ClientControllerAdapter } from "../../integration/adapters/client-controller";
import { ContractControllerAdapter } from "../../integration/adapters/contract-controller";
import { JobControllerAdapter } from "../../integration/adapters/job-controller";
import { MetricsControllerAdapter } from "../../integration/adapters/metrics-controller";
import { MiddlewareAdapter } from "../../integration/adapters/middleware";
import { ClientDepositDto } from "../../integration/entrypoint/dtos/client-deposit";
import { ListQueryDto } from "../../integration/entrypoint/dtos/list-query";
import { ProfileRequest } from "./request";
export class Routes {
  private app = express();
  constructor(
    globalMiddlewares: Array<MiddlewareAdapter>,
    private readonly profileIdAuthenticationMiddleware: MiddlewareAdapter,
    private readonly contractIdPathParameterValidatorMiddleware: MiddlewareAdapter,
    private readonly jobIdIdPathParameterValidatorMiddleware: MiddlewareAdapter,
    private readonly profileIdPathParameterValidatorMiddleware: MiddlewareAdapter,
    private readonly clientDepositBodyValidationMiddleware: MiddlewareAdapter,
    private readonly metricsController: MetricsControllerAdapter,
    private readonly jobController: JobControllerAdapter,
    private readonly contractController: ContractControllerAdapter,
    private readonly clientController: ClientControllerAdapter
  ) {
    this.applyGlobalMiddlewares(globalMiddlewares);
    this.initializeRoutes();
  }

  private applyGlobalMiddlewares(
    globalMiddlewares: Array<MiddlewareAdapter>
  ): void {
    globalMiddlewares.forEach((middleware) => {
      this.app.use(middleware);
    });
  }

  private initializeRoutes(): void {
    this.app.get(
      "/contracts/:id",
      this.app.use(this.profileIdAuthenticationMiddleware),
      this.app.use(this.contractIdPathParameterValidatorMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const contractDto = await this.contractController.getContractById(
          req.profileId || 0,
          parseInt(req.params.id)
        );
        res.status(200).json(contractDto);
      }
    );

    this.app.get(
      "/contracts",
      this.app.use(this.profileIdAuthenticationMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const contractDtos = await this.contractController.listContracts(
          req.profileId || 0
        );
        res.status(200).json(contractDtos);
      }
    );

    this.app.get(
      "/jobs/unpaid",
      this.app.use(this.profileIdAuthenticationMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const jobDtos = await this.jobController.listUnpaidJobs(
          req.profileId || 0
        );
        res.status(200).json(jobDtos);
      }
    );

    this.app.post(
      "/jobs/:job_id/pay",
      this.app.use(this.profileIdAuthenticationMiddleware),
      this.app.use(this.jobIdIdPathParameterValidatorMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const jobDto = await this.jobController.payJob(
          req.profileId || 0,
          parseInt(req.params.job_id)
        );
        res.status(200).json(jobDto);
      }
    );

    this.app.post(
      "/balances/deposit/:clientId",
      this.app.use(this.profileIdAuthenticationMiddleware),
      this.app.use(this.profileIdPathParameterValidatorMiddleware),
      this.app.use(this.clientDepositBodyValidationMiddleware),
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const clientDeposit = new ClientDepositDto(req.body);
        const jobDto = await this.clientController.depositToClient(
          parseInt(req.params.clientId),
          clientDeposit
        );
        res.status(200).json(jobDto);
      }
    );

    this.app.get(
      "/admin/best-profession",
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const listQuery = new ListQueryDto({
          start: req.query.start as string,
          end: req.query.end as string,
          limit: parseInt(req.query.limit as string),
        });
        const mostSuccessfulProfessionDto =
          await this.metricsController.getMostSuccessfulProfession(listQuery);
        res.status(200).json(mostSuccessfulProfessionDto);
      }
    );

    this.app.get(
      "/admin/best-clients",
      async (req: ProfileRequest, res: Response): Promise<void> => {
        const listQuery = new ListQueryDto({
          start: req.query.start as string,
          end: req.query.end as string,
          limit: parseInt(req.query.limit as string),
        });
        const bestClients = await this.metricsController.listTopPayingClients(
          listQuery
        );
        res.status(200).json(bestClients);
      }
    );
  }

  serve(port: number) {
    try {
      this.app.listen(port, () => {
        console.log("Express App Listening on Port 3001");
      });
    } catch (error) {
      console.error(`An error occurred: ${JSON.stringify(error)}`);
      process.exit(1);
    }
  }
}
