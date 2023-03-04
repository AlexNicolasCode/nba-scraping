import { DbSaveMatch } from "@/data/usecase"
import { SaveMatchRepositorySpy } from "../protocol"

import { mockMatch, throwError } from "test/domain/mock"

describe("DbSaveMatch", () => {
	test("should throw if SaveMatchRepositorySpy throws", async () => {
		const saveMatchRepositorySpy = new SaveMatchRepositorySpy()
		const sut = new DbSaveMatch(saveMatchRepositorySpy)
		jest.spyOn(saveMatchRepositorySpy, "save").mockImplementationOnce(throwError)
    
		const promise = sut.save(mockMatch())
    
		await expect(promise).rejects.toThrowError()
	})
})