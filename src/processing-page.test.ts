import { getProcessingPage, getErrorResponse, getSuccessResponse } from './processing-page';
import { ErrorCode } from './processing-page.types';

describe('getProcessingPage', () => {
  it('should return the error page', async () => {
    const data = [{ state: 'processing' }, { state: 'error' }];
    const processingPage = await getProcessingPage(data);
    expect(processingPage).toStrictEqual({ title: 'Error page', message: null });
  });

  it('should return the success page', async () => {
    const data = [{ state: 'processing' }, { state: 'success' }];
    const processingPage = await getProcessingPage(data);
    expect(processingPage).toStrictEqual({ title: 'Order complete', message: null });
  });
});

describe('getErrorResponse', () => {
  it('should return the correct object when the error code is NO_STOCK', async () => {
    expect(getErrorResponse(ErrorCode.NO_STOCK))
      .toStrictEqual({ title: 'Error page', message: 'No stock has been found' });
  });

  it('should return the correct object when the error code is INCORRECT_DETAILS', async () => {
    expect(getErrorResponse(ErrorCode.INCORRECT_DETAILS))
      .toStrictEqual({ title: 'Error page', message: 'Incorrect details have been entered' });
  });

  it('should return the correct object when the error code is null', async () => {
    expect(getErrorResponse(null))
      .toStrictEqual({ title: 'Error page', message: null });
  });

  it('should return the correct object when the error code is undefined', async () => {
    expect(getErrorResponse(undefined))
      .toStrictEqual({ title: 'Error page', message: null });
  });
});

describe('getSuccessResponse', () => {
  it('should return the correct object', async () => {
    expect(getSuccessResponse())
      .toStrictEqual({ title: 'Order complete', message: null });
  });
});
