export interface GetIdByTeamNameRepository {
    getIdByName: (name: string) => Promise<GetIdByTeamNameRepository.Result>
}

export namespace GetIdByTeamNameRepository {
    export type Result = {
        id: number
    }
}