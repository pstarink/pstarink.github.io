import { BaseEntity, Container } from "."

export class Location extends BaseEntity {
  static readonly tableName = "Locations"

  barcode: string
  parentId: number = 0
  position: string = undefined
  key: string
  name: string
  locationModelId: number
  layout: string = ""
  isFixed: number = 1
  isEnabled: number = 1

  // extended
  parentBc: string
  locations: Location[]
  containers: Container[]

  static clean(location: Location) {
    const { parentBc, locations, containers, ...own } = location
    return own
  }

  constructor(some?: Partial<Location>) {
    super()
    Object.assign(this, some)
  }
}
