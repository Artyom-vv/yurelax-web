import {UserStatisticsResponseInterface} from "./user-statistics-response.interface";

export interface GetTopPlayersItemResponseInterface {
  avatarUrl: string
  login: string
  statistics: UserStatisticsResponseInterface[]
}
