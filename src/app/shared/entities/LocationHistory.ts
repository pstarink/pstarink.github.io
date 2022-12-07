import { BaseEntity } from "."

export class LocationHistory extends BaseEntity {
  static readonly tableName = "LocationHistories"

  locationId: number
  parentId: number
  position: string
  actionType: number

  constructor(some?: Partial<LocationHistory>) {
    super()
    Object.assign(this, some)
  }
}
