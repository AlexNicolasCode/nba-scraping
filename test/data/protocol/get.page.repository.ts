import { faker } from "@faker-js/faker"

import { GetPageDataRepository } from "@/data/protocol"

export class GetPageDataRepositorySpy implements GetPageDataRepository {
	link?: string
	result: GetPageDataRepository.Result = {
		data: faker.datatype.string()
	}


	async getPageData (link: string): Promise<GetPageDataRepository.Result> {
		this.link = link
		return this.result
	}
}