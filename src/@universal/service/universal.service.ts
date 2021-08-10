import IResponse from '@/@universal/interfaces/response.interface';

class UniversalService {
  public successResponse = (data = null): IResponse => {
    return { statusCode: 200, status: true, message: 'success', data };
  };

  public failureResponse = (message: string): IResponse => {
    return { statusCode: 400, status: false, message };
  };

  protected generateAccountNumber = async (): Promise<string> => {
    return `${Math.floor(Math.random() * 9000000000) + 1000000000}`;
  };
}
export default UniversalService;
