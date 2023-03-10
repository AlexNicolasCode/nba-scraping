import * as cheerio from "cheerio"

import { NBATeamCheerioScraping } from "@/infra/scraping"

import { throwError } from "test/domain/mock"

describe("NBATeamCheerioScraping", () => {
	test("should throw when cheerio throws", async () => {
		const fakePageData = "any_page_data"
		const sut = new NBATeamCheerioScraping()
		jest.spyOn(cheerio, "load").mockImplementationOnce(throwError)

		const promise = sut.run(fakePageData)
		
		await expect(promise).rejects.toThrow()
	})

	test("should return correct value on success", async () => {
		const fakeReturn = {
			name: "any_team",
			acronym: "any_acronym",
			link: "/any_path/any_path/any_path/any_path/any_path/any_acronym",

		}
		const fakePageData = `
			<h2>${fakeReturn.name}</h2>
			<a class='AnchorLink' href=${fakeReturn.link}>Estatísticas</a>
		`
		const sut = new NBATeamCheerioScraping()

		const result = await sut.run(fakePageData)
		
		expect(result).toStrictEqual([fakeReturn])
	})
})