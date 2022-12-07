import { BaseEntity } from "."

export class Activity extends BaseEntity {
  static readonly tableName = "Activities"

  activityType: number

  formData: string

  constructor(some?: Partial<Activity>) {
    super()
    Object.assign(this, some)
  }
}
