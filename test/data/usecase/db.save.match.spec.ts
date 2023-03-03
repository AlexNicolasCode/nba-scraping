import { Match } from "@/domain/model"
import { SaveMatchRepository } from "@/data/protocol"
import { SaveMatch } from "@/domain/usecase"
import { SaveMatchRepositorySpy } from "../protocol"
import { mockMatch, throwError } from "test/domain/mock"

class DbSaveMatch implements SaveMatch {
	constructor (
        private readonly saveMatchRepository: SaveMatchRepository
	) {}

	async save (data: Match): Promise<void> {
		await this.saveMatchRepository.save(data)
		return
	}
}

describe("DbSaveMatch", () => {
	test("should throw if SaveMatchRepositorySpy throws", async () => {
		const saveMatchRepositorySpy = new SaveMatchRepositorySpy()
		const sut = new DbSaveMatch(saveMatchRepositorySpy)
		jest.spyOn(saveMatchRepositorySpy, "save").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockMatch())
    
		await expect(promise).rejects.toThrowError()
	})
})