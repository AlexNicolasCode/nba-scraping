import axios from "axios"

import { GetPageDataRepository } from "@/data/protocol/http"

export class AxiosClientRepository implements GetPageDataRepository {
	async getPageData (link: string): Promise<GetPageDataRepository.Result> {
		return await axios.get(link)
	}
}