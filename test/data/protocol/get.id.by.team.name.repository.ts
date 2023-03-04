import { faker } from "@faker-js/faker"

import { GetIdByTeamNameRepository } from "@/data/protocol"

export class GetIdByTeamNameRepositorySpy implements GetIdByTeamNameRepository {
	name?: string
	id = faker.datatype.number()


	async get (name: string): Promise<GetIdByTeamNameRepository.Result> {
		this.name = name
		return { id: this.id }
	}
}