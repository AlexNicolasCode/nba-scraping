import { DbSaveMatch } from "@/data/usecase"
import { GetTeamByNameRepositorySpy, SaveMatchRepositorySpy } from "../protocol"
import { SaveMatchRepository } from "@/data/protocol"

import { mockMatch, throwError } from "test/domain/mock"

type SutTypes = {
	sut: DbSaveMatch
	saveMatchRepositorySpy: SaveMatchRepositorySpy
	getTeamByNameRepositorySpy: GetTeamByNameRepositorySpy
}

const makeSut = (): SutTypes => {
	const getTeamByNameRepositorySpy = new GetTeamByNameRepositorySpy()
	const saveMatchRepositorySpy = new SaveMatchRepositorySpy()
	const sut = new DbSaveMatch(getTeamByNameRepositorySpy, saveMatchRepositorySpy)
	return {
		sut,
		saveMatchRepositorySpy,
		getTeamByNameRepositorySpy,
	}
}

describe("DbSaveMatch", () => {
	test("should throw if GetTeamByNameRepository throws", async () => {
		const { sut, getTeamByNameRepositorySpy } = makeSut()
		jest.spyOn(getTeamByNameRepositorySpy, "getByName").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockMatch())
    
		await expect(promise).rejects.toThrowError()
	})

	test("should throw if SaveMatchRepositorySpy throws", async () => {
		const { sut, saveMatchRepositorySpy } = makeSut()
		jest.spyOn(saveMatchRepositorySpy, "save").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockMatch())
    
		await expect(promise).rejects.toThrowError()
	})

	test("should SaveMatchRepository should be called with correct params", async () => {
		const { sut, getTeamByNameRepositorySpy, saveMatchRepositorySpy } = makeSut()
		const fakeMatch = mockMatch()
		const saveMatchRepositoryParams: SaveMatchRepository.Params = {
			title: fakeMatch.title,
			date: fakeMatch.date,
			teams: [
				getTeamByNameRepositorySpy.result,
				getTeamByNameRepositorySpy.result,
			]
			
		}
    
		await sut.save(fakeMatch)
    
		expect(saveMatchRepositorySpy.data).toStrictEqual(saveMatchRepositoryParams)
	})
})