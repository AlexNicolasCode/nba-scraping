export interface GetTeamByNameRepository {
    getByName: (name: string) => Promise<GetTeamByNameRepository.Result>
}

export namespace GetTeamByNameRepository {
    export type Result = {
        id: number
        name: string
    } | undefined
}