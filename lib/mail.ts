import { Resend } from 'resend';
import { SERVER_URL } from './constants';

const resend = new Resend(process.env.RESEND_API_KEY);

const domain = SERVER_URL;

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${domain}/verify-email?token=${token}`;

  await resend.emails.send({
    from: 'onboarding@resend.dev',
    to: email,
    subject: 'Welcome! Please verify your email address',
    html: `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verification</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; color: #334155;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; padding: 40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1); overflow: hidden; max-width: 600px; width: 100%;">
                  <!-- Header -->
                  <tr>
                    <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                      <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 600; letter-spacing: -0.5px;">
                        Welcome Aboard!
                      </h1>
                      <p style="margin: 8px 0 0 0; color: #e2e8f0; font-size: 16px; opacity: 0.9;">
                        We're excited to have you join us
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Content -->
                  <tr>
                    <td style="padding: 40px 30px;">
                      <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 1.6; color: #475569;">
                        Thank you for creating your account! To get started and ensure the security of your account, 
                        please verify your email address by clicking the button below.
                      </p>
                      
                      <div style="text-align: center; margin: 32px 0;">
                        <a href="${confirmationLink}" 
                           style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                                  color: #ffffff; text-decoration: none; padding: 16px 32px; border-radius: 8px; 
                                  font-weight: 600; font-size: 16px; letter-spacing: 0.025em; 
                                  box-shadow: 0 4px 14px 0 rgba(102, 126, 234, 0.4); 
                                  transition: all 0.2s ease;">
                          Verify Email Address
                        </a>
                      </div>
                      
                      <p style="margin: 32px 0 16px 0; font-size: 14px; line-height: 1.5; color: #64748b;">
                        If the button doesn't work, you can also copy and paste this link into your browser:
                      </p>
                      <p style="margin: 0; padding: 16px; background-color: #f1f5f9; border-radius: 6px; 
                                font-family: 'Courier New', monospace; font-size: 13px; color: #475569; 
                                word-break: break-all; border-left: 3px solid #667eea;">
                        ${confirmationLink}
                      </p>
                      
                      <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
                      
                      <p style="margin: 0; font-size: 14px; line-height: 1.5; color: #64748b;">
                        This verification link will expire in 24 hours for security reasons. If you didn't create 
                        an account with us, please ignore this email.
                      </p>
                    </td>
                  </tr>
                  
                  <!-- Footer -->
                  <tr>
                    <td style="background-color: #f8fafc; padding: 24px 30px; text-align: center; border-top: 1px solid #e2e8f0;">
                      <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                        Need help? Contact our support team at 
                        <a href="mailto:support@hpg.com" style="color: #667eea; text-decoration: none;">
                          support@hpg.com
                        </a>
                      </p>
                      <p style="margin: 8px 0 0 0; font-size: 12px; color: #cbd5e1;">
                        © 2025 HPG reinigungstechnik. All rights reserved.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
};
