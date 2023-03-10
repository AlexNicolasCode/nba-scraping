import { faker } from "@faker-js/faker"

import { GetPage } from "@/domain/usecase"

export class GetPageSpy implements GetPage {
	link: string | undefined
	result: GetPage.Result = {
		data: faker.datatype.string()
	}

	async getPage (link: string): Promise<GetPage.Result> {
		this.link = link
		return this.result
	}
}