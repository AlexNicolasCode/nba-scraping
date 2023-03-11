import { SaveMatchRepository } from "@/data/protocol"

export class SaveMatchRepositorySpy implements SaveMatchRepository {
	data?: SaveMatchRepository.Params

	async save (data: SaveMatchRepository.Params): Promise<void> {
		this.data = data
	}
}