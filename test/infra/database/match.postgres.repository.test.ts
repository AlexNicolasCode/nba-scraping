import { faker } from "@faker-js/faker"

import { SaveMatchRepository } from "@/data/protocol"
import { MatchPostgresRepository, prisma } from "@/infra/database"

describe("MatchPostgresRepository", () => {
	beforeEach(async () => {
		await prisma.team.create({
			data: {
				title: faker.random.words(),
			}
		})
		await prisma.team.create({
			data: {
				title: faker.random.words(),
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
			teams: [
				{ id: 1 },
				{ id: 2 },
			]        
		}
        
		await sut.save(fakeMatch)

		const matchFromDatabase = await prisma.match.findUnique({
			where: {
				id: 1
			},
		})
		expect(matchFromDatabase).toStrictEqual({
			id: 1,
			title: fakeMatch.title,
			date: fakeMatch.date,
		})
	})
})