import { faker } from "@faker-js/faker"

import { prisma, TeamPostgresRepository } from "@/infra/database"

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