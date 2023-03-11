import { faker } from "@faker-js/faker"

import { TeamScraping } from "@/data/protocol"

export class TeamScrapingSpy implements TeamScraping {
	team: string | undefined
	result: TeamScraping.Result = [{
		name: faker.datatype.string(),
		acronym: faker.datatype.string(),
		link: faker.datatype.string(),
	}]

	async run (team: string): Promise<TeamScraping.Result> {
		this.team = team
		return this.result
	}
} 