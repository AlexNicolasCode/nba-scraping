export interface SaveTeam {
    save: (data: SaveTeam.Params) => Promise<void>
}

export namespace SaveTeam {
    export type Params = {
        name: string
        acronym: string
        profileLink: string
    }
}