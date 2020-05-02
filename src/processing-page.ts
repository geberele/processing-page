import { Data, Response, ErrorCode } from './processing-page.types';

export const getProcessingPage = async (data: Data[]): Promise<Response | void> => {
  const firstStep = (Array.isArray(data)) ? data.shift() : undefined;
  const delayMillSec = 2000;
  if (firstStep) {
    if (firstStep.state === 'processing') {
      return delay(delayMillSec).then(() => {
        if (data.length > 0) { return getProcessingPage(data); }
      });
    } else if (firstStep.state === 'error') {
      return processErrorState(firstStep.errorCode);
    } else if (firstStep.state === 'success') {
      return processSuccessState();
    }
  }
};

const delay = (ms: number): Promise<void> => (
  new Promise(resolve => setTimeout(resolve, ms))
);

const processErrorState = (errorCode: ErrorCode | undefined | null): Promise<Response> => (
  new Promise((resolve) => resolve(getErrorResponse(errorCode)))
);

const processSuccessState = (): Promise<Response> => (
  new Promise((resolve) => resolve(getSuccessResponse()))
);

export const getErrorResponse = (errorCode: ErrorCode | undefined | null): Response => {
  if (errorCode === ErrorCode.NO_STOCK) {
    return { title: 'Error page', message: 'No stock has been found' };
  } else if (errorCode === ErrorCode.INCORRECT_DETAILS) {
    return { title: 'Error page', message: 'Incorrect details have been entered' };
  } else {
    return { title: 'Error page', message: null };
  }
};

export const getSuccessResponse = (): Response => (
  { title: 'Order complete', message: null }
);
