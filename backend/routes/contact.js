import express from 'express';
import { sendEmail } from '../services/emailService.js';

const router = express.Router();

/**
 * POST /api/contact
 * Handle contact form submissions
 */
router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Validation
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        error: 'Missing required fields',
        required: ['name', 'email', 'subject', 'message']
      });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        error: 'Invalid email format'
      });
    }

    // Send email to admin
    const adminEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap; color: #555;">${message}</p>
          <p style="margin-top: 20px; font-size: 12px; color: #999;">
            Submitted at: ${new Date().toLocaleString()}
          </p>
        </div>
      </div>
    `;

    const adminEmailText = `
New Contact Form Submission

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Submitted at: ${new Date().toLocaleString()}
    `;

    await sendEmail({
      to: process.env.CONTACT_EMAIL_TO,
      subject: `New Contact: ${subject}`,
      html: adminEmailHtml,
      text: adminEmailText
    });

    // Optional: Send confirmation email to user
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #333;">We received your message</h2>
        <p>Hi ${name},</p>
        <p>Thank you for reaching out to MUJ ACM Student Chapter. We have received your message and will get back to you as soon as possible.</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 5px; margin-top: 20px;">
          <p><strong>Your message:</strong></p>
          <p style="color: #555;">${subject}</p>
        </div>
        <p style="margin-top: 20px; color: #666;">Best regards,<br>MUJ ACM Student Chapter</p>
      </div>
    `;

    const userEmailText = `
Hi ${name},

Thank you for reaching out to MUJ ACM Student Chapter. We have received your message and will get back to you as soon as possible.

Your subject: ${subject}

Best regards,
MUJ ACM Student Chapter
    `;

    await sendEmail({
      to: email,
      subject: 'We received your message - MUJ ACM',
      html: userEmailHtml,
      text: userEmailText
    });

    res.status(200).json({
      success: true,
      message: 'Contact form submitted successfully. Check your email for confirmation.'
    });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      error: 'Failed to submit contact form',
      message: error.message
    });
  }
});

export default router;
