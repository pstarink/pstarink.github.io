import { BaseEntity } from "."

export class User extends BaseEntity {
  static readonly tableName = "Users"

  email!: string

  password!: string

  name?: string

  roleType?: number

  token: string = ""

  constructor(some?: Partial<User>) {
    super()
    Object.assign(this, some)
  }
}
