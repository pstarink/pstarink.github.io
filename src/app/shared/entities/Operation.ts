import { BaseEntity } from "."

export class Operation extends BaseEntity {
  static readonly tableName = "Operations"

  activityId: number

  containerSrcId: string

  containerDstId: string

  operationType: number

  scopeType: number

  amount: number

  unitType: number

  operationStatus: number

  constructor(some?: Partial<Operation>) {
    super()
    Object.assign(this, some)
  }
}
