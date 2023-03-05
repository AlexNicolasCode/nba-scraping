
import { GetPageDataRepository } from "@/data/protocol/http"

import axios from "axios"
import { throwError } from "test/domain/mock"

jest.mock("axios", () => ({
	async get (): Promise<string> {
		return "any_string"
	},
}))

class AxiosClientRepository implements GetPageDataRepository {
	async getPageData (link: string): Promise<GetPageDataRepository.Result> {
		return await axios.get(link)
	}
}

describe("AxiosClient", () => {
	test("should throw if axios throws", async () => {
		const sut = new AxiosClientRepository()
		jest.spyOn(axios, "get").mockImplementationOnce(throwError)

		const promise = sut.getPageData("any_link")
        
		await expect(promise).rejects.toThrow()
	})

	test("should return correct value", async () => {
		const sut = new AxiosClientRepository()

		const result = await sut.getPageData("any_link")
        
		expect(result).toBe("any_string")
	})
})