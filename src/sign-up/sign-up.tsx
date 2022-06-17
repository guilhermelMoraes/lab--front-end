import styles from './sign-up.module.css';
import SignUpService from './sign-up.service';
import LocalStrategy from './strategies/local-strategy';
import LocalSignUpData, { SubmitNewUserResponse } from './types';

export default function SignUp() {
  const submitNewUser = async (
    userData: LocalSignUpData,
  ): Promise<SubmitNewUserResponse> => SignUpService.submitNewUser(userData);

  return (
    <div className={styles['sign-up']}>
      <main
        className={`${styles['sign-up__form-wrapper']} container bg-body rounded shadow-lg p-3 m-sm-3`}
      >
        <header className="d-flex align-items-center justify-content-center mb-4">
          <h1 className="mb-0 me-2">THE LAB</h1>
        </header>
        <LocalStrategy submitNewUser={submitNewUser} />
      </main>
    </div>
  );
}
