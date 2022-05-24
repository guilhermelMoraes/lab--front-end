import { useEffect, useRef } from 'react';

export default function GoogleStrategy() {
  const googleAuthButtonWrapper = useRef(null);

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
        callback: (credentialResponse) => console.log(credentialResponse.credential),
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
