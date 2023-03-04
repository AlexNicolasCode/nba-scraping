export interface SaveMatchRepository {
    save: (data: SaveMatchRepository.Params) => Promise<void>
}

export namespace SaveMatchRepository {
    export type Params = {
        title: string
        date: Date,
        teams: {
            id?: number
        }[]
    }
}