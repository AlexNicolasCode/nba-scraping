import { faker } from "@faker-js/faker"

import { SaveMatchRepository } from "@/data/protocol"
import { MatchPostgresRepository, prisma } from "@/infra/database"

describe("MatchPostgresRepository", () => {
	beforeEach(async () => {
		await prisma.team.deleteMany({})
		await prisma.team.create({
			data: {
				name: faker.random.words(),
				acronym: faker.random.words(),
				profileLink: faker.random.words(),
			}
		})
		await prisma.team.create({
			data: {
				name: faker.random.words(),
				acronym: faker.random.words(),
				profileLink: faker.random.words(),
			}
		})
	})

	afterEach(async () => {
		await prisma.team.deleteMany({})
	})

	test("Should save correct match", async () => {
		const sut = new MatchPostgresRepository()
		const fakeMatch: SaveMatchRepository.Params = {
			title: faker.random.words(),
			date: faker.date.recent(),
			teams: []        
		}
        
		await sut.save(fakeMatch)

		const matchFromDatabase = await prisma.match.findFirst({
			where: {
				title: fakeMatch.title,
			},
		})
		expect({
			title: matchFromDatabase?.title,
			date: matchFromDatabase?.date,
		}).toStrictEqual({
			title: fakeMatch.title,
			date: fakeMatch.date,
		})
	})
})