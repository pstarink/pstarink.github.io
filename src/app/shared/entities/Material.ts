import { BaseEntity } from "."

export class Material extends BaseEntity {
  static readonly tableName = "Materials"

  name: string

  description: string

  lot: number
  
  concentration: number
  
  unitType: number

  expiresOn: string
  
  constructor(some?: Partial<Material>) {
    super()
    Object.assign(this, some)
  }
}
