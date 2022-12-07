import { BaseEntity } from "."

export class UnitScaling extends BaseEntity {
  static readonly tableName = "UnitScalings"

  unitType!: number

  baseType!: number

  multiplier!: number

  constructor(some?: Partial<UnitScaling>) {
    super()
    Object.assign(this, some)
  }
}
