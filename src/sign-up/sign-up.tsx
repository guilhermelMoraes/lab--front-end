import SignUpForm from './sign-up-form';
import styles from './sign-up.module.css';

export default function SignUp() {
  return (
    <div className={styles['sign-up']}>
      <main className={styles['sign-up__main']}>
        <h1 className={styles['sign-up__title']}>THE LAB 🧪</h1>
        <SignUpForm />
      </main>
    </div>
  );
}
