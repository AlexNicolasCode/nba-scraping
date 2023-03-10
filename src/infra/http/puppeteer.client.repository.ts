import * as puppeteer from "puppeteer"

import { GetPageRepository } from "../../data/protocol/http/get.page.data.repository"

export class PuppeteerClientRepository implements GetPageRepository {
	async getPage (link: string): Promise<GetPageRepository.Result> {
		const browser = await puppeteer.launch()
		const pagePuppeteer = await browser.newPage()
		await pagePuppeteer.goto(link)
		const content = await pagePuppeteer.content()
		await browser.close()
		return { data: content }
	}
}