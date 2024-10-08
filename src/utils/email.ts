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

export async function sendNominationAcceptedEmail(
  to: string,
  nominatorName: string,
  comment: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "KNOMS <onboarding@resend.dev>",
      to: [to],
      subject: "Your Nomination Has Been Accepted",
      html: `
        <h1>Congratulations ${nominatorName}!</h1>
        <p>We're pleased to inform you that your nomination has been accepted!</p>
        <p>This is an important milestone in the nomination process. We appreciate your participation and look forward to the next steps.</p>
        <p>Review Comment: <p style="font-weight: bold; color: gray; font-style: italic;">${comment}</p></p>
        <p>If you have any questions or need further information, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The Nominations Team</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send nomination accepted email");
  }
}

export async function sendNominationRejectedEmail(
  to: string,
  nominatorName: string,
  comment: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "KNOMS <onboarding@resend.dev>",
      to: [to],
      subject: "Update on Your Nomination",
      html: `
        <h1>Dear ${nominatorName},</h1>
        <p>We regret to inform you that your nomination has not been accepted at this time.</p>
        <p>We appreciate your participation in the nomination process and encourage you to consider future opportunities.</p>
        <p>Review Comment: <p style="font-weight: bold; color: gray; font-style: italic;">${comment}</p></p>
        <p>If you have any questions or would like feedback, please don't hesitate to contact us.</p>
        <p>Thank you for your understanding.</p>
        <p>Best regards,<br>The Nominations Team</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Failed to send email:", error);
    throw new Error("Failed to send nomination rejected email");
  }
}

export async function sendAdminCredentialsEmail(
  to: string,
  adminName: string,
  password: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "KNOMS <onboarding@resend.dev>",
      to: ["isinesam@gmail.com"],
      subject: "Your KNOMS Admin Account Credentials",
      html: `
        <h1>Welcome to KNOMS, ${adminName}!</h1>
        <p>Your admin account has been created. Here are your login credentials:</p>
        <p><strong>Email:</strong> ${to}</p>
        <p><strong>Password:</strong> ${password}</p>
        <p>Please log in and change your password immediately.</p>
        <p>If you have any questions, please contact the system administrator.</p>
        <p>Best regards,<br>The KNOMS Team</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Failed to send admin credentials email:", error);
    throw new Error("Failed to send admin credentials email");
  }
}

export async function sendEnquiryEmail(
  name: string,
  email: string,
  subject: string,
  message: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "KNOMS <onboarding@resend.dev>",
      to: ["isinesam@gmail.com"],
      subject: `New Enquiry: ${subject}`,
      html: `
        <h1>New Enquiry from KNOMS Contact Form</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <h2>Message:</h2>
        <p>${message}</p>
        <hr>
        <p>This enquiry was sent from the KNOMS contact form. Please respond to the user's email address provided above.</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (error) {
    console.error("Failed to send enquiry email:", error);
    throw new Error("Failed to send enquiry email");
  }
}
