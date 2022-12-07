import { BaseEntity } from "."

export class Ingredient extends BaseEntity {
  static readonly tableName = "RecipeIngredients"

  recipeId: number

  parentId: number
  
  amount: number
  
  unitType: number
  
  constructor(some?: Partial<Ingredient>) {
    super()
    Object.assign(this, some)
  }
}
