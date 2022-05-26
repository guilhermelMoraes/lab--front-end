import { useEffect, useRef } from 'react';
import SignUpFormData, { SubmitNewUserResponse } from '../types';

type GoogleStrategyProps = {
  submitNewUser(userData: SignUpFormData): Promise<SubmitNewUserResponse>
};

export default function GoogleStrategy({ submitNewUser }: GoogleStrategyProps) {
  const googleAuthButtonWrapper = useRef(null);

  const parseJwt = (token: string): void => {
    const base64Url: string = token.split('.')[1];
    const base64: string = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      Buffer.from(base64, 'base64')
        .toString()
        .split('')
        .map((c: string): string => {
          const opa: string = `00${c.charCodeAt(0).toString(16)}`;
          return `%${opa.slice(-2)}`;
        })
        .join(''),
    );

    console.log(JSON.parse(jsonPayload));
  };

  useEffect(() => {
    function createGoogleSignInScript(): void {
      const script = document.createElement('script');

      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;

      document.body.appendChild(script);
    }

    function setupGoogleAuth(): void {
      window.google.accounts.id.initialize({
        client_id: process.env.REACT_APP_GCP_OAUTH2_CLIENT_ID as string,
        callback: (credentialResponse) => parseJwt(credentialResponse.credential),
      });

      if (googleAuthButtonWrapper.current) {
        const { current } = googleAuthButtonWrapper;

        google.accounts.id.renderButton(current, {
          type: 'standard', size: 'large',
        });
      }
    }

    createGoogleSignInScript();

    window.addEventListener('load', setupGoogleAuth);

    return () => window.removeEventListener('load', setupGoogleAuth);
  });

  return (
    <div
      className="d-flex justify-content-center"
      ref={googleAuthButtonWrapper}
    />
  );
}
