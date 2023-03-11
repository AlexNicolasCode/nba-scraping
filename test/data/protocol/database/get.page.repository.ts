import { faker } from "@faker-js/faker"

import { GetPageRepository } from "@/data/protocol"

export class GetPageRepositorySpy implements GetPageRepository {
	link?: string
	result: GetPageRepository.Result = {
		data: faker.datatype.string()
	}


	async getPage (link: string): Promise<GetPageRepository.Result> {
		this.link = link
		return this.result
	}
}