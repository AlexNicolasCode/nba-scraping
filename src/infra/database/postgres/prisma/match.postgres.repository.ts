import { SaveMatchRepository } from "@/data/protocol"
import { prisma } from "./prisma.client"

export class MatchPostgresRepository implements SaveMatchRepository {
	async save (data: SaveMatchRepository.Params): Promise<void> {
		await prisma.match.create({
			data: {
				title: data.title,
				date: data.date,
				teams: {
					connect: data.teams
				}
			}
		})
	}
}