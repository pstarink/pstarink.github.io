import { BaseEntity } from "."

export class Lookup extends BaseEntity {
  static readonly tableName = "Lookups"

  parentId?: number

  key!: string

  name?: string

  roleType?: number

  isItem: number = 0

  isEnabled: number = 1

  // 

  options: Lookup[] = []

  allOptions: Lookup[] = []

  static clean(lookup) {
    const { options, allOptions, ...own } = lookup
    return own
  }

  option(name: string): Lookup {
    return this.options.find(option => option.name === name && option.isEnabled)
  }

  getOptions(): Lookup[] {
    return this.allOptions.filter(option => option.isEnabled)
  }

  byName(name: string, def = 0) {
    const lookup = this.options.find(option => option.name === name)
    return lookup?.id ?? def
  }


  constructor(some?: Partial<Lookup>) {
    super()
    Object.assign(this, some)
  }
}
