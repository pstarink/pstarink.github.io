import { BaseEntity } from "."

export class MaterialIngredient extends BaseEntity {
  static readonly tableName = "RecipeMaterials"

  recipeId!: number

  materialId!: number

  amount: number

  unitType: number

  constructor(some?: Partial<MaterialIngredient>) {
    super()
    Object.assign(this, some)
  }
}
