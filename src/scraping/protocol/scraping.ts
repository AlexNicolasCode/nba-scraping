export interface Scraping {
    run: (link: string) => Promise<void>
}