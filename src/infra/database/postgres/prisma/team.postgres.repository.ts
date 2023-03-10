import { prisma } from "./prisma.client"

import { GetTeamByNameRepository } from "@/data/protocol"

export class TeamPostgresRepository implements GetTeamByNameRepository {
	async getByName (name: string): Promise<GetTeamByNameRepository.Result> {
		const team = await prisma.team.findFirst({
			where: {
				name: name,
			},
		})
		if (team) {
			return {
				id: team.id,
				name: team.name,
				acronym: team.acronym,
				profileLink: team.profileLink,
			}
		}
	}
}