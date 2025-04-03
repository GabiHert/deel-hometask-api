import { DepositToClientUseCaseAdapter } from "../../../../../src/application/adapter/deposit-money-to-client-use-case";
import { ProfileEntity } from "../../../../../src/domain/entities/profile";
import { ClientController } from "../../../../../src/integration/entrypoint/controllers/client-controller";
import { ClientDepositDto } from "../../../../../src/integration/entrypoint/dtos/client-deposit";
import { ProfileDto } from "../../../../../src/integration/entrypoint/dtos/profile";

describe("ClientController", () => {
  let depositToClientUseCase: jest.Mocked<DepositToClientUseCaseAdapter>;
  let clientController: ClientController;

  beforeEach(() => {
    depositToClientUseCase = {
      deposit: jest.fn(),
    } as unknown as jest.Mocked<DepositToClientUseCaseAdapter>;

    clientController = new ClientController(depositToClientUseCase);
  });

  it("should deposit funds to a client's account and return the updated profile", async () => {
    // Arrange
    const profileId = 1;
    const clientDepositDto = {
      toEntity: jest.fn().mockReturnValue({ amount: 100 }),
    } as unknown as ClientDepositDto;

    const clientEntity: ProfileEntity = {
      id: profileId,
      balance: 200,
      firstName: "abra",
      lastName: "cadabra",
      profession: "programmer",
      type: "client",
    };
    depositToClientUseCase.deposit.mockResolvedValue(clientEntity);

    // Act
    const result = await clientController.depositToClient(
      profileId,
      clientDepositDto
    );

    // Assert
    expect(clientDepositDto.toEntity).toHaveBeenCalled();
    expect(depositToClientUseCase.deposit).toHaveBeenCalledWith(profileId, {
      amount: 100,
    });
    expect(result).toBeInstanceOf(ProfileDto);
    expect(result).toEqual(new ProfileDto(clientEntity));
  });

  it("should throw an error if depositToClientUseCase throws an error", async () => {
    // Arrange
    const profileId = 1;
    const clientDepositDto = {
      toEntity: jest.fn().mockReturnValue({ amount: 100 }),
    } as unknown as ClientDepositDto;

    depositToClientUseCase.deposit.mockRejectedValue(
      new Error("Deposit failed")
    );

    // Act & Assert
    await expect(
      clientController.depositToClient(profileId, clientDepositDto)
    ).rejects.toThrow("Deposit failed");

    expect(clientDepositDto.toEntity).toHaveBeenCalled();
    expect(depositToClientUseCase.deposit).toHaveBeenCalledWith(profileId, {
      amount: 100,
    });
  });

  it("should handle empty or invalid clientDepositDto gracefully", async () => {
    // Arrange
    const profileId = 1;
    const clientDepositDto = null as unknown as ClientDepositDto;

    // Act & Assert
    await expect(
      clientController.depositToClient(profileId, clientDepositDto)
    ).rejects.toThrow("Cannot read properties of null (reading 'toEntity')");
  });
});
