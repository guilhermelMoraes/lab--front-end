import { useState } from 'react';
import { object, string, ref } from 'yup';
import { Formik, FormikProps } from 'formik';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import styles from './sign-up.module.css';
import SignUpForm, { Field } from './types';

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const REQUIRED_FIELD_ERROR_MESSAGE: string = 'Campo obrigatório';

  const formValidationSchema = object({
    email: string().email('E-mail inválido').required(REQUIRED_FIELD_ERROR_MESSAGE),
    username: string()
      .min(4, 'O nome de usuário deve ter, no mínimo, 4 caracteres')
      .max(100, 'O nome de usuário deve ter, no máximo, 100 caracteres')
      .required(REQUIRED_FIELD_ERROR_MESSAGE),
    password: string()
      .min(8, 'A senha deve ter, no mínimo, 4 caracteres')
      .max(30, 'A senha deve ter, no máximo, 30 caracteres')
      .required(REQUIRED_FIELD_ERROR_MESSAGE),
    passwordConfirmation: string().required(REQUIRED_FIELD_ERROR_MESSAGE)
      .oneOf([ref('password')], 'Senha e confirmação são diferentes'),
  });

  const formInitialValues: SignUpForm = {
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const onSubmit = async (): Promise<void> => {
    Promise.resolve();
  };

  const buttonHideOrShowPassword = () => (
    <button
      type="button"
      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
      aria-label={
        isPasswordVisible ? 'Hide password' : 'Show password'
      }
      className={styles['password-input__button']}
    >
      {isPasswordVisible ? (
        <BsEyeSlashFill
          className={styles['password-input__svg']}
        />
      ) : (
        <BsEyeFill className={styles['password-input__svg']} />
      )}
    </button>
  );

  const fields: Field[] = [
    {
      id: 'email',
      labelText: 'E-mail*',
      placeholder: 'fulano@email.com',
      type: 'text',
    },
    {
      id: 'username',
      labelText: 'Username*',
      placeholder: 'fulano_silva',
      type: 'text',
    },
    {
      id: 'password',
      labelText: 'Password*',
      placeholder: 'super_secret#123',
      type: isPasswordVisible ? 'text' : 'password',
    },
    {
      id: 'passwordConfirmation',
      labelText: 'Password confirmation*',
      placeholder: 'super_secret#123',
      type: isPasswordVisible ? 'text' : 'password',
    },
  ];

  return (
    <div className={styles['sign-up']}>
      <main className={styles['sign-up__main']}>
        <h1 className={styles['sign-up__title']}>THE LAB 🧪</h1>
        <Formik
          initialValues={formInitialValues}
          onSubmit={onSubmit}
          validationSchema={formValidationSchema}
        >
          {({
            values, handleChange, errors, touched, handleBlur,
          }: FormikProps<SignUpForm>) => (
            <form>
              {fields.map(({
                id, labelText, placeholder, type,
              }: Field) => (
                <label htmlFor={id} key={id} className={styles.form__label}>
                  <div className={styles['form__label-text']}>
                    {labelText}
                  </div>
                  {(id === 'password' || id === 'passwordConfirmation') ? (
                    <span className={styles['form__password-input']}>
                      {renderInput(
                        { id, type, placeholder },
                        handleChange,
                        handleBlur,
                        values,
                      )}
                      {buttonHideOrShowPassword()}
                    </span>
                  ) : (renderInput({ id, type, placeholder }, handleChange, handleBlur, values))}
                  {(touched[id] && errors[id]) && (
                    <small className={styles['form__label-error']}>
                      {errors[id]}
                    </small>
                  )}
                </label>
              ))}
            </form>
          )}
        </Formik>
        <small>
          *Campos obrigatórios
        </small>
      </main>
    </div>
  );
}

function renderInput(
  { id, placeholder, type }: Omit<Field, 'labelText'>,
  handleChange: any,
  handleBlur: any,
  values: SignUpForm,
) {
  return (
    <input
      id={id}
      placeholder={placeholder}
      className={styles.form__input}
      onChange={handleChange}
      onBlur={handleBlur}
      type={type}
      value={values[id]}
    />
  );
}
