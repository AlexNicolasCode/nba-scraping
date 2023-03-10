import { faker } from "@faker-js/faker"

import { prisma, TeamPostgresRepository } from "@/infra/database"

describe("TeamPostgresRepository", () => {
	afterEach(async () => {
		await prisma.team.deleteMany({})
	})

	test("should get correct team", async () => {
		const sut = new TeamPostgresRepository()
		const fakeTeam = {
			name: faker.random.words(),
			acronym: faker.random.word(),
			profileLink: faker.random.word(),
		}
		await prisma.team.create({
			data: fakeTeam
		})

		const team = await sut.getByName(fakeTeam.name)

		expect(team).toStrictEqual({
			id: 1,
			...fakeTeam,
		})
	})

	test("should return undefined when team not found", async () => {
		const sut = new TeamPostgresRepository()
		const fakeTeamName = faker.random.words()

		const team = await sut.getByName(fakeTeamName)

		expect(team).toBeUndefined()
	})
})