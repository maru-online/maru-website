import { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/privacy-policy'),
  title: "Privacy Policy | Maru AI - PAIA Compliant | South Africa",
  description:
    "Review Maru's privacy policy outlining how we collect, use, and protect personal information in line with POPIA and GDPR.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="Your privacy is important to us. This policy explains how we collect, use, and protect your information in compliance with South African law."
      lastUpdated="January 9, 2026"
      effectiveDate="January 9, 2026"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">1. Introduction</h2>
        <p className="text-ink-secondary mb-4">
          Maru (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to protecting your
          privacy and ensuring the security of your personal information. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your information when you visit our website, use our services, or
          interact with us in any way.
        </p>
        <p className="text-ink-secondary">
          This policy complies with the Protection of Personal Information Act
          (POPIA) No. 4 of 2013 and the Promotion of Access to Information Act
          (PAIA) No. 2 of 2000 of South Africa.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          2. POPIA Compliance Principles
        </h2>
        <p className="text-ink-secondary mb-4">
          We process personal information in accordance with the eight conditions
          for lawful processing under POPIA:
        </p>
        <ul className="text-ink-secondary">
          <li>
            <strong className="text-ink-primary">Accountability:</strong> We take
            responsibility for ensuring compliance with POPIA
          </li>
          <li>
            <strong className="text-ink-primary">Processing Limitation:</strong> We
            only process personal information lawfully and reasonably
          </li>
          <li>
            <strong className="text-ink-primary">Purpose Specification:</strong> We
            collect personal information for specific, explicitly defined, and
            lawful purposes
          </li>
          <li>
            <strong className="text-ink-primary">
              Further Processing Limitation:
            </strong>{" "}
            We do not process personal information for purposes other than those
            for which it was collected
          </li>
          <li>
            <strong className="text-ink-primary">Information Quality:</strong> We take
            reasonable steps to ensure personal information is complete, accurate,
            not misleading, and updated
          </li>
          <li>
            <strong className="text-ink-primary">Openness:</strong> We maintain
            documentation of all processing operations and provide information
            about processing
          </li>
          <li>
            <strong className="text-ink-primary">Security Safeguards:</strong> We
            implement appropriate security measures to protect personal information
          </li>
          <li>
            <strong className="text-ink-primary">Data Subject Participation:</strong>{" "}
            We respect your rights to access, correct, and object to processing
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          3. Information We Collect
        </h2>
        <h3 className="text-xl font-medium text-ink-primary mb-4">
          3.1 Personal Information
        </h3>
        <p className="text-ink-secondary mb-4">
          We may collect the following personal information:
        </p>
        <ul className="text-ink-secondary mb-8">
          <li>Name and contact details (email, phone number)</li>
          <li>Company name and job title</li>
          <li>Business information and requirements</li>
          <li>Communication preferences</li>
          <li>Website usage data and analytics</li>
        </ul>

        <h3 className="text-xl font-medium text-ink-primary mb-4">
          3.2 AI Data Processing
        </h3>
        <p className="text-ink-secondary mb-4">
          As an AI Academy and service provider, we process specific data related to artificial intelligence services:
        </p>
        <ul className="text-ink-secondary">
          <li>
            <strong className="text-ink-primary">User Prompts & Inputs:</strong> Text and data you input into our interactive tools, playgrounds, or chatbots are processed to generate responses. These inputs are stored to provide your interaction history.
          </li>
          <li>
            <strong className="text-ink-primary">Third-Party Model Processing:</strong> Our services utilize third-party AI models (e.g., Google Gemini, OpenAI). Your anonymized prompts may be processed by these providers solely for the purpose of generating responses. We do not allow these providers to use your data for training their public models without your explicit consent.
          </li>
          <li>
            <strong className="text-ink-primary">Learning Progress:</strong> We analyze your interactions with our curriculum, including quiz scores and exercise submissions, to tailor your learning experience.
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          4. How We Use Your Information
        </h2>
        <p className="text-ink-secondary mb-4">
          We use your information for the following purposes:
        </p>
        <ul className="text-ink-secondary">
          <li>Providing and improving our AI services</li>
          <li>Communicating with you about our services</li>
          <li>Processing demo requests and inquiries</li>
          <li>Sending newsletters and marketing materials (with consent)</li>
          <li>Analyzing website usage and performance</li>
          <li>Complying with legal obligations</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          5. Automated Decision Making
        </h2>
        <p className="text-ink-secondary mb-4">
          In compliance with Section 71 of POPIA, we inform you that we use automated systems to:
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>Grade multiple-choice quizzes immediately upon submission.</li>
          <li>Award automated badges and certificates based on completion criteria.</li>
          <li>Calculate Exposure Check scores based on form inputs.</li>
        </ul>
        <p className="text-ink-secondary">
          These automated decisions do not have legal or similarly significant effects on you. However, if you believe an automated grading or scoring error has occurred, you have the right to request manual review by contacting our support team.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          6. Your Rights Under POPIA
        </h2>
        <p className="text-ink-secondary mb-4">
          As a data subject under the Protection of Personal Information Act
          (POPIA) No. 4 of 2013, you have the following rights:
        </p>
        <ul className="text-ink-secondary">
          <li>
            <strong className="text-ink-primary">Right of Access (Section 23):</strong>{" "}
            Request access to your personal information that we hold
          </li>
          <li>
            <strong className="text-ink-primary">
              Right of Correction (Section 24):
            </strong>{" "}
            Request correction, deletion, or destruction of inaccurate, irrelevant,
            excessive, out-of-date, incomplete, misleading, or unlawfully obtained
            personal information
          </li>
          <li>
            <strong className="text-ink-primary">
              Right to Object (Section 11(3)):
            </strong>{" "}
            Object to the processing of your personal information on reasonable
            grounds
          </li>
          <li>
            <strong className="text-ink-primary">Right to Withdraw Consent:</strong>{" "}
            Withdraw consent for processing at any time, subject to legal
            obligations
          </li>
          <li>
            <strong className="text-ink-primary">Right to Complain:</strong> Lodge a
            complaint with the Information Regulator if you believe your rights
            have been violated
          </li>
          <li>
            <strong className="text-ink-primary">Right to be Notified:</strong> Be
            notified when personal information is collected and the purpose for
            which it is collected
          </li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          7. PAIA Compliance
        </h2>
        <p className="text-ink-secondary mb-4">
          In accordance with the Promotion of Access to Information Act (PAIA)
          No. 2 of 2000, we maintain a PAIA Manual that provides information
          about:
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>The types of records we hold</li>
          <li>Procedures for requesting access to information</li>
          <li>Contact details for information requests</li>
          <li>Fees and timeframes for processing requests</li>
          <li>Grounds for refusal of access to information</li>
        </ul>
        <p className="text-ink-secondary">
          To request access to information under PAIA, please contact our
          Information Officer at the address provided below. Requests must be
          made in writing and may be subject to prescribed fees.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">8. Data Security</h2>
        <p className="text-ink-secondary mb-4">
          In compliance with POPIA Section 19 (Security Safeguards), we implement
          appropriate technical and organizational security measures to protect
          your personal information against unauthorized access, alteration,
          disclosure, or destruction. These measures include:
        </p>
        <ul className="text-ink-secondary">
          <li>Encryption of personal information in transit and at rest</li>
          <li>Secure servers with regular security updates</li>
          <li>Access controls and authentication mechanisms</li>
          <li>Regular security assessments and audits</li>
          <li>Employee training on data protection</li>
          <li>Incident response procedures</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          9. Contact Information
        </h2>
        <p className="text-ink-secondary mb-4">
          For questions about this Privacy Policy or to exercise your rights,
          please contact us:
        </p>
        <div className="card-lift rounded-lg p-6 text-ink-secondary">
          <p>
            <strong className="text-ink-primary">Information Officer:</strong> Jimmy
            Maru
          </p>
          <p>
            <strong className="text-ink-primary">Email:</strong> privacy@maruonline.com
          </p>
          <p>
            <strong className="text-ink-primary">Phone:</strong> +27(0)83 393 4864
          </p>
          <p>
            <strong className="text-ink-primary">Address:</strong> 247 Ballito Village,
            Ballito, 4420, South Africa
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium text-ink-primary mb-6">
          10. Complaints and Enforcement
        </h2>
        <p className="text-ink-secondary mb-4">
          If you believe we have not handled your personal information in
          accordance with this policy or POPIA, you have the right to:
        </p>
        <ul className="text-ink-secondary mb-6">
          <li>Contact us directly to resolve the issue</li>
          <li>
            Lodge a complaint with the Information Regulator of South Africa
          </li>
          <li>Seek legal recourse through the courts</li>
        </ul>
        <div className="card-lift rounded-lg p-6 text-ink-secondary">
          <p className="font-medium text-ink-primary mb-2">
            Information Regulator Contact Details:
          </p>
          <p>Email: complaints.IR@justice.gov.za</p>
          <p>Website: www.justice.gov.za/inforeg/</p>
          <p>
            Address: 33 Hoofd Street, Forum III, 3rd Floor, Braampark,
            Braamfontein, Johannesburg, 2001
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
