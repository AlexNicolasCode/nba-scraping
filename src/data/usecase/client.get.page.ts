import { GetPage } from "@/domain/usecase"
import { GetPageRepository } from "../protocol"

export class ClientGetPage implements GetPage {
	constructor (
        private readonly getPageRepository: GetPageRepository 
	) {}

	async getPage (link: string): Promise<GetPage.Result> {
		return await this.getPageRepository.getPage(link)
	}
}