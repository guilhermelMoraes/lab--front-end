import { Formik, FormikProps } from 'formik';

import styles from './sign-up.module.css';
import SignUpForm from './types';

export default function SignUp() {
  const formInitialValues: SignUpForm = {
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
  };

  const onSubmit = async (): Promise<void> => {
    Promise.resolve();
  };

  return (
    <div className={styles['sign-up']}>
      <Formik
        initialValues={formInitialValues}
        onSubmit={onSubmit}
      >
        {({ values, handleChange }: FormikProps<SignUpForm>) => (
          <form className={styles['sign-up__form']}>
            <label htmlFor="email" className={styles.form__label}>
              <div>E-mail</div>
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
              <div>Username</div>
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
              <div>Password</div>
              <input
                id="password"
                type="password"
                className={styles.form__input}
                onChange={handleChange}
                value={values.password}
                placeholder="#super_secret123"
              />
            </label>

            <label htmlFor="password" className={styles.form__label}>
              <div>Password confirmation</div>
              <input
                id="password"
                type="password"
                className={styles.form__input}
                onChange={handleChange}
                value={values.passwordConfirmation}
                placeholder="#super_secret123"
              />
            </label>
          </form>
        )}
      </Formik>
    </div>
  );
}
