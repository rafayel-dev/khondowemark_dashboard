export type LegalDocument = { title: string; lastUpdated: string; content: string }

export const termsDocument: LegalDocument = {
  title: 'Terms & Conditions',
  lastUpdated: '16 August 2026',
  content: `
    <p>By accessing or using Nchito, you agree to comply with and be bound by these Terms & Conditions. These Terms govern your access to the platform, including the website, mobile application, service tools, training resources, and related services provided through Nchito.</p>
    <p><strong>Acceptance of Terms</strong></p>
    <p>By creating an account, requesting services, offering services, booking a provider, or using any feature of Nchito, you confirm that you have read, understood, and accepted these Terms. If you do not agree with any part of these Terms, you should stop using the platform immediately.</p>
    <p><strong>Platform Purpose</strong></p>
    <p>Nchito is designed to connect customers with local service providers. Customers can discover and book services, while providers can offer their skills and manage service bookings through the platform.</p>
    <p><strong>User Accounts</strong></p>
    <p>Users are responsible for keeping their account information accurate and maintaining the security of their login credentials. All information provided during registration must be truthful and up to date.</p>
    <p>Nchito reserves the right to suspend or restrict accounts that contain misleading information or violate platform policies.</p>
    <p><strong>Services & Bookings</strong></p>
    <p>Providers are responsible for providing accurate service details, pricing, availability, and fulfilling accepted bookings as agreed with customers.</p>
    <p><strong>Payments</strong></p>
    <p>Payments are processed through the supported payment methods available on Nchito. Applicable platform fees may apply to bookings.</p>
    <p><strong>Cancellations</strong></p>
    <p>Cancellation terms may vary based on the provider's cancellation settings and the applicable booking conditions.</p>
    <p><strong>Issues & Disputes</strong></p>
    <p>Customers can report issues with completed services through the platform. Nchito may review the issue and determine an appropriate resolution.</p>
    <p><strong>User Conduct</strong></p>
    <p>Users agree not to engage in fraudulent activity, provide misleading information, misuse the platform, or engage in harmful or unauthorized activities.</p>
    <p><strong>Reviews & Ratings</strong></p>
    <p>Users may leave honest reviews and ratings based on their actual service experiences.</p>
    <p><strong>Account Restriction</strong></p>
    <p>Nchito may restrict or suspend accounts that violate platform rules or misuse the service.</p>
    <p><strong>Changes to Terms</strong></p>
    <p>These Terms & Conditions may be updated periodically. Continued use of the platform after updates indicates acceptance of the revised Terms.</p>
    <p><strong>Contact</strong></p>
    <p>For questions regarding these Terms & Conditions, please contact Nchito Support.</p>
  `.trim(),
}

export const privacyDocument: LegalDocument = {
  title: 'Privacy Policy',
  lastUpdated: '16 August 2026',
  content: `
    <p>This Privacy Policy explains how Nchito collects, uses, and protects the personal information of customers, providers, and admins who use our website, mobile application, and related services.</p>
    <p><strong>Information We Collect</strong></p>
    <p>We collect information you provide directly, such as your name, email, phone number, and payment details, as well as information generated through your use of the platform, like booking history and location data.</p>
    <p><strong>How We Use Your Information</strong></p>
    <p>Your information is used to create and manage accounts, process bookings and payments, connect customers with providers, and improve the safety and quality of the platform.</p>
    <p><strong>Information Sharing</strong></p>
    <p>We share the minimum information necessary between customers and providers to complete a booking. We do not sell personal information to third parties.</p>
    <p><strong>Data Security</strong></p>
    <p>Nchito uses reasonable administrative and technical safeguards to protect user data from unauthorized access, alteration, or disclosure.</p>
    <p><strong>Cookies & Tracking</strong></p>
    <p>The platform may use cookies and similar technologies to keep users signed in, remember preferences, and understand how the platform is used.</p>
    <p><strong>Your Rights</strong></p>
    <p>Users may request access to, correction of, or deletion of their personal information by contacting Nchito Support.</p>
    <p><strong>Children's Privacy</strong></p>
    <p>Nchito is not intended for use by individuals under the age of 18, and we do not knowingly collect information from minors.</p>
    <p><strong>Changes to This Policy</strong></p>
    <p>This Privacy Policy may be updated periodically. Continued use of the platform after updates indicates acceptance of the revised policy.</p>
    <p><strong>Contact</strong></p>
    <p>For questions regarding this Privacy Policy, please contact Nchito Support.</p>
  `.trim(),
}
