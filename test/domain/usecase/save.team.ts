import { SaveTeam } from "@/domain/usecase"

export class SaveTeamSpy implements SaveTeam {
	data: SaveTeam.Params | undefined

	async save (data: SaveTeam.Params): Promise<void> {
		this.data = data
	}
}