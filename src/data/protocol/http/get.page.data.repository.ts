export interface GetPageDataRepository {
    getPageData: (link: string) => Promise<GetPageDataRepository.Result>
}

export namespace GetPageDataRepository {
    export type Result = {
        data: string
    } | undefined
}