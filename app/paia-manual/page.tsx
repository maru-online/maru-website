import { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/paia-manual'),
  title: "PAIA Manual | Maru Online",
  description:
    "How to request access to records held by Maru Online (Pty) Ltd under the Promotion of Access to Information Act.",
};

export default function PaiaManualPage() {
  return (
    <LegalLayout
      title="PAIA Manual"
      description="How to request access to the records Maru Online holds, and how we process personal information."
      lastUpdated="October 8, 2026"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">1. About this manual</h2>
        <p className="text-ink-secondary mb-4">
          This manual is published under section 51 of the Promotion of Access to Information Act 2 of 2000 (PAIA). It explains what records Maru Online (Pty) Ltd holds and how to ask for access to them. It also covers the information POPIA requires us to provide about how we process personal information.
        </p>
        <p className="text-ink-secondary mb-4">
          Maru Online (Pty) Ltd is a private body. Registration number 2002/013801/07. We are an AI implementation consultancy serving South African businesses.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">2. Contact details</h2>
        <p className="text-ink-secondary mb-4">
          Head of the private body and Information Officer: Jimmy Motsei, Chief Executive Officer.
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>Email: hello@maruonline.com</li>
          <li>Website: maruonline.com</li>
          <li>Location: Gauteng, South Africa</li>
          <li>Postal and street address: [TO BE ADDED BEFORE PUBLISHING: PAIA requires a postal address and a street address]</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">3. The PAIA guide</h2>
        <p className="text-ink-secondary mb-4">
          The Information Regulator publishes a guide on how to use PAIA, in all official languages. You can find it on the Regulator&apos;s website, inforegulator.org.za.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">4. Records available without a request</h2>
        <p className="text-ink-secondary mb-4">
          The following are available on our website without a request:
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>The content of maruonline.com, including our service descriptions and published articles</li>
          <li>Our Privacy Policy, Terms and Conditions, Cookie Policy and this manual</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">5. Records we hold</h2>
        <p className="text-ink-secondary mb-4">
          We hold the following categories of records. Holding a record does not mean it will be disclosed. See section 7 for the grounds on which a request may be refused.
        </p>
        <ul className="text-ink-secondary mb-4">
          <li>Company records: registration documents and company secretarial records</li>
          <li>Client records: enquiries, proposals, agreements, project documents and correspondence</li>
          <li>Exposure Check records: the answers submitted, the calculated result and the report</li>
          <li>Marketing and communication records: newsletter and guide subscribers, consent records and email correspondence</li>
          <li>Financial and tax records: invoices, payments and accounting records</li>
          <li>Supplier and service-provider records: agreements and correspondence with the providers we use</li>
          <li>Personnel and contractor records, where we engage people</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">6. Records held under other legislation</h2>
        <p className="text-ink-secondary mb-4">
          Where applicable, we keep records required by other laws, including company law, tax law, labour law and the laws on electronic communications and consumer protection. Which records exist depends on our activities at the time.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">7. How to request access</h2>
        <p className="text-ink-secondary mb-4">
          To request a record, complete the prescribed request form (Form 2 under the PAIA regulations) and send it to our Information Officer at hello@maruonline.com. Please give enough detail to identify the record, state which form of access you want, and say how you want to be told of our decision. If you are asking on behalf of someone else, include proof of your authority.
        </p>
        <p className="text-ink-secondary mb-4">
          We will decide on your request within 30 days of receiving it. This period can be extended once, by up to 30 days, in the circumstances PAIA allows, and we will tell you if that happens. A request fee and, if the request is granted, an access fee may apply, as set by the PAIA regulations.
        </p>
        <p className="text-ink-secondary mb-4">
          We may refuse access on the grounds PAIA lists, for example to protect another person&apos;s privacy, confidential commercial information, or legal privilege. If we refuse, we will give the reasons and tell you how to complain to the Information Regulator or apply to court.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">8. Processing of personal information (POPIA)</h2>
        <p className="text-ink-secondary mb-4">
          Purposes. We process personal information to respond to enquiries, produce Exposure Check results and reports, prepare proposals and deliver our services, send the guide and newsletters to people who asked for them, run and secure our website, manage our accounts, and comply with the law.
        </p>
        <p className="text-ink-secondary mb-4">
          Data subjects and information. The people whose information we process are website visitors, people who use the Exposure Check or ask for a proposal, subscribers, clients and their contacts, suppliers and, where applicable, personnel. The information is described in our Privacy Policy and includes names, email addresses, business names, optional phone numbers, and the answers people give us.
        </p>
        <p className="text-ink-secondary mb-4">
          Recipients. We share personal information with the service providers named in our Privacy Policy, who process it for us, and where the law requires it.
        </p>
        <p className="text-ink-secondary mb-4">
          Transfers outside South Africa. Some of our providers process information outside South Africa. These are named in our Privacy Policy, together with the safeguards we rely on.
        </p>
        <p className="text-ink-secondary mb-4">
          Security. We limit access to personal information to the people who need it and use providers that apply their own security controls. Our Privacy Policy explains this in more detail.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">9. Updates</h2>
        <p className="text-ink-secondary mb-4">
          We update this manual when our records or processing change. Last updated: 8 October 2026.
        </p>
      </section>
    </LegalLayout>
  );
}
