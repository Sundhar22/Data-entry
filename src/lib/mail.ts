// lib/mail.ts
import nodemailer from "nodemailer";

export async function sendResetEmail(to: string, link: string) {
  const transporter = nodemailer.createTransport({
    service: "gmail", // or use SMTP config
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Support" <support@commissioner.com>',
    to,
    subject: "Reset Your Password",
    html: `<p>Click below to reset your password:</p><a href="${link}">${link}</a>`,
  });
  
}
