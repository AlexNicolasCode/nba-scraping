import { faker } from "@faker-js/faker"

import { prisma, TeamPostgresRepository } from "@/infra/database"

describe("TeamPostgresRepository", () => {
	describe("getByName()", () => {
		beforeEach(async () => {
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
	
			expect({
				name: team?.name,
				acronym: team?.acronym,
				profileLink: team?.profileLink,
			}).toStrictEqual(fakeTeam)
		})
	
		test("should return undefined when team not found", async () => {
			const sut = new TeamPostgresRepository()
			const fakeTeamName = faker.random.words()
	
			const team = await sut.getByName(fakeTeamName)
	
			expect(team).toBeUndefined()
		})
	})

	describe("saveTeam()", () => {
		beforeEach(async () => {
			await prisma.team.deleteMany({})
		})

		test("should save correct team", async () => {
			const sut = new TeamPostgresRepository()
			const fakeTeam = {
				name: faker.random.words(),
				acronym: faker.random.word(),
				profileLink: faker.random.word(),
			}
	
			await sut.saveTeam(fakeTeam)
			
			const team = await prisma.team.findFirst({
				where: {
					name: fakeTeam.name
				}
			})
			expect({
				name: team?.name,
				acronym: team?.acronym,
				profileLink: team?.profileLink,
			}).toStrictEqual({
				...fakeTeam,
			})
		})

		test("should return undefined on success", async () => {
			const sut = new TeamPostgresRepository()
			const fakeTeam = {
				name: faker.random.words(),
				acronym: faker.random.word(),
				profileLink: faker.random.word(),
			}
	
			const team = await sut.saveTeam(fakeTeam)
	
			expect(team).toBeUndefined()
		})
	})
})