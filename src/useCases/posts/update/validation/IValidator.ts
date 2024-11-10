export interface IValidator<T> {
    validate(data: T): null | { error: string; status: number };
  }