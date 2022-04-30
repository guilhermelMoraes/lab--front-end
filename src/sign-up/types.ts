type SignUpForm = {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export type Field = {
  id: keyof SignUpForm;
  labelText: string;
  placeholder: string;
  type: string;
}

export default SignUpForm;
