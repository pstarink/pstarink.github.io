import { BaseEntity } from "."

export class ContainerModel extends BaseEntity {
  static readonly tableName = "ContainerModels"

  containerType: number
  wellRows: number
  wellCols: number
  wellVolume: number
  unitType: number

  constructor(some?: Partial<ContainerModel>) {
    super()
    Object.assign(this, some)
  }
}
