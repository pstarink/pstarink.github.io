import { BaseEntity } from "."

export class LocationModel extends BaseEntity {
  static readonly tableName = "LocationModels"

  name: string
  layout: number
  isFixed: number
  isEnabled: number

  constructor(some?: Partial<LocationModel>) {
    super()
    Object.assign(this, some)
  }
}
