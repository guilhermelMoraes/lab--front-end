import SignUpForm from './sign-up-form';
import styles from './sign-up.module.css';

export default function SignUp() {
  return (
    <div className={styles['sign-up']}>
      <main className={`${styles['sign-up__form-wrapper']} container bg-body rounded shadow-lg p-3`}>
        <h1 className="text-center mb-4">THE LAB 🧪</h1>
        <SignUpForm />
      </main>
    </div>
  );
}
