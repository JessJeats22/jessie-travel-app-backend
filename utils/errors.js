export class NotFound extends Error {
  constructor(message){
    super(message)
    this.name = 'NotFound'
    this.status = 404
  }
}


export class Forbidden extends Error {
  constructor(message){
    super(message)
    this.name = 'Forbidden'
    this.status = 403
  }
}

export class Unauthorised extends Error {
  constructor(message){
    super(message)
    this.name = 'Unauthorised'
    this.status = 401
  }
}