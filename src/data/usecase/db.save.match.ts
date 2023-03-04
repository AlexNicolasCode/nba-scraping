import { SaveMatch } from "@/domain/usecase"
import { GetTeamByNameRepository, SaveMatchRepository } from "../protocol"

export class DbSaveMatch implements SaveMatch {
	constructor (
        private readonly getTeamByNameRepository: GetTeamByNameRepository, 
        private readonly saveMatchRepository: SaveMatchRepository
	) {}

	async save (data: SaveMatch.Params): Promise<void> {
		const firstTeam = await this.getTeamByNameRepository.getByName(data.teams[0])
		const secondTeam = await this.getTeamByNameRepository.getByName(data.teams[1])
		const saveMatchRepositoryParams: SaveMatchRepository.Params = {
			title: data.title,
			date: data.date,
			teams: [
				{ id: firstTeam?.id },
				{ id: secondTeam?.id },
			]
			
		}
		await this.saveMatchRepository.save(saveMatchRepositoryParams)
	}
}