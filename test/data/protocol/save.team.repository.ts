import { SaveTeamRepository } from "@/data/protocol"

export class SaveTeamRepositorySpy implements SaveTeamRepository {
	data?: SaveTeamRepository.Params

	async saveTeam (data: SaveTeamRepository.Params): Promise<void> {
		this.data = data
	}
}