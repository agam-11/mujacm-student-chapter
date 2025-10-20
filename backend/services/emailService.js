import nodemailer from 'nodemailer';

// Build transporter options supporting either service or explicit host/port
const buildTransportOptions = () => {
  // If explicit host is provided, prefer host/port/secure
  if (process.env.SMTP_HOST) {
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const secure = typeof process.env.SMTP_SECURE !== 'undefined' ? process.env.SMTP_SECURE === 'true' : undefined;
    return {
      host: process.env.SMTP_HOST,
      port,
      secure,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    };
  }

  // Otherwise use well-known service name (e.g., 'gmail')
  if (process.env.SMTP_SERVICE) {
    return {
      service: process.env.SMTP_SERVICE,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    };
  }

  // Fallback to nodemailer defaults (will likely error)
  return {
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  };
};

// Create transporter lazily to avoid eager connection attempts during module import
let transporter = null;
const getTransporter = () => {
  if (transporter) return transporter;
  const opts = buildTransportOptions();
  transporter = nodemailer.createTransport(opts);
  return transporter;
};

/**
 * Send email via SMTP
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content
 * @param {string} options.text - Plain text content
 * @returns {Promise}
 */
export const sendEmail = async (options) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    };

  const info = await getTransporter().sendMail(mailOptions);
    console.log('✓ Email sent:', info.response || info.messageId || '(no response)');
    return info;
  } catch (error) {
    console.error('✗ Email error:', error && error.message ? error.message : error);
    throw error;
  }
};

/**
 * Verify email configuration
 */
export const verifyEmailConfig = async () => {
  try {
    // If no explicit SMTP configuration is provided, short-circuit and report not-ready
    if (!process.env.SMTP_HOST && !process.env.SMTP_SERVICE && !process.env.SMTP_EMAIL) {
      console.warn('⚠️ No SMTP configuration found (SMTP_HOST, SMTP_SERVICE or SMTP_EMAIL). Skipping verification.');
      return false;
    }

    await getTransporter().verify();
    console.log('✓ Email service ready');
    return true;
  } catch (error) {
    console.error('✗ Email service error:', error && error.message ? error.message : error);
    return false;
  }
};
