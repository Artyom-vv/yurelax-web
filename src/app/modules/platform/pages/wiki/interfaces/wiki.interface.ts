import {TimestampsDto} from "../../../../shared/interfaces/old/shared.interface";

export interface WikiPage extends TimestampsDto {
  _id: string
  metadata:  {[key: string]: string}
  slices: WikiSlice[]
}

export interface WikiSlice {
  type: 'text' | 'image' | 'title' | 'subtitle' | 'link' | 'header' | 'spacing'
  displayTitle?: string
  value: string
}

export type WikiNavigation = WikiNavigationItem[][]

export interface WikiNavigationItem {
  metadata: WikiMetadata;
  page: string;
}

export type WikiMetadata = { [key: string]: string }
