import { BaseEntity, Well } from "."

export class Container extends BaseEntity {
  static readonly tableName = "Containers"

  barcode!: string

  containerModelId!: number

  containerState?: number

  containerStatus?: number

  noteId?: number

  wells: Well[] = []

  constructor(some?: Partial<Container>) {
    super()
    Object.assign(this, some)
  }
}
