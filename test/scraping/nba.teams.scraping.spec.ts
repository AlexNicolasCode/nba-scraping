import { GetPage } from "@/domain/usecase"
import { Scraping } from "@/scraping/protocol"
import { GetPageSpy, throwError } from "test/domain/mock"

class NbaTeamsScraping implements Scraping {
	constructor (
        private readonly getPage: GetPage
	) {}

	async run (link: string): Promise<void> {
		const page = await this.getPage.getPage(link)
	}
}

describe("NbaTeamsScraping", () => {
	test("should throw when GetPage throws", async () => {
		const getPageSpy = new GetPageSpy()
		const sut = new NbaTeamsScraping(getPageSpy)
		jest.spyOn(getPageSpy, "getPage").mockImplementationOnce(throwError)

		const promise = sut.run("any_link")
        
		await expect(promise).rejects.toThrow()
	})
})