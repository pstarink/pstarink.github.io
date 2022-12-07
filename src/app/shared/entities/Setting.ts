import { BaseEntity } from "."

export class Setting extends BaseEntity {
  static readonly tableName = "Settings"

  key!: string

  value!: string

  constructor(some?: Partial<Setting>) {
    super()
    Object.assign(this, some)
  }
}
