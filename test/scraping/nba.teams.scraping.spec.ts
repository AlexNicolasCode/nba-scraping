import { NbaTeamsScraping } from "@/scraping/usecase"
import { TeamScrapingSpy } from "test/data/protocol"
import { GetPageSpy, throwError } from "test/domain/mock"
import { SaveTeamSpy } from "test/domain/usecase"

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