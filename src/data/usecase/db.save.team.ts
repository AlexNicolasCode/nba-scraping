import { SaveTeam } from "@/domain/usecase"
import { SaveTeamRepository } from "../protocol"

export class DbSaveTeam implements SaveTeam {
	constructor (
        private readonly saveTeamRepository: SaveTeamRepository,
	) {}

	async save (data: SaveTeam.Params): Promise<void> {
		await this.saveTeamRepository.saveTeam(data)
	}
}