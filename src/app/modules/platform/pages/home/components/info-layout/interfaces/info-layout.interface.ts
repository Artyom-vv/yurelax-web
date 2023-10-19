import {ActivityInterface} from "../../activity/interfaces/activity.interface";

export interface InfoLayoutInterface {
  headline: string
  delay: (x: number, len: number) => number
  text: string
  activities: ActivityInterface[]
}
