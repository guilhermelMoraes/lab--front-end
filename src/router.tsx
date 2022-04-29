import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './sign-up/sign-up';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
