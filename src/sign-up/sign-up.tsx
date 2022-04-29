import { useState } from 'react';
import { Formik, FormikProps } from 'formik';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';

import styles from './sign-up.module.css';
import SignUpForm from './types';

export default function SignUp() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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
        <Formik initialValues={formInitialValues} onSubmit={onSubmit}>
          {({ values, handleChange }: FormikProps<SignUpForm>) => (
            <form>
              <label htmlFor="email" className={styles.form__label}>
                <div className={styles['form__label-text']}>
                  E-mail
                </div>
                <input
                  id="email"
                  type="text"
                  className={styles.form__input}
                  onChange={handleChange}
                  value={values.email}
                  placeholder="john_doe@email.com"
                />
              </label>

              <label htmlFor="username" className={styles.form__label}>
                <div className={styles['form__label-text']}>
                  Username
                </div>
                <input
                  id="username"
                  type="text"
                  className={styles.form__input}
                  onChange={handleChange}
                  value={values.username}
                  placeholder="john_doe"
                />
              </label>

              <label htmlFor="password" className={styles.form__label}>
                <div className={styles['form__label-text']}>
                  Password
                </div>
                <span className={styles['form__password-input']}>
                  <input
                    id="password"
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={styles.form__input}
                    onChange={handleChange}
                    value={values.password}
                    placeholder="#super_secret123"
                  />
                  {buttonHideOrShowPassword()}
                </span>
              </label>

              <label
                htmlFor="passwordConfirmation"
                className={styles.form__label}
              >
                <div className={styles['form__label-text']}>
                  Password confirmation
                </div>
                <span className={styles['form__password-input']}>
                  <input
                    id="passwordConfirmation"
                    type={isPasswordVisible ? 'text' : 'password'}
                    className={styles.form__input}
                    onChange={handleChange}
                    value={values.passwordConfirmation}
                    placeholder="#super_secret123"
                  />
                  {buttonHideOrShowPassword()}
                </span>
              </label>
            </form>
          )}
        </Formik>
      </main>
    </div>
  );
}
