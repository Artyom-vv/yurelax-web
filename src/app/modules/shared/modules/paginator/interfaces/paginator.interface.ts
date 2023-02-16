export interface PaginatorResponseInterface {
  current_step: number;
  range: PaginatorEndsInterface
}

export interface PaginatorEndsInterface {
  start: number;
  end: number;
}
