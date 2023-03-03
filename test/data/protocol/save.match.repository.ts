import { Match } from "@/domain/model"
import { SaveMatchRepository } from "@/data/protocol"

export class SaveMatchRepositorySpy implements SaveMatchRepository {
	data?: Match

	async save (data: Match): Promise<void> {
		this.data = data
	}
}