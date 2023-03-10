import { GetPage } from "@/domain/usecase"
import { GetPageDataRepository } from "../protocol"

export class ClientGetPage implements GetPage {
	constructor (
        private readonly getPageRepository: GetPageDataRepository 
	) {}

	async getPage (link: string): Promise<GetPage.Result> {
		return await this.getPageRepository.getPageData(link)
	}
}