import nodemailer from 'nodemailer';
import { Influencer, Company } from '@shared/schema';

// Create a transporter using the provided email credentials
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

// Email for influencer form submissions
export async function sendInfluencerFormEmail(influencer: Influencer) {
  const emailContent = `
    <h2>New Influencer Application</h2>
    <p><strong>Full Name:</strong> ${influencer.fullName}</p>
    <p><strong>Email:</strong> ${influencer.email}</p>
    <p><strong>Social Handles:</strong> ${influencer.socialHandles}</p>
    <p><strong>Primary Platform:</strong> ${influencer.primaryPlatform}</p>
    <p><strong>Follower Count:</strong> ${influencer.followerCount}</p>
    <p><strong>Content Niche:</strong> ${influencer.contentNiche}</p>
    <p><strong>Additional Information:</strong> ${influencer.additionalInfo || 'None provided'}</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'blackstorm930@gmail.com',
    subject: `YURALINK - New Influencer Application: ${influencer.fullName}`,
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Influencer application email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending influencer application email:', error);
    return false;
  }
}

// Email for company form submissions
export async function sendCompanyFormEmail(company: Company) {
  const emailContent = `
    <h2>New Company Campaign Inquiry</h2>
    <p><strong>Company Name:</strong> ${company.companyName}</p>
    <p><strong>Contact Person:</strong> ${company.contactPerson}</p>
    <p><strong>Email:</strong> ${company.email}</p>
    <p><strong>Campaign Goal:</strong> ${company.campaignGoal}</p>
    <p><strong>Campaign Budget:</strong> ${company.campaignBudget}</p>
    <p><strong>Preferred Platforms:</strong> ${company.preferredPlatforms}</p>
    <p><strong>Additional Notes:</strong> ${company.additionalNotes || 'None provided'}</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'blackstorm930@gmail.com',
    subject: `YURALINK - New Campaign Inquiry: ${company.companyName}`,
    html: emailContent,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Company inquiry email sent successfully');
    return true;
  } catch (error) {
    console.error('Error sending company inquiry email:', error);
    return false;
  }
}