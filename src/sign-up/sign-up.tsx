import { useState } from 'react';
import { object, string, ref } from 'yup';
import { Formik, FormikProps } from 'formik';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import styles from './sign-up.module.css';
import SignUpForm from './types';

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
              <label htmlFor="email" className={styles.form__label}>
                <div className={styles['form__label-text']}>
                  E-mail*
                </div>
                <input
                  id="email"
                  type="text"
                  className={styles.form__input}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="fulano@email.com"
                />
                {(touched.email && errors.email) && (
                <small className={styles['form__label-error']}>
                  {errors.email}
                </small>
                )}
              </label>

              <label htmlFor="username" className={styles.form__label}>
                <div className={styles['form__label-text']}>
                  Username*
                </div>
                <input
                  id="username"
                  type="text"
                  className={styles.form__input}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.username}
                  placeholder="fulano_silva"
                />
                {(touched.username && errors.username) && (
                <small className={styles['form__label-error']}>
                  {errors.username}
                </small>
                )}
              </label>

              <label htmlFor="password" className={styles.form__label}>
                <div className={styles['form__label-text']}>
                  Password*
                </div>
                <span className={styles['form__password-input']}>
                  <input
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={styles.form__input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    placeholder="super_secret123"
                  />
                  {buttonHideOrShowPassword()}
                </span>
                {(touched.password && errors.password) && (
                <small className={styles['form__label-error']}>
                  {errors.password}
                </small>
                )}
              </label>

              <label
                htmlFor="passwordConfirmation"
                className={styles.form__label}
              >
                <div className={styles['form__label-text']}>
                  Password confirmation*
                </div>
                <span className={styles['form__password-input']}>
                  <input
                    id="passwordConfirmation"
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={styles.form__input}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.passwordConfirmation}
                    placeholder="super_secret123"
                  />
                  {buttonHideOrShowPassword()}
                </span>
                {(touched.passwordConfirmation && errors.passwordConfirmation) && (
                <small className={styles['form__label-error']}>
                  {errors.passwordConfirmation}
                </small>
                )}
              </label>
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
