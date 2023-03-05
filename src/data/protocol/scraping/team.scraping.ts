export interface TeamScraping {
    run: (team: string) => Promise<void>
}

export namespace TeamScraping {
    export type Result = {
        name: string
        externalId: string
        link: string
    }[]
}