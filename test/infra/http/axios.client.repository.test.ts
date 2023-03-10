import axios from "axios"

import { AxiosClientRepository } from "@/infra/http"

import { throwError } from "test/domain/mock"

jest.mock("axios", () => ({
	async get (): Promise<string> {
		return "any_string"
	},
}))

describe("AxiosClient", () => {
	test("should throw if axios throws", async () => {
		const sut = new AxiosClientRepository()
		jest.spyOn(axios, "get").mockImplementationOnce(throwError)

		const promise = sut.getPage("any_link")
        
		await expect(promise).rejects.toThrow()
	})

	test("should return correct value", async () => {
		const sut = new AxiosClientRepository()

		const result = await sut.getPage("any_link")
        
		expect(result).toBe("any_string")
	})
})