export interface SaveTeamRepository {
    save: (data: SaveTeamRepository.Params) => Promise<void>
}

export namespace SaveTeamRepository {
    export type Params = {
        name: string
        acronym: string
        profileLink: string
    }
}