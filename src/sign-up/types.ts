export type FullName = {
  firstName: string;
  surname: string;
};

export type SubmitNewUserResponse = {
  status: 'SUCCESS' | 'ALREADY-EXIST' | 'ERROR';
  data?: string;
};

export type GoogleSignUpData = {
  email: string;
  fullName: FullName;
  emailVerified: boolean;
};

export type LocalSignUpData = {
  email: string;
  fullName: FullName;
  password: string;
  passwordConfirmation: string;
};

type UserSignUpData = LocalSignUpData | GoogleSignUpData;

export default UserSignUpData;
