import testTube from './assets/images/emoji-2.png';
import GoogleStrategy from './google-strategy';
import LocalStrategy from './local-strategy';
import styles from './sign-up.module.css';

export default function SignUp() {
  return (
    <div className={styles['sign-up']}>
      <main className={`${styles['sign-up__form-wrapper']} container bg-body rounded shadow-lg p-3 m-sm-3`}>
        <header className="d-flex align-items-center justify-content-center mb-4">
          <h1 className="mb-0 me-2">THE LAB</h1>
          <img src={testTube} alt="" className={styles['sign-up__title-logo']} />
        </header>
        <LocalStrategy />
        <hr />
        <GoogleStrategy />
      </main>
    </div>
  );
}
