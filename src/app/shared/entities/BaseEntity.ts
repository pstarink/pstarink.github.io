export class BaseEntity {
  id!: number
  updatedBy: number = 0
  updatedOn: string = new Date().toISOString()
}
