import { TeamScraping } from "@/data/protocol"
import { GetPage, SaveTeam } from "@/domain/usecase"
import { Scraping } from "../protocol"

export class NbaTeamsScraping implements Scraping {
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
