import axios from 'axios';
import SignUpFormData from '../types';

type SubmitNewUserResponse = {
  status: 'SUCCESS' | 'ALREADY-EXIST' | 'ERROR';
  data?: string;
}

export default class SignUpService {
  private static readonly BASE_URL: string = 'http://localhost:8000/user';

  public static async submitNewUser(userData: SignUpFormData): Promise<SubmitNewUserResponse> {
    try {
      const { data } = await axios.post<string>(`${this.BASE_URL}/sign-up`, userData);

      return {
        data,
        status: 'SUCCESS',
      };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 0) {
          return {
            status: 'ERROR',
            data: 'Something unexpected just happened. Please, contact support',
          };
        }

        return {
          status: 'ALREADY-EXIST',
          data: error.response?.data as string,
        };
      }

      return {
        status: 'ERROR',
        data: 'Something unexpected just happened. Please, contact support',
      };
    }
  }
}
