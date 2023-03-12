import {ContentLayoutImgInterface} from "./content-layout-img.interface";
import {InfoLayoutInterface} from "../../info-layout/interfaces/info-layout.interface";

export interface ContentLayoutInterface {
  img: ContentLayoutImgInterface
  info: InfoLayoutInterface
  reversed?: boolean
}
