import { Match } from "@/domain/model"

export interface SaveMatchRepository {
    save: (data: Match) => Promise<void>
}