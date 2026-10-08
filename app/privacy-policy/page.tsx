import { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/privacy-policy'),
  title: "Privacy Policy | Maru Online",
  description:
    "How Maru Online collects, uses and protects personal information, with POPIA in mind.",
};

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout
      title="Privacy Policy"
      description="What personal information we collect through this website, why, who receives it, and your rights."
      lastUpdated="October 8, 2026"
      effectiveDate="October 12, 2026"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">1. Who we are</h2>
        <p className="text-ink-secondary mb-4">
          Maru Online (Pty) Ltd (registration number 2002/013801/07) is a South African company based in Gauteng. We are the responsible party for the personal information described in this policy. We are registered with the Information Regulator, and our Information Officer is named in section 10.
        </p>
        <p className="text-ink-secondary mb-4">
          This policy explains what personal information we collect through maruonline.com, why, who receives it, where it may be processed, and how long we keep it. We build with POPIA in mind. This policy is general information about our own practices and is not legal advice.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">2. What we collect and why</h2>
        <p className="text-ink-secondary mb-4">
          We collect only what each form or tool needs.
        </p>
        <ul className="text-ink-secondary mb-4">
          <li><strong className="text-ink-primary">Exposure Check.</strong> Your name, email address, business name, your website address if you give one, and your answers to the questions. We use these to calculate your result, show you your report and email you the link, and to prepare for a conversation with you if you ask for a proposal. There is an optional, unticked box if you also want to hear from us by email; ticking it is never needed to get your report.</li>
          <li><strong className="text-ink-primary">Contact form (request a proposal).</strong> Your name, business name, email address, optional WhatsApp number, the service you are interested in, what you tell us about your needs, and how you heard about us. We use these to reply to you and prepare a proposal.</li>
          <li><strong className="text-ink-primary">The Business AI Journal.</strong> Your email address and, if you give it, your first name, to send you the newsletter. You can unsubscribe at any time.</li>
          <li><strong className="text-ink-primary">Guide request.</strong> Your first name, email address and, optionally, company name, so we can send you our guide. A separate, unticked box lets you ask for our notes; the guide does not depend on it. We also record the wording you saw and the time, so we can show what you agreed to.</li>
          <li><strong className="text-ink-primary">WhatsApp and email.</strong> If you message us on WhatsApp or by email, we receive your number or address and what you write.</li>
          <li><strong className="text-ink-primary">Website use.</strong> Technical information such as your IP address, browser and the pages you visit. Analytics and advertising cookies collect more (see our Cookie Policy). Our forms are protected by Google reCAPTCHA, which checks that a visitor is a person.</li>
        </ul>
        <p className="text-ink-secondary mb-4">
          We do not sell personal information. We do not ask for, or need, your clients&apos; personal information to scope a build.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">3. Automated reports and AI</h2>
        <p className="text-ink-secondary mb-4">
          Your Exposure Check result and report are produced automatically from your answers, using fixed rules that score each area. The report is a general operational indicator. It is not legal advice and not a POPIA audit, and it has no legal or similarly significant effect on you. If you think it is wrong, tell us and we will review it and correct it.
        </p>
        <p className="text-ink-secondary mb-4">
          We also use an AI model, provided by Anthropic, to help us prepare internal notes from your answers. Those notes are for our preparation and are not shown to you as a decision about you. Anthropic processes this information in the United States. We do not send Anthropic your name, email address or website.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">4. Who receives your information</h2>
        <p className="text-ink-secondary mb-4">
          We use the following providers to run the site. Each processes personal information for us, under its own data-processing terms, and not for its own purposes, except where stated.
        </p>
        <ul className="text-ink-secondary mb-4">
          <li><strong className="text-ink-primary">Vercel</strong> hosts the website and keeps server logs, in the United States.</li>
          <li><strong className="text-ink-primary">Neon</strong> hosts the database that holds Exposure Check results, reports and guide requests, in London, United Kingdom.</li>
          <li><strong className="text-ink-primary">Brevo</strong> sends our emails (reports, replies, the newsletter and the guide) and holds contact records. Brevo stores data in the European Union (France, Germany and Belgium) and may also process it elsewhere, including the United States and India.</li>
          <li><strong className="text-ink-primary">Anthropic</strong> as described in section 3.</li>
          <li><strong className="text-ink-primary">Google</strong> provides reCAPTCHA and Google Analytics. Google acts for its own purposes for analytics cookies.</li>
          <li><strong className="text-ink-primary">Meta</strong> provides the Meta Pixel for measuring our advertising, and acts for its own purposes under its own terms. Meta also provides WhatsApp. If you message us on WhatsApp, Meta handles the messages and related information, such as your number, under WhatsApp&apos;s own terms and privacy policy and not on our behalf, and may process them outside South Africa. If you would rather not use WhatsApp, email us instead.</li>
        </ul>
        <p className="text-ink-secondary mb-4">
          Where information goes outside South Africa, we rely on the safeguards that section 72 of POPIA allows, such as the provider's data-processing terms and transfer safeguards, which should give protection equivalent to POPIA. We may also share information where the law requires it.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">5. How long we keep it</h2>
        <p className="text-ink-secondary mb-4">
          We keep personal information only as long as we need it for the reason we collected it, and then delete it or de-identify it.
        </p>
        <ul className="text-ink-secondary mb-4">
          <li><strong className="text-ink-primary">Guide requests</strong> are deleted after 12 months unless you confirmed you want our notes, have become a client, or have used the Exposure Check. If you confirmed the notes, we keep your details until you unsubscribe.</li>
          <li><strong className="text-ink-primary">Exposure Check results and reports</strong> are kept for 12 months after you submit your answers and are then deleted, unless you have become a client or you have asked us to keep them. When they are deleted, your report link stops working.</li>
          <li><strong className="text-ink-primary">Enquiries and proposals</strong> are kept only while we need them to reply to you or prepare a proposal. We review them at least once a year and delete or de-identify those we no longer need, unless you have become a client.</li>
          <li><strong className="text-ink-primary">Client records</strong> are kept for as long as the law requires us to keep them, and then deleted.</li>
          <li><strong className="text-ink-primary">On request,</strong> we delete your personal information sooner, unless the law requires us to keep it.</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">6. Marketing</h2>
        <p className="text-ink-secondary mb-4">
          We send marketing email only if you have asked for it, for example by ticking an unticked box or subscribing to the newsletter. A report, a guide or an enquiry reply is not marketing. Every marketing email has an unsubscribe link, and you can also write to us to stop.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">7. Cookies</h2>
        <p className="text-ink-secondary mb-4">
          Our Cookie Policy explains the cookies we use and how to change your choice at any time with Cookie Preferences.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">8. How we protect it</h2>
        <p className="text-ink-secondary mb-4">
          We use reasonable technical and organisational measures to protect personal information against loss, damage and unauthorised access. We limit who can see it, and we use providers that apply their own security controls. No system is perfectly secure. If a breach affects your information we will tell you and the Information Regulator as POPIA requires.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">9. Your rights</h2>
        <p className="text-ink-secondary mb-4">
          Under POPIA you can ask us to confirm whether we hold personal information about you and to give you a copy; ask us to correct or delete it; object to our processing of it; and withdraw consent you have given, which does not affect what we did before. To exercise a right, email hello@maruonline.com. We may need to confirm who you are first.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">10. Information Officer and contact</h2>
        <p className="text-ink-secondary mb-4">
          Our Information Officer is Jimmy Motsei, registered with the Information Regulator.
        </p>
        <div className="card-lift rounded-lg p-6 text-ink-secondary mb-4">
          <p><strong className="text-ink-primary">Email:</strong> hello@maruonline.com</p>
          <p><strong className="text-ink-primary">Location:</strong> Gauteng, South Africa</p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-medium text-ink-primary mb-6">11. Complaints</h2>
        <p className="text-ink-secondary mb-4">
          Please contact us first so we can try to put things right. You also have the right to complain to the Information Regulator of South Africa.
        </p>
        <div className="card-lift rounded-lg p-6 text-ink-secondary">
          <p className="font-medium text-ink-primary mb-2">Information Regulator:</p>
          <p>Website: inforegulator.org.za</p>
        </div>
      </section>
    </LegalLayout>
  );
}
