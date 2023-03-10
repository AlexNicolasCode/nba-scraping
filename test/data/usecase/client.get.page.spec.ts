import { ClientGetPage } from "@/data/usecase"

import { GetPageDataRepositorySpy } from "test/data/protocol"
import { throwError } from "test/domain/mock"

describe("ClientGetPage", () => {
	test("should throw when GetPageRepository throws", async () => {
		const getPageDataRepositorySpy = new GetPageDataRepositorySpy()
		const sut = new ClientGetPage(getPageDataRepositorySpy)
		jest.spyOn(getPageDataRepositorySpy, "getPageData").mockImplementationOnce(throwError)

		const promise = sut.getPage("any_link")

		await expect(promise).rejects.toThrow()
	})

	test("should return correct data", async () => {
		const getPageDataRepositorySpy = new GetPageDataRepositorySpy()
		const sut = new ClientGetPage(getPageDataRepositorySpy)

		const result = await sut.getPage("any_link")

		expect(result).toBe(getPageDataRepositorySpy.result)
	})
})