import { BaseEntity } from "."

export class ContainerLocation extends BaseEntity {
  static readonly tableName = "ContainerLocations"

  containerId: number
  locationId: number
  position: string

  constructor(some?: Partial<ContainerLocation>) {
    super()
    Object.assign(this, some)
  }
}
