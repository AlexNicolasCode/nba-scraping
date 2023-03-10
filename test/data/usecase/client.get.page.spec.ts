import { ClientGetPage } from "@/data/usecase"

import { GetPageRepositorySpy } from "test/data/protocol"
import { throwError } from "test/domain/mock"

describe("ClientGetPage", () => {
	test("should throw when GetPageRepository throws", async () => {
		const getPageRepositorySpy = new GetPageRepositorySpy()
		const sut = new ClientGetPage(getPageRepositorySpy)
		jest.spyOn(getPageRepositorySpy, "getPage").mockImplementationOnce(throwError)

		const promise = sut.getPage("any_link")

		await expect(promise).rejects.toThrow()
	})

	test("should return correct data", async () => {
		const getPageRepositorySpy = new GetPageRepositorySpy()
		const sut = new ClientGetPage(getPageRepositorySpy)

		const result = await sut.getPage("any_link")

		expect(result).toBe(getPageRepositorySpy.result)
	})
})