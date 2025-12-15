# reCAPTCHA Keys

## Site Key (Frontend - Public)
```
6Lf4aygsAAAAAKpCGI6f8HVzK3y_vvLIOpEDWSXX
```
✅ This key is safe to use in frontend code.

## Secret Key (Backend - Private)
```
6Lf4aygsAAAAACIt9zRHABWsBHL7V2xR5jCjMtm-
```
⚠️ **NEVER expose this key in frontend code!** Only use in backend API routes.

## Usage

### Frontend (.env.local)
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=6Lf4aygsAAAAAKpCGI6f8HVzK3y_vvLIOpEDWSXX
```

### Backend API Route (when creating /api/vote)
```typescript
const RECAPTCHA_SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY;

// Verify reCAPTCHA token
const response = await fetch(
  `https://www.google.com/recaptcha/api/siteverify?secret=${RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
  { method: 'POST' }
);
const data = await response.json();
if (!data.success) {
  return new Response('Invalid reCAPTCHA', { status: 400 });
}
```

