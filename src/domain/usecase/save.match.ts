import { Match } from "../model"

export interface SaveMatch {
    save: (data: Match) => Promise<void>
}