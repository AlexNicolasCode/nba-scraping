
import { GetPageDataRepository } from "@/data/protocol/http"

import axios from "axios"

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
	test("should return correct value", async () => {
		const sut = new AxiosClientRepository()

		const result = await sut.getPageData("any_link")
        
		expect(result).toBe("any_string")
	})
})