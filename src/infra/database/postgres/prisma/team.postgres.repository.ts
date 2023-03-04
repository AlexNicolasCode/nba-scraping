import { GetTeamByNameRepository } from "@/data/protocol"
import { prisma } from "./prisma.client"

export class TeamPostgresRepository implements GetTeamByNameRepository {
	async getByName (name: string): Promise<GetTeamByNameRepository.Result> {
		const team = await prisma.team.findFirst({
			where: {
				title: name
			},
			include: {
				matchs: true
			}
		})
		if (team) {
			return {
				id: team.id,
				title: team.title,
			}
		}
	}
}