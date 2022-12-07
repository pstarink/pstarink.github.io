export class Profile {
  public static keys = ['email', 'name', 'roleType'];

  id = 0
  email: string
  name?: string
  roleType: number = 4
  clientId: number = 0
  createdOn

  token?: string = ""

  constructor(some?: Partial<Profile>) {
    Object.assign(this, some)
  }

  public isRoot(): boolean {
    return this.roleType == 3
  }
}
