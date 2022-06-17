/* eslint-disable jsx-a11y/label-has-associated-control */
import cx from 'classnames';
import { Formik, FormikHelpers, FormikProps } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';
import style from '../sign-up.module.css';
import LocalSignUpData, { FullName, SubmitNewUserResponse } from '../types';

type SignUpFormData = Omit<LocalSignUpData, 'fullName'> & FullName;

type LocalStrategyProps = {
  submitNewUser(userData: LocalSignUpData): Promise<SubmitNewUserResponse>;
};

export default function LocalStrategy({ submitNewUser }: LocalStrategyProps) {
  const [passwordInputVisible, setPasswordInputVisible] = useState(false);

  const initialValues: SignUpFormData = {
    email: '',
    firstName: '',
    surname: '',
    password: '',
    passwordConfirmation: '',
  };

  const validationSchema = object({
    email: string()
      .required('E-mail is a required property')
      .email("E-mail should follow the pattern 'username@domain.TLD'"),
    firstName: string()
      .required('First name is a required property')
      .matches(/^[a-zA-Z\s]*$/, 'Only letters are allowed for the first name')
      .min(5, 'First name should have at least 5 chars')
      .max(45, 'First name should have max 45 chars'),
    surname: string()
      .required('Surname is a required property')
      .matches(/^[a-zA-Z\s]*$/, 'Only letters are allowed for the surname')
      .min(5, 'Surname should have at least 5 chars')
      .max(45, 'Surname should have max 45 chars'),
    password: string()
      .required('Password is a required property')
      .min(8, 'Password should have at least 8 chars')
      .max(60, 'Surname should have at least 60 chars'),
    passwordConfirmation: string()
      .required('Password confirmation is a required property')
      .min(8, 'Password confirmation should have at least 8 chars')
      .max(60, 'Password confirmation should have at least 60 chars')
      .oneOf([ref('password')], "Confirmation don't match password"),
  });

  const createNewUser = async (
    values: SignUpFormData,
    { setFieldError, resetForm }: FormikHelpers<SignUpFormData>,
  ): Promise<void> => {
    const submissionResponse = await submitNewUser({
      email: values.email,
      fullName: {
        firstName: values.firstName,
        surname: values.surname,
      },
      password: values.password,
      passwordConfirmation: values.passwordConfirmation,
    });

    if (submissionResponse.status === 'ALREADY-EXIST') {
      setFieldError('email', submissionResponse.data);
    }

    if (submissionResponse.status === 'ERROR') {
      toast.error(submissionResponse.data);
    }

    if (submissionResponse.status === 'SUCCESS') {
      toast.success('User successfully created');
      resetForm();
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={createNewUser}
    >
      {({
        values,
        touched,
        errors,
        isValid,
        isSubmitting,
        dirty,
        handleChange,
        handleBlur,
        handleSubmit,
      }: FormikProps<SignUpFormData>) => (
        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              id="e-mail--input"
              name="email"
              type="email"
              className={cx('form-control', {
                'is-invalid': touched.email && errors?.email,
                'is-valid': touched.email && (isValid || dirty),
              })}
              placeholder="john.doe@mail.com"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
              disabled={isSubmitting}
            />
            <label htmlFor="e-mail--input">E-mail</label>
            <small
              className={`${style['sign-up-form__error-message']} text-danger`}
            >
              {touched.email && errors?.email}
            </small>
          </div>

          <div className="input-group justify-content-between mb-3">
            <div
              className={`${style['sign-up-form__input--stretch']} form-floating`}
            >
              <input
                id="first-name--input"
                name="firstName"
                type="text"
                className={cx('form-control', {
                  'is-invalid': touched.firstName && errors?.firstName,
                  'is-valid': touched.firstName && (isValid || dirty),
                })}
                placeholder="John"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.firstName}
                disabled={isSubmitting}
              />
              <label htmlFor="first-name--input">First name</label>
              <small
                className={`${style['sign-up-form__error-message']} text-danger`}
              >
                {touched.firstName && errors?.firstName}
              </small>
            </div>

            <div
              className={`${style['sign-up-form__input--stretch']} form-floating`}
            >
              <input
                id="surname--input"
                name="surname"
                type="text"
                className={cx('form-control', {
                  'is-invalid': touched.surname && errors?.surname,
                  'is-valid': touched.surname && (isValid || dirty),
                })}
                placeholder="Doe Johnson"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.surname}
                disabled={isSubmitting}
              />
              <label htmlFor="surname--input">Surname</label>
              <small
                className={`${style['sign-up-form__error-message']} text-danger`}
              >
                {touched.surname && errors?.surname}
              </small>
            </div>
          </div>

          <div className="form-floating mb-3">
            <input
              id="password--input"
              name="password"
              type={passwordInputVisible ? 'text' : 'password'}
              className={cx('form-control', {
                'is-invalid': touched.password && errors?.password,
                'is-valid': touched.password && (isValid || dirty),
              })}
              placeholder="secret_123#"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              disabled={isSubmitting}
            />
            <label htmlFor="password--input">Password</label>
            <small
              className={`${style['sign-up-form__error-message']} text-danger`}
            >
              {touched.password && errors?.password}
            </small>
          </div>

          <div className="form-floating mb-3">
            <input
              id="password-confirmation--input"
              name="passwordConfirmation"
              type={passwordInputVisible ? 'text' : 'password'}
              className={cx('form-control', {
                'is-invalid':
                  touched.passwordConfirmation && errors?.passwordConfirmation,
                'is-valid': touched.passwordConfirmation && (isValid || dirty),
              })}
              placeholder="secret_123#"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.passwordConfirmation}
              disabled={isSubmitting}
            />
            <label htmlFor="password-confirmation--input">
              Password confirmation
            </label>
            <small
              className={`${style['sign-up-form__error-message']} text-danger`}
            >
              {touched.passwordConfirmation && errors?.passwordConfirmation}
            </small>
          </div>

          <div className="form-check form-switch mb-3">
            <input
              className="form-check-input"
              type="checkbox"
              role="switch"
              id="set-password-visible"
              checked={passwordInputVisible}
              onChange={() => setPasswordInputVisible(!passwordInputVisible)}
              disabled={isSubmitting}
            />
            <label className="form-check-label" htmlFor="set-password-visible">
              {passwordInputVisible ? 'Hide ' : 'Show '}
              password
            </label>
          </div>

          <button
            type="submit"
            className={`${style['sign-up__submit-button']} btn btn-primary btn-lg`}
            disabled={!isValid || !dirty || isSubmitting}
          >
            {isSubmitting ? (
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              'Submit'
            )}
          </button>
        </form>
      )}
    </Formik>
  );
}
