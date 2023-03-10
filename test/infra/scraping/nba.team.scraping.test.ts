import { TeamScraping } from "@/data/protocol"

import * as cheerio from "cheerio"

class NBATeamCheerioScraping implements TeamScraping {
	async run (pageContent: string): Promise<TeamScraping.Result> {
		const $page = cheerio.load(pageContent)
		const teamsLinks = $page(".AnchorLink:contains('Estatísticas')")
			.map((index: number, team: cheerio.Element) => {
				return $page(team).attr("href")
			}).get()
		const teamAcronym = $page(".AnchorLink:contains('Estatísticas')")
			.map((index: number, team: cheerio.Element) => {
				const link = $page(team).attr("href")
				const acronymPositionInString = 6 
				if (link) {
					return link.split("/")[acronymPositionInString]
				}
			}).get()
		const teams = $page("h2").map((index: number, team: cheerio.Element) => {
			return {
				name: $page(team).text(),
				acronym: teamAcronym[index],
				link: teamsLinks[index],
			}
		}).get()
		return teams
	}
}

describe("NBATeamCheerioScraping", () => {
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