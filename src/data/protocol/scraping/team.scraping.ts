export interface TeamScraping {
    run: (team: string) => Promise<TeamScraping.Result>
}

export namespace TeamScraping {
    export type Result = {
        name: string
        acronym: string
        link: string
    }[]
}