import { ContractEntity } from "../../../../../src/domain/entities/contract";
import { ContractStatusEnum } from "../../../../../src/domain/enums/contract-status";
import { ContractNotFoundError } from "../../../../../src/domain/errors/contract-not-found";
import { ContractRepositoryAdapter } from "../../../../../src/integration/adapters/contract-repository";
import { ContractController } from "../../../../../src/integration/entrypoint/controllers/contract-controller";
import { ContractDto } from "../../../../../src/integration/entrypoint/dtos/contract";

describe("ContractController", () => {
  let contractRepositoryMock: jest.Mocked<ContractRepositoryAdapter>;
  let contractController: ContractController;

  beforeEach(() => {
    contractRepositoryMock = {
      getContractById: jest.fn(),
      listActiveContractsByProfileId: jest.fn(),
    } as unknown as jest.Mocked<ContractRepositoryAdapter>;

    contractController = new ContractController(contractRepositoryMock);
  });

  describe("getContractById", () => {
    it("should return a contract when found", async () => {
      const mockContract: ContractEntity = {
        id: 1,
        terms: "Test Terms",
        status: ContractStatusEnum.IN_PROGRESS,
        clientId: 123,
        contractorId: 123,
      };
      contractRepositoryMock.getContractById.mockResolvedValue(mockContract);

      const result = await contractController.getContractById(1, 1);

      expect(contractRepositoryMock.getContractById).toHaveBeenCalledWith(1, 1);
      expect(result).toEqual(new ContractDto(mockContract));
    });

    it("should throw an error when the contract is not found", async () => {
      contractRepositoryMock.getContractById.mockImplementation(async () => {
        throw new ContractNotFoundError("contract with id '999' not found");
      });

      await expect(contractController.getContractById(1, 999)).rejects.toThrow(
        new ContractNotFoundError("contract with id '999' not found")
      );
      expect(contractRepositoryMock.getContractById).toHaveBeenCalledWith(
        1,
        999
      );
    });
  });

  describe("listContracts", () => {
    it("should return a list of active contracts for a profile", async () => {
      const mockContracts: ContractEntity[] = [
        {
          id: 1,
          terms: "Test Terms",
          status: ContractStatusEnum.IN_PROGRESS,
          clientId: 123,
          contractorId: 123,
        },
        {
          id: 2,
          terms: "Test Terms 2",
          status: ContractStatusEnum.IN_PROGRESS,
          clientId: 123,
          contractorId: 123,
        },
      ];
      contractRepositoryMock.listActiveContractsByProfileId.mockResolvedValue(
        mockContracts
      );

      const result = await contractController.listContracts(1);

      expect(
        contractRepositoryMock.listActiveContractsByProfileId
      ).toHaveBeenCalledWith(1);
      expect(result).toEqual(ContractDto.FromEntities(mockContracts));
    });

    it("should return an empty array when no active contracts are found", async () => {
      contractRepositoryMock.listActiveContractsByProfileId.mockResolvedValue(
        []
      );

      const result = await contractController.listContracts(1);

      expect(
        contractRepositoryMock.listActiveContractsByProfileId
      ).toHaveBeenCalledWith(1);
      expect(result).toEqual([]);
    });
  });
});
