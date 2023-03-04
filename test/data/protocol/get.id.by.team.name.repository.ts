import { faker } from "@faker-js/faker"

import { GetTeamByNameRepository } from "@/data/protocol"

export class GetTeamByNameRepositorySpy implements GetTeamByNameRepository {
	name?: string
	result = {
		id: faker.datatype.number(),
		title: faker.random.words(),
	}


	async getByName (name: string): Promise<GetTeamByNameRepository.Result> {
		this.name = name
		return this.result
	}
}