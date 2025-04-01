import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { getProfile } from "../../integration/entrypoint/middleware/authorization";
import { connection } from "../db";
import { Contract } from "../../integration/repositories/models";

export const app = express();
app.use(bodyParser.json());
app.use(getProfile);

/**
 * FIX ME!
 * @returns contract by id
 */
app.get(
  "/contracts/:id",
  async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
      const contract = await Contract.findOne({ where: { id } });
      if (!contract) {
        res.status(404).end();
        return;
      }
      res.json(contract);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

// Route: GET /contracts
app.get("/contracts", async (req: Request, res: Response): Promise<void> => {
  // Not implemented
  res.status(501).json({ error: "Not implemented" });
});

// Route: GET /jobs/unpaid
app.get("/jobs/unpaid", async (req: Request, res: Response): Promise<void> => {
  // Not implemented
  res.status(501).json({ error: "Not implemented" });
});

// Route: POST /jobs/:job_id/pay
app.post(
  "/jobs/:job_id/pay",
  async (req: Request, res: Response): Promise<void> => {
    // Not implemented
    res.status(501).json({ error: "Not implemented" });
  }
);

// Route: POST /balances/deposit/:userId
app.post(
  "/balances/deposit/:userId",
  async (req: Request, res: Response): Promise<void> => {
    // Not implemented
    res.status(501).json({ error: "Not implemented" });
  }
);

// Route: GET /admin/best-profession
app.get(
  "/admin/best-profession",
  async (req: Request, res: Response): Promise<void> => {
    // Not implemented
    res.status(501).json({ error: "Not implemented" });
  }
);

// Route: GET /admin/best-clients
app.get(
  "/admin/best-clients",
  async (req: Request, res: Response): Promise<void> => {
    // Not implemented
    res.status(501).json({ error: "Not implemented" });
  }
);
