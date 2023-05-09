export interface RatingTableInterface {
  filteredByKey: string
  values: IRatingRow[]
}

export interface IRatingRow { avatarUrl: string, login: string, values: any[] }

export interface IRatingTableColumn {
  key: string
  text: string
}
