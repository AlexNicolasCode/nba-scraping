import { GetPage } from "@/domain/usecase"
import { GetPageDataRepository } from "@/data/protocol"

import { GetPageDataRepositorySpy } from "test/data/protocol"
import { throwError } from "test/domain/mock"

export class ClientGetPage implements GetPage {
	constructor (
        private readonly getPageRepository: GetPageDataRepository 
	) {}

	async getPage (link: string): Promise<GetPage.Result> {
		return await this.getPageRepository.getPageData(link)
	}
}

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