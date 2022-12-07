import { BaseEntity } from "."

export class Recipe extends BaseEntity {
  static readonly tableName = "Recipes"
  materialId: number

  name: string

  description: string

  recipeType: number
  
  makesAmount: number
  
  unitType: number
  
  constructor(some?: Partial<Recipe>) {
    super()
    Object.assign(this, some)
  }
}
