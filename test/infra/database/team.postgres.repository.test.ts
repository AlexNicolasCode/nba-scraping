import { faker } from "@faker-js/faker"

import { GetTeamByNameRepository } from "@/data/protocol"
import { prisma } from "@/infra/database"

class TeamPostgresRepository implements GetTeamByNameRepository {
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

describe("TeamPostgresRepository", () => {
	afterEach(async () => {
		await prisma.team.deleteMany({})
	})

	test("should get correct team", async () => {
		const sut = new TeamPostgresRepository()
		const fakeTeamName = faker.random.words()
		await prisma.team.create({
			data: {
				title: fakeTeamName
			}
		})

		const team = await sut.getByName(fakeTeamName)

		expect(team).toStrictEqual({
			id: 1,
			title: fakeTeamName,
		})
	})

	test("should return undefined when team not found", async () => {
		const sut = new TeamPostgresRepository()
		const fakeTeamName = faker.random.words()

		const team = await sut.getByName(fakeTeamName)

		expect(team).toBeUndefined()
	})
})