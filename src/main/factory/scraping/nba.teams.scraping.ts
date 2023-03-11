import { NBATeamCheerioScraping } from "@/infra/scraping"
import { Scraping } from "@/scraping/protocol"
import { NbaTeamsScraping } from "@/scraping/usecase"
import { makeGetPage, makeSaveTeam } from "../usecase"

export const makeNbaTeamScraping = (): Scraping => {
	const getPage = makeGetPage()
	const teamScraping = new NBATeamCheerioScraping()
	const saveTeam = makeSaveTeam()
	return new NbaTeamsScraping(
		getPage,
		teamScraping,
		saveTeam
	)
}