import { BaseEntity, WellContent } from "."

export class Well extends BaseEntity {
  static readonly tableName = "Wells"

  containerId!: number

  row!: number

  col!: number

  wellStatus?: number

  wellContents: WellContent[] = []

  constructor(some?: Partial<Well>) {
    super()
    Object.assign(this, some)
  }
}
