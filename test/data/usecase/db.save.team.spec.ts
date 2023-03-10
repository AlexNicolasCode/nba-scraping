import { DbSaveTeam } from "@/data/usecase"

import { SaveTeamRepositorySpy } from "../protocol"
import { mockTeam, throwError } from "test/domain/mock"

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

	test("should return undefined on success", async () => {
		const { sut } = makeSut()
    
		const result = await sut.save(mockTeam())
    
		expect(result).toBeUndefined()
	})
})