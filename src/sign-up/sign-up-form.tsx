import cx from 'classnames';
import {
  Formik, FormikHelpers, FormikProps, FormikValues,
} from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { object, ref, string } from 'yup';
import SignUpService from './sign-up.service';
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
      labelText: 'E-mail',
      placeholder: 'fulano@mail.com',
      type: 'email',
    },
    {
      id: 'username',
      labelText: 'Nome de usuário',
      placeholder: 'Fulano Silva',
      type: 'text',
    },
    {
      id: 'password',
      labelText: 'Senha',
      placeholder: 'super_secret#123',
      type: isPasswordVisible ? 'text' : 'password',
    },
    {
      id: 'passwordConfirmation',
      labelText: 'Confirmar senha',
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

  const createNewUser = async (
    payload: FormikValues,
    { resetForm }: FormikHelpers<SignUpFormData>,
  ): Promise<void> => {
    const creationResponse = await SignUpService.submitNewUser(payload as SignUpFormData);
    switch (creationResponse.status) {
      case 'SUCCESS':
        toast.success(creationResponse.data as string);
        resetForm();
        break;
      case 'ALREADY-EXIST':
        toast.warn(creationResponse.data as string);
        break;
      case 'ERROR':
        toast.error(creationResponse.data as string);
        break;
    }
  };

  return (
    <>
      <Formik
        initialValues={formInitialValues}
        onSubmit={createNewUser}
        validationSchema={formValidationSchema}
      >
        {(formikProps: FormikProps<SignUpFormData>) => (
          <form onSubmit={formikProps.handleSubmit}>
            {fields.map(({
              id, labelText, placeholder, type,
            }: Field) => (
              <div className="form-floating mb-3" key={id}>
                <input
                  type={type}
                  id={id}
                  className={cx('form-control', {
                    'is-invalid': (formikProps.touched[id] && formikProps.errors[id]),
                    'is-valid': (formikProps.touched[id] && (formikProps.isValid || formikProps.dirty)),
                  })}
                  placeholder={placeholder}
                  value={formikProps.values[id]}
                  onChange={formikProps.handleChange}
                  onBlur={formikProps.handleBlur}
                />
                <label htmlFor={id}>{labelText}</label>
                <small
                  className={cx('text-danger', [styles['form__error-message']], {
                    [styles['form__error-message--visible']]: formikProps.errors[id] && formikProps.touched[id],
                  })}
                >
                  {formikProps.errors[id]}
                </small>
              </div>
            ))}

            <div className="form-check form-switch mb-3">
              <input
                className="form-check-input"
                type="checkbox"
                id="is-password-visible"
                checked={isPasswordVisible}
                onChange={() => setIsPasswordVisible(!isPasswordVisible)}
              />
              <label className="form-check-label" htmlFor="is-password-visible">
                {isPasswordVisible ? 'Ocultar ' : 'Mostrar '}
                senha
              </label>
            </div>

            <button
              type="submit"
              className={`btn btn-primary fw-bold ${styles['form__submit-button']}`}
              disabled={!formikProps.isValid || !formikProps.dirty || formikProps.isSubmitting}
            >
              {formikProps.isSubmitting ? <div className="spinner-border" role="status" /> : 'CRIAR'}
            </button>
          </form>
        )}
      </Formik>
      <small>
        Todos os campos são obrigatórios
      </small>
    </>
  );
}
