import cx from 'classnames';
import { Formik, FormikProps } from 'formik';
import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import {
  object, ref, string,
} from 'yup';
import styles from './sign-up.module.css';
import SignUpFormData, { Field } from './types';

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
      .min(8, 'A senha deve ter, no mínimo, 8 caracteres')
      .max(30, 'A senha deve ter, no máximo, 30 caracteres')
      .required(REQUIRED_FIELD_ERROR_MESSAGE),
    passwordConfirmation: string().required(REQUIRED_FIELD_ERROR_MESSAGE)
      .oneOf([ref('password')], 'Senha e confirmação são diferentes'),
  });

  const formInitialValues: SignUpFormData = {
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
      labelText: 'Nome de usuário*',
      placeholder: 'fulano_silva',
      type: 'text',
    },
    {
      id: 'password',
      labelText: 'Senha*',
      placeholder: 'super_secret#123',
      type: isPasswordVisible ? 'text' : 'password',
    },
    {
      id: 'passwordConfirmation',
      labelText: 'Confirmar senha*',
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
            values, handleChange, errors, touched, handleBlur, handleSubmit,
          }: FormikProps<SignUpFormData>) => (
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
                  <small
                    className={cx(styles['form__label-error'], {
                      [styles['form__label-error--visible']]: (touched[id] && errors[id]),
                    })}
                  >
                    {errors[id]}
                  </small>
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
  values: SignUpFormData,
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
