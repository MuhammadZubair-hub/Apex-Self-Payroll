import { baseUrl, endPoints } from './Constants/endPoints';
import { apicall } from './index';

export const RequestLetterService = {
  sendRequestLetter: (employeeId: number | string, subject: string, body: string) =>
    apicall({
      endpoint: `${baseUrl}${endPoints.SendEmail}?employeeId=${employeeId}&subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`,
      method: 'GET',
    }),
};
