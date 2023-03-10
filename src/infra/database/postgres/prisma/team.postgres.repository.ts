import { prisma } from "./prisma.client"

import { GetTeamByNameRepository } from "@/data/protocol"

export class TeamPostgresRepository implements GetTeamByNameRepository {
	async getByName (name: string): Promise<GetTeamByNameRepository.Result> {
		const team = await prisma.team.findFirst({
			where: {
				name: name
			},
			include: {
				matchs: true
			}
		})
		if (team) {
			return {
				id: team.id,
				name: team.name,
			}
		}
	}
}