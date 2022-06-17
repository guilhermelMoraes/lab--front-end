export type FullName = {
  firstName: string;
  surname: string;
};

type LocalSignUpData = {
  email: string;
  fullName: FullName;
  password: string;
  passwordConfirmation: string;
};

export type SubmitNewUserResponse = {
  status: 'SUCCESS' | 'ALREADY-EXIST' | 'ERROR';
  data?: string;
};

export default LocalSignUpData;
