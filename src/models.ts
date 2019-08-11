import { User } from './plugins/authentication'

export interface Tournament {
  '.key': string
  name: string
  endDate: Date
  isTeam: boolean
  software: string
}

export interface TournamentStaff {
  admins: User[]
  scorekeepers: User[]
  zoneLeaders: User[]
  floorJudges: User[]
  tmpFloorJudges: User[]
  coverage: User[]
}
