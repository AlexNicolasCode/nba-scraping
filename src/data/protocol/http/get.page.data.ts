export interface GetPageData {
    getPageData: (link: string) => Promise<GetPageData.Result>
}

export namespace GetPageData {
    export type Result = {
        data: string
    } | undefined
}