import { BaseEntity, Container } from "."

export class Location extends BaseEntity {
  static readonly tableName = "Locations"

  barcode: string
  parentId: number = 0
  position: string = undefined
  key: string
  name: string
  locationType: number
  layout: string = ""
  isFixed: number = 1
  isEnabled: number = 1

  parentBc: string
  locations: Location[]
  containers: Container[]

  constructor(some?: Partial<Location>) {
    super()
    Object.assign(this, some)
  }
}
