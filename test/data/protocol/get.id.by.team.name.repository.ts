import { faker } from "@faker-js/faker"

import { GetTeamByNameRepository } from "@/data/protocol"

export class GetTeamByNameRepositorySpy implements GetTeamByNameRepository {
	name?: string
	result: GetTeamByNameRepository.Result = {
		id: faker.datatype.number(),
		name: faker.random.words(),
		acronym: faker.random.words(),
		profileLink: faker.random.words(),
	}


	async getByName (name: string): Promise<GetTeamByNameRepository.Result> {
		this.name = name
		return this.result
	}
}