import dotenv from 'dotenv';
import { sendEmail, verifyEmailConfig } from '../services/emailService.js';

dotenv.config();

const run = async () => {
  console.log('Verifying email config...');
  const ok = await verifyEmailConfig();
  if (!ok) {
    console.error('Email configuration verification failed. Check your SMTP settings in .env');
    process.exit(1);
  }

  try {
    await sendEmail({
      to: process.env.CONTACT_EMAIL_TO || process.env.SMTP_EMAIL,
      subject: 'Test email from MUJ ACM backend',
      text: 'This is a test email sent from the MUJ ACM backend test script.',
      html: '<p>This is a <strong>test</strong> email sent from the MUJ ACM backend test script.</p>'
    });
    console.log('Test email sent successfully');
    process.exit(0);
  } catch (err) {
    console.error('Failed to send test email:', err && err.message ? err.message : err);
    process.exit(1);
  }
};

run();
