import { BaseEntity } from "."

export class Consumable extends BaseEntity {
  static readonly tableName = "Consumables"

  recipeId: number
  
  amount: number
  
  unitType: number

  lot: string

  expiresOn: string
  
  constructor(some?: Partial<Consumable>) {
    super()
    Object.assign(this, some)
  }
}
