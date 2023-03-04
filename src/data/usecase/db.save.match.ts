import { Match } from "@/domain/model"
import { SaveMatch } from "@/domain/usecase"
import { SaveMatchRepository } from "../protocol"

export class DbSaveMatch implements SaveMatch {
	constructor (
        private readonly saveMatchRepository: SaveMatchRepository
	) {}

	async save (data: Match): Promise<void> {
		await this.saveMatchRepository.save(data)
	}
}