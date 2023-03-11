import { TeamScraping } from "@/data/protocol"
import { GetPage, SaveTeam } from "@/domain/usecase"
import { Scraping } from "@/scraping/protocol"
import { TeamScrapingSpy } from "test/data/protocol"
import { GetPageSpy, throwError } from "test/domain/mock"
import { SaveTeamSpy } from "test/domain/usecase"

class NbaTeamsScraping implements Scraping {
	constructor (
        private readonly getPage: GetPage,
        private readonly teamScraping: TeamScraping,
        private readonly saveTeam: SaveTeam,
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
		for (let i = 0; i <= teams.length; i++) {
			await this.saveTeam.save({
				name: teams[i].name,
				acronym: teams[i].acronym,
				profileLink: teams[i].link,
			})
		}
	}
}

type SutTypes = {
	sut: NbaTeamsScraping
	getPageSpy: GetPageSpy
	teamScrapingSpy: TeamScrapingSpy
	saveTeamSpy: SaveTeamSpy
}

const makeSut = (): SutTypes => {
	const teamScrapingSpy = new TeamScrapingSpy()
	const getPageSpy = new GetPageSpy()
	const saveTeamSpy = new SaveTeamSpy()
	const sut = new NbaTeamsScraping(getPageSpy, teamScrapingSpy, saveTeamSpy)
	return {
		sut,
		getPageSpy,
		teamScrapingSpy,
		saveTeamSpy,
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

	test("should throw when SaveTeam throws", async () => {
		const { sut, saveTeamSpy } = makeSut()
		jest.spyOn(saveTeamSpy, "save").mockImplementationOnce(throwError)

		const promise = sut.run("any_link")
        
		await expect(promise).rejects.toThrow()
	})

})