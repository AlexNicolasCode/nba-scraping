import { Match } from "@/domain/model"
import { SaveMatch } from "@/domain/usecase"
import { GetIdByTeamNameRepository, SaveMatchRepository } from "../protocol"

export class DbSaveMatch implements SaveMatch {
	constructor (
        private readonly getIdByTeamNameRepository: GetIdByTeamNameRepository, 
        private readonly saveMatchRepository: SaveMatchRepository
	) {}

	async save (data: Match): Promise<void> {
		const firstTeam = await this.getIdByTeamNameRepository.getIdByName(data.teams[0])
		const secondTeam = await this.getIdByTeamNameRepository.getIdByName(data.teams[1])
		const saveMatchRepositoryParams: SaveMatchRepository.Params = {
			title: data.title,
			date: data.date,
			teams: [
				firstTeam,
				secondTeam,
			]
			
		}
		await this.saveMatchRepository.save(saveMatchRepositoryParams)
	}
}