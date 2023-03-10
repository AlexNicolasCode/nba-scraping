export interface GetPageRepository {
    getPage: (link: string) => Promise<GetPageRepository.Result>
}

export namespace GetPageRepository {
    export type Result = {
        data: string
    } | undefined
}