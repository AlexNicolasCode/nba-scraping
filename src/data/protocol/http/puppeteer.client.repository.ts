import * as puppeteer from "puppeteer"

import { GetPageDataRepository } from "./get.page.data.repository"

export class PuppeteerClientRepository implements GetPageDataRepository {
	async getPageData (link: string): Promise<GetPageDataRepository.Result> {
		const browser = await puppeteer.launch()
		const pagePuppeteer = await browser.newPage()
		await pagePuppeteer.goto(link)
		const content = await pagePuppeteer.content()
		await browser.close()
		return { data: content }
	}
}