import * as cheerio from "cheerio"

import { TeamScraping } from "@/data/protocol"

export class NBATeamCheerioScraping implements TeamScraping {
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