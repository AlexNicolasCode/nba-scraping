import puppeteer from "puppeteer"

import { GetPageDataRepository } from "@/data/protocol/http"
import { throwError } from "test/domain/mock"

export class PuppeteerClientRepository implements GetPageDataRepository {
	async getPageData (link: string): Promise<GetPageDataRepository.Result> {
		const browser = await puppeteer.launch()
		const pagePuppeteer = await browser.newPage()
		await pagePuppeteer.goto(link)
		const content = await pagePuppeteer.content()
		await browser.close()
		return { data: content }
	}
}

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