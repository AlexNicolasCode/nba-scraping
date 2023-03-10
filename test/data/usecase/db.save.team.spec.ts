import { SaveTeamRepositorySpy } from "../protocol"

import { mockTeam, throwError } from "test/domain/mock"
import { SaveTeam } from "@/domain/usecase"
import { SaveTeamRepository } from "@/data/protocol"


export class DbSaveTeam implements SaveTeam {
	constructor (
        private readonly saveTeamRepository: SaveTeamRepository,
	) {}

	async save (data: SaveTeam.Params): Promise<void> {
		await this.saveTeamRepository.saveTeam(data)
	}
}

type SutTypes = {
	sut: DbSaveTeam
	saveTeamRepositorySpy: SaveTeamRepositorySpy
}

const makeSut = (): SutTypes => {
	const saveTeamRepositorySpy = new SaveTeamRepositorySpy()
	const sut = new DbSaveTeam(saveTeamRepositorySpy)
	return {
		sut,
		saveTeamRepositorySpy,
	}
}

describe("DbSaveTeam", () => {
	test("should throw when SaveTeamRepository throws", async () => {
		const { sut, saveTeamRepositorySpy } = makeSut()
		jest.spyOn(saveTeamRepositorySpy, "saveTeam").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockTeam())
    
		await expect(promise).rejects.toThrowError()
	})
})