export interface Data {
  state: string;
  errorCode?: ErrorCode | null;
}

export interface Response {
  title: string;
  message: string | null;
}

export enum ErrorCode {
  NO_STOCK = 'NO_STOCK',
  INCORRECT_DETAILS = 'INCORRECT_DETAILS',
}
