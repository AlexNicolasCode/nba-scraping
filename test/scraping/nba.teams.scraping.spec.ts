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
		if (!teams.length) {
			throw Error("teams not found")
		}
	}
}

type SutTypes = {
	sut: NbaTeamsScraping
	getPageSpy: GetPageSpy
	teamScrapingSpy: TeamScrapingSpy
}

const makeSut = (): SutTypes => {
	const teamScrapingSpy = new TeamScrapingSpy()
	const getPageSpy = new GetPageSpy()
	const sut = new NbaTeamsScraping(getPageSpy, teamScrapingSpy)
	return {
		sut,
		getPageSpy,
		teamScrapingSpy,
	}
}

describe("NbaTeamsScraping", () => {
	test("should throw when GetPage throws", async () => {
		const { sut, getPageSpy } = makeSut()
		jest.spyOn(getPageSpy, "getPage").mockImplementationOnce(throwError)

		const promise = sut.run("any_link")
        
		await expect(promise).rejects.toThrow()
	})

	test("should throw when TeamScraping throws", async () => {
		const { sut, teamScrapingSpy } = makeSut()
		jest.spyOn(teamScrapingSpy, "run").mockImplementationOnce(throwError)

		const promise = sut.run("any_link")
        
		await expect(promise).rejects.toThrow()
	})

	test("should throw when page not found", async () => {
		const { sut, getPageSpy } = makeSut()
		getPageSpy.result = undefined

		const promise = sut.run("any_link")
        
		await expect(promise).rejects.toThrow(Error("page not found"))
	})

	test("should throw when teams not found", async () => {
		const { sut, teamScrapingSpy } = makeSut()
		teamScrapingSpy.result = []

		const promise = sut.run("any_link")
        
		await expect(promise).rejects.toThrow(Error("teams not found"))
	})
})