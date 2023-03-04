import { faker } from "@faker-js/faker"

import { GetIdByTeamNameRepository } from "@/data/protocol"

export class GetIdByTeamNameRepositorySpy implements GetIdByTeamNameRepository {
	name?: string
	result = { id: faker.datatype.number() }


	async getIdByName (name: string): Promise<GetIdByTeamNameRepository.Result> {
		this.name = name
		return this.result
	}
}