import axios from 'axios';
import cx from 'classnames';
import {
  Formik, FormikHelpers, FormikProps, FormikValues,
} from 'formik';
import { useState } from 'react';
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';
import styles from './sign-up.module.css';
import SignUpFormData, { Field } from './types';

const REQUIRED_FIELD_ERROR_MESSAGE: string = 'Campo obrigatório';

export default function SignUpForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

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

  const formInitialValues: SignUpFormData = {
    email: '',
    username: '',
    password: '',
    passwordConfirmation: '',
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

  const onSubmit = async (
    payload: FormikValues,
    { resetForm }: FormikHelpers<SignUpFormData>,
  ): Promise<void> => {
    try {
      const { data } = await axios.post<string>('http://localhost:8000/user/sign-up', payload);
      toast.success(data);
      resetForm();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data as string);
      }
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={onSubmit}
        validationSchema={formValidationSchema}
      >
        {(formikProps: FormikProps<SignUpFormData>) => (
          <form onSubmit={formikProps.handleSubmit}>
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
                      formikProps.handleChange,
                      formikProps.handleBlur,
                      formikProps.values,
                    )}
                    {buttonHideOrShowPassword()}
                  </span>
                ) : (
                  renderInput({
                    id, type, placeholder,
                  }, formikProps.handleChange, formikProps.handleBlur, formikProps.values)
                )}
                <small
                  className={cx(styles['form__label-error'], {
                    [styles['form__label-error--visible']]: (formikProps.touched[id] && formikProps.errors[id]),
                  })}
                >
                  {formikProps.errors[id]}
                </small>
              </label>
            ))}
            <button
              type="submit"
              className={styles['form__submit-button']}
              disabled={!formikProps.isValid || !formikProps.dirty || formikProps.isSubmitting}
            >
              {formikProps.isSubmitting ? 'ENVIANDO' : 'CRIAR'}
            </button>
          </form>
        )}
      </Formik>
      <small>
        *Campos obrigatórios
      </small>
    </>
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
