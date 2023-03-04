import { DbSaveMatch } from "@/data/usecase"
import { GetIdByTeamNameRepositorySpy, SaveMatchRepositorySpy } from "../protocol"

import { mockMatch, throwError } from "test/domain/mock"

describe("DbSaveMatch", () => {
	test("should throw if GetIdByTeamNameRepository throws", async () => {
		const getIdByTeamNameRepositorySpy = new GetIdByTeamNameRepositorySpy()
		const saveMatchRepositorySpy = new SaveMatchRepositorySpy()
		const sut = new DbSaveMatch(getIdByTeamNameRepositorySpy, saveMatchRepositorySpy)
		jest.spyOn(getIdByTeamNameRepositorySpy, "get").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockMatch())
    
		await expect(promise).rejects.toThrowError()
	})

	test("should throw if SaveMatchRepositorySpy throws", async () => {
		const getIdByTeamNameRepositorySpy = new GetIdByTeamNameRepositorySpy()
		const saveMatchRepositorySpy = new SaveMatchRepositorySpy()
		const sut = new DbSaveMatch(getIdByTeamNameRepositorySpy, saveMatchRepositorySpy)
		jest.spyOn(saveMatchRepositorySpy, "save").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockMatch())
    
		await expect(promise).rejects.toThrowError()
	})
})