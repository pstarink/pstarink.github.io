import { BaseEntity } from "."

export class ContainerLocationHistory extends BaseEntity {
  static readonly tableName = "ContainerLocationHistories"

  containerId: number
  locationId: number
  position: string
  actionType: number

  constructor(some?: Partial<ContainerLocationHistory>) {
    super()
    Object.assign(this, some)
  }
}
