import { ClientGetPage } from "@/data/usecase"
import { GetPage } from "@/domain/usecase"
import { PuppeteerClientRepository } from "@/infra/http"

export const makeGetPage = (): GetPage => {
	const getPageRepository = new PuppeteerClientRepository()
	return new ClientGetPage(getPageRepository)
}