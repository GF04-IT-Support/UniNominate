"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendApprovalEmail(
  to: string,
  nominatorName: string,
  formUrl: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "KNOMS <onboarding@resend.dev>",
      to: [to],
      subject: "Your Nomination Form Request Has Been Approved",
      html: `
        <h1>Hello ${nominatorName},</h1>
        <p>We're pleased to inform you that your nomination form request has been approved!</p>
        <p>You can now proceed to fill out the nomination form by clicking the link below:</p>
        <p><a href="${formUrl}" style="background-color: #8B0000; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Fill Nomination Form</a></p>
        <p>Please note that this link will expire in 7 days. Make sure to complete your nomination before then.</p>
        <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The Nominations Team</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send approval email");
  }
}

