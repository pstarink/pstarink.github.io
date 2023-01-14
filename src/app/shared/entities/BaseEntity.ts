export class BaseEntity {
  id!: number
  updatedBy: number = 0
  updatedOn: string = new Date().toISOString()

  protected get inherited() {
    return { id: this.id, updatedBy: this.updatedBy, updatedOn: this.updatedOn }
  }
}
