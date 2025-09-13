export interface IForm {
  id: number
  marks: IMark[] | []
  markString: string
  type: string
  login: string
  password: string | null
  errors: IError | null
}

export interface IMark {
  text: string
}

export interface IError {
  password?: boolean
  login?: boolean
}
