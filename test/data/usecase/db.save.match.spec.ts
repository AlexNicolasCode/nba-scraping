import { DbSaveMatch } from "@/data/usecase"
import { GetIdByTeamNameRepositorySpy, SaveMatchRepositorySpy } from "../protocol"

import { mockMatch, throwError } from "test/domain/mock"

type SutTypes = {
	sut: DbSaveMatch
	saveMatchRepositorySpy: SaveMatchRepositorySpy
	getIdByTeamNameRepositorySpy: GetIdByTeamNameRepositorySpy
}

const makeSut = (): SutTypes => {
	const getIdByTeamNameRepositorySpy = new GetIdByTeamNameRepositorySpy()
	const saveMatchRepositorySpy = new SaveMatchRepositorySpy()
	const sut = new DbSaveMatch(getIdByTeamNameRepositorySpy, saveMatchRepositorySpy)
	return {
		sut,
		saveMatchRepositorySpy,
		getIdByTeamNameRepositorySpy,
	}
}

describe("DbSaveMatch", () => {
	test("should throw if GetIdByTeamNameRepository throws", async () => {
		const { sut, getIdByTeamNameRepositorySpy } = makeSut()
		jest.spyOn(getIdByTeamNameRepositorySpy, "get").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockMatch())
    
		await expect(promise).rejects.toThrowError()
	})

	test("should throw if SaveMatchRepositorySpy throws", async () => {
		const { sut, saveMatchRepositorySpy } = makeSut()
		jest.spyOn(saveMatchRepositorySpy, "save").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockMatch())
    
		await expect(promise).rejects.toThrowError()
	})
})