import { SaveTeam } from "@/domain/usecase"
import { DbSaveTeam } from "@/data/usecase"
import { TeamPostgresRepository } from "@/infra/database"

export const makeSaveTeam = (): SaveTeam => {
	const saveTeamRepository = new TeamPostgresRepository()
	return new DbSaveTeam(saveTeamRepository)
}