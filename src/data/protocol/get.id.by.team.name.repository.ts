export interface GetIdByTeamNameRepository {
    get: (name: string) => Promise<GetIdByTeamNameRepository.Result>
}

export namespace GetIdByTeamNameRepository {
    export type Result = {
        id: number
    }
}