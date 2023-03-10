export interface TeamScraping {
    run: (team: string) => Promise<TeamScraping.Result>
}

export namespace TeamScraping {
    export type Result = {
        name: string
        link: string
    }[]
}