import axios from "axios"

import { GetPageRepository } from "@/data/protocol/http"

export class AxiosClientRepository implements GetPageRepository {
	async getPage (link: string): Promise<GetPageRepository.Result> {
		return await axios.get(link)
	}
}