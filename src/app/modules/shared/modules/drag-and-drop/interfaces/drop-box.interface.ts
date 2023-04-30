export type Base64Url = string | ArrayBuffer | null

export interface DropBoxOnChangeInterface {
  file: File
  url: Base64Url
}
