import express, { Request, Response } from "express";
import { ErrorHandlerMiddlewareAdapter } from "../../integration/adapters/error-handler-middleware";
import { MiddlewareAdapter } from "../../integration/adapters/middleware";
export class Routes {
  public app = express();
  //todo: dont forget bodyparser
  constructor(private readonly middlewares: Array<MiddlewareAdapter>) {
    this.applyMiddlewares(this.middlewares);
    this.initializeRoutes();
  }

  public applyMiddlewares(
    middlewares: Array<MiddlewareAdapter | ErrorHandlerMiddlewareAdapter>
  ): void {
    middlewares.forEach((middleware) => {
      this.app.use(middleware.handle);
    });
  }

  private initializeRoutes(): void {
    // Route: GET /contracts/:id
    this.app.get(
      "/contracts/:id",
      async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });

        // const { id } = req.params;
        // try {
        //   const contract = await Contract.findOne({ where: { id } });
        //   if (!contract) {
        //     res.status(404).end();
        //     return;
        //   }
        //   res.json(contract);
        // } catch (error) {
        //   res.status(500).json({ error: "Internal Server Error" });
        // }
      }
    );

    // Route: GET /contracts
    this.app.get(
      "/contracts",
      async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
      }
    );

    // Route: GET /jobs/unpaid
    this.app.get(
      "/jobs/unpaid",
      async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
      }
    );

    // Route: POST /jobs/:job_id/pay
    this.app.post(
      "/jobs/:job_id/pay",
      async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
      }
    );

    // Route: POST /balances/deposit/:userId
    this.app.post(
      "/balances/deposit/:userId",
      async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
      }
    );

    // Route: GET /admin/best-profession
    this.app.get(
      "/admin/best-profession",
      async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
      }
    );

    // Route: GET /admin/best-clients
    this.app.get(
      "/admin/best-clients",
      async (req: Request, res: Response): Promise<void> => {
        res.status(501).json({ error: "Not implemented" });
      }
    );
  }
}
