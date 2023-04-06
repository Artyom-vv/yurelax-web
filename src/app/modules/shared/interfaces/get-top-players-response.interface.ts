import {UserStatisticsResponseInterface} from "./user-statistics-response.interface";

export interface GetTopPlayersItemResponseInterface {
  login: string
  statistics: UserStatisticsResponseInterface[]
}
