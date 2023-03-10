import { prisma } from "./prisma.client"

import { GetTeamByNameRepository, SaveTeamRepository } from "@/data/protocol"

export class TeamPostgresRepository implements GetTeamByNameRepository, SaveTeamRepository {
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

	async saveTeam (data: SaveTeamRepository.Params): Promise<void> {
		await prisma.team.create({
			data: data
		})
	}
}