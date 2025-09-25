# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Admin email notifications (contact form)

Set these environment variables to enable emailing the site admin when a user submits the contact form. If any are missing, the app will still save the message to Firestore but will skip sending email.

- SENDGRID_API_KEY: API key from SendGrid.
- ADMIN_EMAIL: Email address that should receive contact messages.
- FROM_EMAIL: Verified sender address in SendGrid (defaults to ADMIN_EMAIL if not set).

For local development, create `.env.local` in the project root:

```bash
SENDGRID_API_KEY=SG.xxxxxx
ADMIN_EMAIL=admin@example.com
FROM_EMAIL=no-reply@example.com
```