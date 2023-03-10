export interface GetPage {
    getPage: (link: string) => Promise<GetPage.Result>
}

export namespace GetPage {
    export type Result = {
        data: string
    } | undefined
}