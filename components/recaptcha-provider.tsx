"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

// reCAPTCHA v3 Site Key
// For production, move this to .env.local: NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lf4aygsAAAAAKpCGI6f8HVzK3y_vvLIOpEDWSXX
const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || "6Lf4aygsAAAAAKpCGI6f8HVzK3y_vvLIOpEDWSXX";

export function ReCaptchaProvider({ children }: { children: React.ReactNode }) {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={RECAPTCHA_SITE_KEY}
      scriptProps={{
        async: false,
        defer: false,
        appendTo: "head",
        nonce: undefined,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}

