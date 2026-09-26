import { Metadata } from 'next';
import { LegalLayout } from "@/components/layout/LegalLayout";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/terms-conditions'),
  title: 'Terms and Conditions | Maru AI',
  description: 'Terms and conditions for Maru Online AI automation services.',
};

export default function TermsConditionsPage() {
  return (
    <LegalLayout
      title="Terms and Conditions"
      description="Terms and conditions for Maru Online AI automation services. These terms govern our relationship with clients and users."
      lastUpdated="January 9, 2026"
      effectiveDate="January 9, 2026"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">1. Agreement to Terms</h2>
        <p className="text-ink-secondary mb-4">
          By engaging Maru Online (&quot;we,&quot; &quot;us,&quot; &quot;our&quot;) for AI automation, marketing, or consulting services, you (&quot;client,&quot; &quot;you&quot;) agree to be bound by these Terms and Conditions. If you do not agree, do not proceed with our services.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">2. Services Offered</h2>
        <p className="text-ink-secondary mb-4">
          We provide AI-powered automation solutions, including but not limited to:
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>Lead generation and AI lead scoring systems</li>
          <li>Sales automation and CRM integration</li>
          <li>Office operations automation and workflow optimization</li>
          <li>Multi-channel follow-up automation (email, SMS, WhatsApp)</li>
          <li>Custom AI integrations and bespoke enterprise solutions</li>
        </ul>
        <p className="text-ink-secondary">
          All services are delivered as specified in your project proposal or service agreement. Scope, deliverables, and timelines are confirmed before project commencement.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">3. Pricing and Payment</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-ink-primary font-bold mb-3">Standard Packages:</h3>
            <ul className="text-ink-secondary">
              <li><strong className="text-ink-primary">Starter Package:</strong> R4,999 — Basic automation for small businesses</li>
              <li><strong className="text-ink-primary">Growth Package:</strong> R9,999 — Advanced CRM integration and marketing sequences</li>
              <li><strong className="text-ink-primary">Enterprise Solution:</strong> Custom pricing — Bespoke systems with dedicated support</li>
            </ul>
          </div>
          
          <p className="text-ink-secondary">
            <strong className="text-ink-primary">Custom Projects:</strong> Project fees range from R25,000 for single workflow automation to R200,000+ for comprehensive sales and marketing systems. All pricing is provided in fixed-price quotes following your POPIA-Safe AI Audit.
          </p>

          <div>
            <h3 className="text-ink-primary font-bold mb-3">Payment Terms:</h3>
            <ul className="text-ink-secondary">
              <li>50% deposit required upfront to commence work</li>
              <li>Remaining 50% due upon project completion or go-live</li>
              <li>Monthly retainers billed in advance for ongoing support packages</li>
              <li>Payment accepted via EFT, credit card, or approved payment plan</li>
            </ul>
          </div>

          <p className="text-ink-secondary">
            Late payments may incur a 2% monthly interest charge. Projects may be paused if payment is overdue by more than 14 days.
          </p>

          <div className="card-lift p-6 rounded-lg">
            <h3 className="text-ink-primary font-bold mb-3">Refunds for Digital Courses (Maru AI Academy):</h3>
            <p className="text-ink-secondary text-sm">
              We offer a 7-day money-back guarantee on all digital courses, provided you have not completed more than 20% of the course content and have not generated a certificate. Once more than 20% of the content is accessed or a certificate is claimed, the product is considered &quot;consumed&quot; and is non-refundable.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">4. Project Timeline and Delivery</h2>
        <p className="text-ink-secondary mb-4">
          We deliver pilot projects within 2-4 weeks of project kickoff. Full implementations depend on scope and complexity, with timelines confirmed in your project proposal.
        </p>
        <p className="text-ink-secondary">
          Delays caused by unavailability of client resources, late feedback, or scope changes may extend delivery timelines. We will notify you promptly of any anticipated delays.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">5. Client Responsibilities</h2>
        <p className="text-ink-secondary mb-4">
          To ensure successful project delivery, you agree to:
        </p>
        <ul className="text-ink-secondary">
          <li>Provide timely access to necessary systems, credentials, and data</li>
          <li>Respond to requests for feedback within 5 business days</li>
          <li>Designate a primary point of contact for project communications</li>
          <li>Ensure your team attends scheduled training sessions</li>
          <li>Review and approve deliverables within agreed timeframes</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">6. Data Protection and Compliance</h2>
        <p className="text-ink-secondary mb-4">
          We are committed to protecting your data. We design every system we build to meet POPIA requirements, and host on South African infrastructure where possible. Standard security measures include:
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>Data encryption in transit and at rest</li>
          <li>Consent logs and audit trails</li>
          <li>Role-based access controls</li>
          <li>Regular security reviews</li>
        </ul>
        <p className="text-ink-secondary">
          You retain ownership of all your business data. We will never sell, share, or use your data for purposes other than delivering our services unless explicitly authorized by you.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">7. Intellectual Property</h2>
        <p className="text-ink-secondary mb-4">
          Upon full payment, you own the custom workflows, automations, and configurations we build specifically for your business. However:
        </p>
        <ul className="text-ink-secondary">
          <li>We retain ownership of our proprietary frameworks, tools, and methodologies</li>
          <li>Third-party software licenses (e.g., Zapier, Make, HubSpot) remain subject to their respective terms</li>
          <li>We may showcase anonymized case studies referencing your project unless you request otherwise</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">8. Warranties and Limitations</h2>
        <div className="space-y-6">
          <div>
            <h3 className="text-ink-primary font-bold mb-3">We guarantee:</h3>
            <ul className="text-ink-secondary">
              <li>Systems will function as specified in the agreed scope</li>
              <li>30-day bug-fix warranty after go-live for any defects in our work</li>
              <li>Professional, timely support throughout the engagement</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-ink-primary font-bold mb-3">We do not guarantee:</h3>
            <ul className="text-ink-secondary">
              <li>Specific business outcomes (e.g., exact ROI, revenue increases)</li>
              <li>Uninterrupted operation of third-party tools we integrate with</li>
              <li>Results dependent on factors outside our control (market conditions, user adoption, etc.)</li>
            </ul>
          </div>

          <p className="text-ink-secondary">
            Our liability is limited to the total fees paid for the specific project in question. We are not liable for indirect, consequential, or punitive damages.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">9. Support and Maintenance</h2>
        <p className="text-ink-secondary mb-4">
          Every project includes hands-on training and documentation. Post-launch support options:
        </p>
        <ul className="text-ink-secondary mb-4">
          <li><strong className="text-ink-primary">Bug fixes:</strong> Free for 30 days post-launch</li>
          <li><strong className="text-ink-primary">Email support:</strong> Available on all monthly packages</li>
          <li><strong className="text-ink-primary">Ongoing optimization:</strong> Included in Enterprise and Growth packages</li>
          <li><strong className="text-ink-primary">Ad-hoc support:</strong> Billed hourly for one-off projects outside retainer agreements</li>
        </ul>
        <p className="text-ink-secondary">
          If you cancel a monthly support package, we provide a 30-day handover period to ensure continuity.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">10. Termination</h2>
        <p className="text-ink-secondary mb-4">
          <strong className="text-ink-primary">By You:</strong> You may cancel a project with 14 days&apos; written notice. Work completed to date will be billed at our standard hourly rate, and the deposit is non-refundable.
        </p>
        <p className="text-ink-secondary mb-4">
          <strong className="text-ink-primary">By Us:</strong> We may terminate this agreement if you breach these terms, fail to pay invoices, or engage in abusive behavior toward our team. Outstanding invoices remain due.
        </p>
        <p className="text-ink-secondary">
          <strong className="text-ink-primary">Monthly Packages:</strong> Either party may cancel with 30 days&apos; notice. No refunds for partial months.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">11. Confidentiality</h2>
        <p className="text-ink-secondary">
          Both parties agree to keep all proprietary information confidential. This includes business strategies, data, and any non-public information shared during the engagement. This obligation survives termination of our agreement.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">12. Governing Law</h2>
        <p className="text-ink-secondary">
          These terms are governed by the laws of South Africa. Any disputes will be resolved through good-faith negotiation or, if necessary, in the courts of Johannesburg, South Africa.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">13. Changes to Terms</h2>
        <p className="text-ink-secondary">
          We may update these terms from time to time. Material changes will be communicated via email. Continued use of our services after changes constitutes acceptance of the updated terms.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">14. Contact</h2>
        <div className="card-lift rounded-lg p-6 text-ink-secondary">
          <p className="mb-2">Questions about these terms? Reach out:</p>
          <p><strong className="text-ink-primary">Email:</strong> <a href="mailto:hello@maruonline.com" className="text-cyan-ink hover:underline">hello@maruonline.com</a></p>
          <p><strong className="text-ink-primary">Location:</strong> Johannesburg, South Africa</p>
        </div>
      </section>

      <div className="border-t border-white/10 pt-8 mt-12 mb-12">
        <p className="text-sm text-ink-secondary italic">
          By engaging our services, you acknowledge that you have read, understood, and agreed to these Terms and Conditions.
        </p>
      </div>
    </LegalLayout>
  );
}
