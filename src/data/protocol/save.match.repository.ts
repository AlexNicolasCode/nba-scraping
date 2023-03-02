import { Match } from "@/domain/model"

export interface SaveMatchRepository {
    add: (data: Match) => Promise<void>
}