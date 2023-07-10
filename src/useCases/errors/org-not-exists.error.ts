export class OrgNotExistsError extends Error {
  constructor() {
    super('Org not exists!')
  }
}
