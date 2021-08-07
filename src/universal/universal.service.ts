import Status from '@/enums/status.enum';
import IResponse from '@/universal/interfaces/response.interface';
import { logger } from '@utils/logger';

class UniversalService {
  public successResponse = (data = null): IResponse => {
    return { statusCode: 200, status: true, message: 'success', data };
  };

  public failureResponse = (message: string): IResponse => {
    return { statusCode: 400, status: false, message };
  };
}
export default UniversalService;
