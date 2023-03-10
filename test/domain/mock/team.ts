import { faker } from "@faker-js/faker"

import { Team } from "@/domain/model"

export const mockTeam = (): Team => ({
	name: faker.datatype.string(),
	acronym: faker.datatype.string(),
	profileLink: faker.datatype.string(),
}) 