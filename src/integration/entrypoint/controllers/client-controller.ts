import { DepositToClientUseCaseAdapter } from "../../../application/adapter/deposit-money-to-client-use-case";
import { ClientControllerAdapter } from "../../adapters/client-controller";
import { ClientDepositDto } from "../dtos/client-deposit";
import { ProfileDto } from "../dtos/profile";

export class ClientController implements ClientControllerAdapter {
  constructor(
    private readonly depositToClientUseCase: DepositToClientUseCaseAdapter
  ) {}
  async depositToClient(
    profileId: number,
    clientDeposit: ClientDepositDto
  ): Promise<ProfileDto> {
    const clientDepositEntity = clientDeposit.toEntity();
    const client = await this.depositToClientUseCase.deposit(
      profileId,
      clientDepositEntity
    );

    return new ProfileDto(client);
  }
}
