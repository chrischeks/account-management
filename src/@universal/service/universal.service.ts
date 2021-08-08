import IResponse from '@/@universal/interfaces/response.interface';

class UniversalService {
  public successResponse = (data = null): IResponse => {
    return { statusCode: 200, status: true, message: 'success', data };
  };

  public failureResponse = (message: string): IResponse => {
    return { statusCode: 400, status: false, message };
  };

  protected generateAccountNumber = async (): Promise<string> => {
    const dateLast5 = `${Date.now()}`.substring(8);
    const randomNum = `${Math.floor(Math.random() * 100000)}`;
    return `${dateLast5}${randomNum}`;
  };
}
export default UniversalService;
