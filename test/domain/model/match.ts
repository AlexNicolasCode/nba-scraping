import { faker } from "@faker-js/faker"

import { Match } from "@/domain/model"

export const mockMatch = (): Match => ({
	title: faker.datatype.string(),
	date: faker.date.recent(),
	teams: [faker.datatype.string(), faker.datatype.string()],
}) 