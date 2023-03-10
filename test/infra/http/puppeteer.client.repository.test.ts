import * as puppeteer from "puppeteer"

import { PuppeteerClientRepository } from "@/data/protocol"

import { throwError } from "test/domain/mock"

describe("PuppeteerClientRepository", () => {
	test("should throw if puppeteer throws", async () => {
		const sut = new PuppeteerClientRepository()
		jest.spyOn(puppeteer, "launch").mockImplementationOnce(throwError)

		const promise = sut.getPageData("https://example.com")
        
		await expect(promise).rejects.toThrow()
	})

	test("should return correct page data", async () => {
		const sut = new PuppeteerClientRepository()

		const result = await sut.getPageData("https://example.com")
        
		expect(result).not.toBeUndefined()
	})
})