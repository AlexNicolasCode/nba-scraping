export interface SaveTeam {
    save: (data: SaveTeam.Params) => Promise<void>
}

export namespace SaveTeam {
    export type Params = {
        title: string
        date: Date
        teams: string[]
    }
}