import { BaseEntity } from "."

export class WellContent extends BaseEntity {
  static readonly tableName = "WellContents"

  wellId!: number

  recipeType?: number

  amount?: number

  unitType?: number

  constructor(some?: Partial<WellContent>) {
    super()
    Object.assign(this, some)
  }
}
