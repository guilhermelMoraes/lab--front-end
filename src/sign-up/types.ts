type SignUpFormData = {
  email: string;
  username: string;
  password: string;
  passwordConfirmation: string;
}

export type Field = {
  id: keyof SignUpFormData;
  labelText: string;
  placeholder: string;
  type: string;
}

export default SignUpFormData;
