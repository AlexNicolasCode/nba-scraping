import { TeamScraping } from "@/data/protocol"
import { GetPage } from "@/domain/usecase"
import { Scraping } from "@/scraping/protocol"
import { TeamScrapingSpy } from "test/data/protocol"
import { GetPageSpy, throwError } from "test/domain/mock"

class NbaTeamsScraping implements Scraping {
	constructor (
        private readonly getPage: GetPage,
        private readonly teamScraping: TeamScraping,
	) {}

	async run (link: string): Promise<void> {
		const page = await this.getPage.getPage(link)
		if (!page) {
			throw Error("page not found")
		}
		const teams = await this.teamScraping.run(page.data)
	}
}

describe("NbaTeamsScraping", () => {
	test("should throw when GetPage throws", async () => {
		const teamScrapingSpy = new TeamScrapingSpy()
		const getPageSpy = new GetPageSpy()
		const sut = new NbaTeamsScraping(getPageSpy, teamScrapingSpy)
		jest.spyOn(getPageSpy, "getPage").mockImplementationOnce(throwError)

		const promise = sut.run("any_link")
        
		await expect(promise).rejects.toThrow()
	})

	test("should throw when TeamScraping throws", async () => {
		const teamScrapingSpy = new TeamScrapingSpy()
		const getPageSpy = new GetPageSpy()
		const sut = new NbaTeamsScraping(getPageSpy, teamScrapingSpy)
		jest.spyOn(teamScrapingSpy, "run").mockImplementationOnce(throwError)

		const promise = sut.run("any_link")
        
		await expect(promise).toBe(getPageSpy.result)
	})
})