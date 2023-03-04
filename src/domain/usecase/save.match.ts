export interface SaveMatch {
    save: (data: SaveMatch.Params) => Promise<void>
}

export namespace SaveMatch {
    export type Params = {
        title: string
        date: Date
        teams: string[]
    }
}