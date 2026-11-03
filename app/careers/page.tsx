import { Metadata } from "next";
import { LegalLayout } from "@/components/layout/LegalLayout";
import Link from "next/link";
import { seo } from '@/lib/seo'

export const metadata: Metadata = {
  ...seo('/careers'),
  title: "Careers | Join Maru AI | South Africa",
  description:
    "Join the Maru team and help South African SMBs harness the power of AI and automation. Explore career opportunities in AI consulting, development, and marketing.",
};

export default function CareersPage() {
  return (
    <LegalLayout
      title="Careers at Maru"
      description="Help us build practical AI systems for South African SMEs."
      lastUpdated="January 2025"
      effectiveDate="January 1, 2025"
    >
      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">Why Join Maru?</h2>
        <p className="text-ink-secondary mb-4">
          We make AI and automation accessible for small and medium-sized businesses across Africa.
        </p>
        <p className="text-ink-secondary mb-4">
          We are a remote-first team focused on measurable business outcomes, not hype.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">What We Value</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card-lift p-6">
            <h3 className="text-ink-primary font-bold mb-3">🚀 Innovation & Experimentation</h3>
            <p className="text-ink-secondary text-sm">
              We encourage trying new approaches, testing ideas, and learning from failures. The AI landscape 
              is evolving rapidly, and we stay ahead by being curious and adaptive.
            </p>
          </div>

          <div className="card-lift p-6">
            <h3 className="text-ink-primary font-bold mb-3">🎯 Customer Obsession</h3>
            <p className="text-ink-secondary text-sm">
              Our clients' success is our success. We go beyond delivering solutions—we become partners in 
              their growth journey and measure our impact by their results.
            </p>
          </div>

          <div className="card-lift p-6">
            <h3 className="text-ink-primary font-bold mb-3">🤝 Collaboration & Transparency</h3>
            <p className="text-ink-secondary text-sm">
              We work as one team, sharing knowledge freely and communicating openly. No silos, no politics—
              just smart people working together to solve interesting problems.
            </p>
          </div>

          <div className="card-lift p-6">
            <h3 className="text-ink-primary font-bold mb-3">📈 Continuous Learning</h3>
            <p className="text-ink-secondary text-sm">
              We invest in our team's growth through training, conferences, certifications, and hands-on 
              experience with cutting-edge technologies. Your development is our priority.
            </p>
          </div>

          <div className="card-lift p-6">
            <h3 className="text-ink-primary font-bold mb-3">🌍 Local Impact, Global Ambition</h3>
            <p className="text-ink-secondary text-sm">
              We're proud to be based in South Africa and committed to building technology solutions that 
              work for African businesses—while setting global standards for excellence.
            </p>
          </div>

          <div className="card-lift p-6">
            <h3 className="text-ink-primary font-bold mb-3">⚖️ Work-Life Balance</h3>
            <p className="text-ink-secondary text-sm">
              We're building a sustainable business, not a burnout factory. Flexible hours, remote work, and 
              a culture that respects your time and well-being.
            </p>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">Current Opportunities</h2>
        <p className="text-ink-secondary mb-6">
          We hire across disciplines and welcome strong candidates even when no formal role is listed.
        </p>

        <h3 className="text-xl font-medium text-ink-primary mb-4">Areas We're Hiring In:</h3>
        <ul className="space-y-4 mb-8">
          <li className="card-lift p-4">
            <h4 className="text-ink-primary font-bold mb-2">AI/Automation Consultants</h4>
            <p className="text-ink-secondary text-sm mb-2">
              Help businesses identify automation opportunities, design AI-powered workflows, and implement 
              solutions that drive real ROI.
            </p>
            <p className="text-ink-secondary text-sm">
              <strong className="text-ink-primary">Skills:</strong> Process analysis, CRM platforms (HubSpot, Salesforce), 
              workflow automation, client communication
            </p>
          </li>

          <li className="card-lift p-4">
            <h4 className="text-ink-primary font-bold mb-2">Full-Stack Developers</h4>
            <p className="text-ink-secondary text-sm mb-2">
              Build web applications, automation tools, and integration solutions using modern technologies 
              like Next.js, TypeScript, and AI APIs.
            </p>
            <p className="text-ink-secondary text-sm">
              <strong className="text-ink-primary">Skills:</strong> React/Next.js, Node.js, TypeScript, API development, 
              database design, AI/ML integration
            </p>
          </li>

          <li className="card-lift p-4">
            <h4 className="text-ink-primary font-bold mb-2">Digital Marketing Specialists</h4>
            <p className="text-ink-secondary text-sm mb-2">
              Drive growth through SEO, content marketing, PPC campaigns, and marketing automation. Help us 
              reach more SMBs who need our solutions.
            </p>
            <p className="text-ink-secondary text-sm">
              <strong className="text-ink-primary">Skills:</strong> SEO, Google/Meta Ads, content strategy, HubSpot 
              marketing, analytics
            </p>
          </li>

          <li className="card-lift p-4">
            <h4 className="text-ink-primary font-bold mb-2">Business Development / Sales</h4>
            <p className="text-ink-secondary text-sm mb-2">
              Identify and close opportunities with SMBs looking to scale with AI. Build relationships, run 
              discovery calls, and demonstrate value.
            </p>
            <p className="text-ink-secondary text-sm">
              <strong className="text-ink-primary">Skills:</strong> B2B sales, CRM management, consultative selling, 
              relationship building, SaaS experience
            </p>
          </li>
        </ul>

        <div
          className="rounded-lg p-6"
          style={{
            backgroundColor: "var(--color-cyan-light)",
            border: "1px solid var(--color-cyan)",
          }}
        >
          <p className="text-ink-secondary">
            <strong className="text-ink-primary">Don't see your role?</strong> We're always looking for exceptional 
            talent across operations, customer success, design, and more. If you think you'd be a great fit 
            for Maru, we want to hear from you.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">Benefits & Perks</h2>
        <ul className="text-ink-secondary">
          <li><strong className="text-ink-primary">Remote-First Culture:</strong> Work from anywhere in South Africa (or beyond)</li>
          <li><strong className="text-ink-primary">Flexible Hours:</strong> Manage your schedule to suit your productivity peaks</li>
          <li><strong className="text-ink-primary">Learning Budget:</strong> Annual allowance for courses, books, and conferences</li>
          <li><strong className="text-ink-primary">Latest Tools:</strong> Access to premium AI tools, software licenses, and platforms</li>
          <li><strong className="text-ink-primary">Equity Opportunities:</strong> Share in the company's success as we grow</li>
          <li><strong className="text-ink-primary">Team Retreats:</strong> Quarterly in-person gatherings to connect and collaborate</li>
          <li><strong className="text-ink-primary">Health & Wellness:</strong> Medical aid contributions and wellness benefits</li>
        </ul>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">Our Hiring Process</h2>
        <div className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full [background:var(--gradient-gold)] flex items-center justify-center text-[var(--color-ink-on-gold)] font-bold">
              1
            </div>
            <div>
              <h4 className="text-ink-primary font-bold mb-1">Application Review</h4>
              <p className="text-ink-secondary text-sm">
                We review your application, portfolio, or work samples within 5 business days.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full [background:var(--gradient-gold)] flex items-center justify-center text-[var(--color-ink-on-gold)] font-bold">
              2
            </div>
            <div>
              <h4 className="text-ink-primary font-bold mb-1">Initial Conversation</h4>
              <p className="text-ink-secondary text-sm">
                A casual 30-minute chat to learn about your background, goals, and what you're looking for.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full [background:var(--gradient-gold)] flex items-center justify-center text-[var(--color-ink-on-gold)] font-bold">
              3
            </div>
            <div>
              <h4 className="text-ink-primary font-bold mb-1">Skills Assessment</h4>
              <p className="text-ink-secondary text-sm">
                A practical task or case study relevant to the role (paid for projects requiring significant time).
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full [background:var(--gradient-gold)] flex items-center justify-center text-[var(--color-ink-on-gold)] font-bold">
              4
            </div>
            <div>
              <h4 className="text-ink-primary font-bold mb-1">Team Interview</h4>
              <p className="text-ink-secondary text-sm">
                Meet the team you'll be working with. We want to ensure it's a mutual fit.
              </p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full [background:var(--gradient-gold)] flex items-center justify-center text-[var(--color-ink-on-gold)] font-bold">
              5
            </div>
            <div>
              <h4 className="text-ink-primary font-bold mb-1">Offer & Onboarding</h4>
              <p className="text-ink-secondary text-sm">
                If it's a match, we'll extend an offer and get you set up with everything you need to succeed.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-medium text-ink-primary mb-6">Equal Opportunity</h2>
        <p className="text-ink-secondary mb-4">
          Maru is an equal opportunity employer. We celebrate diversity and are committed to creating an 
          inclusive environment for all employees. We don't discriminate based on race, religion, color, 
          national origin, gender, sexual orientation, age, marital status, veteran status, or disability status.
        </p>
        <p className="text-ink-secondary">
          We actively encourage applications from underrepresented groups in the tech industry and are 
          committed to building a team that reflects the diversity of the markets we serve.
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-medium text-ink-primary mb-6">Ready to Apply?</h2>
        <p className="text-ink-secondary mb-6">
          Send your CV, portfolio, or LinkedIn profile to <a href="mailto:careers@maruonline.com" className="text-cyan-ink hover:underline">careers@maruonline.com</a> 
          {" "}along with a brief note about why you're interested in Maru and what you'd bring to the team.
        </p>
        <p className="text-ink-secondary mb-6">
          We'd love to hear about:
        </p>
        <ul className="text-ink-secondary mb-8">
          <li>Projects you're proud of and what you learned from them</li>
          <li>Technologies or methodologies you're excited about</li>
          <li>How you think AI can transform businesses in Africa</li>
          <li>What you're looking for in your next role</li>
        </ul>

        <div className="card-lift p-6">
          <p className="text-ink-secondary mb-2">
            <strong className="text-ink-primary">Questions?</strong> Reach out to our team:
          </p>
          <p className="text-ink-secondary">
            <strong className="text-ink-primary">Email:</strong>{" "}
            <a href="mailto:careers@maruonline.com" className="text-cyan-ink hover:underline">
              careers@maruonline.com
            </a>
          </p>
          <p className="text-ink-secondary">
            <strong className="text-ink-primary">General Inquiries:</strong>{" "}
            <a href="mailto:hello@maruonline.com" className="text-cyan-ink hover:underline">
              hello@maruonline.com
            </a>
          </p>
          <p className="text-ink-secondary mt-4">
            Or <Link href="/contact" className="text-cyan-ink hover:underline">visit our contact page</Link> to get in touch.
          </p>
        </div>
      </section>
    </LegalLayout>
  );
}
