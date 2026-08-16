import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';

const PLANS = [
  {
    icon: 'bx-rocket',
    name: 'Starter',
    desc: 'Perfect for small businesses and personal projects',
    monthly: '1,500',
    project: '1,200',
    period: '/project',
    featured: false,
    included: [
      'Up to 5 Pages',
      'Responsive Design',
      'Basic SEO Setup',
      'Contact Form Integration',
      '2 Rounds of Revisions',
      '30-Day Support',
    ],
    notIncluded: ['Custom Backend', 'E-Commerce Features', 'CMS Integration'],
    cta: 'Get Started',
    note: 'Delivery in 1–2 weeks',
    primary: false,
  },
  {
    icon: 'bx-diamond',
    name: 'Professional',
    desc: 'Ideal for growing businesses needing robust solutions',
    monthly: '5,000',
    project: '4,000',
    period: '/project',
    featured: true,
    included: [
      'Up to 15 Pages',
      'Custom UI/UX Design',
      'Full-Stack Development',
      'CMS Integration',
      'Advanced SEO',
      'Payment Gateway',
      '5 Rounds of Revisions',
      '90-Day Support',
    ],
    notIncluded: ['Dedicated Infrastructure'],
    cta: 'Get Started',
    note: 'Delivery in 4–6 weeks',
    primary: true,
  },
  {
    icon: 'bx-buildings',
    name: 'Enterprise',
    desc: 'Custom solutions for large-scale, complex requirements',
    monthly: '15,000',
    project: '12,000',
    period: '+/project',
    featured: false,
    included: [
      'Unlimited Pages',
      'Custom Architecture',
      'Microservices & APIs',
      'Cloud Infrastructure',
      'Performance Optimization',
      'Security Hardening',
      'Unlimited Revisions',
      '1-Year Priority Support',
      'Dedicated Account Manager',
    ],
    notIncluded: [],
    cta: 'Contact for Quote',
    note: 'Timeline based on scope',
    primary: false,
  },
];

const COMPARISON = [
  { feature: 'Pages / Screens', values: ['Up to 5', 'Up to 15', 'Unlimited'] },
  { feature: 'Custom Design', values: ['yes', 'yes', 'yes'] },
  { feature: 'Responsive Layout', values: ['yes', 'yes', 'yes'] },
  { feature: 'Backend Development', values: ['no', 'yes', 'yes'] },
  { feature: 'Database Integration', values: ['no', 'yes', 'yes'] },
  { feature: 'E-Commerce', values: ['no', 'yes', 'yes'] },
  { feature: 'SEO Optimization', values: ['Basic', 'Advanced', 'Enterprise'] },
  { feature: 'Revisions', values: ['2', '5', 'Unlimited'] },
  { feature: 'Support Period', values: ['30 Days', '90 Days', '1 Year'] },
  { feature: 'Source Code', values: ['yes', 'yes', 'yes'] },
  { feature: 'Priority Support', values: ['no', 'no', 'yes'] },
];

const ADDONS = [
  { icon: 'bx-search-alt', title: 'SEO Audit', price: '$299', desc: 'Full technical SEO audit with actionable recommendations' },
  { icon: 'bx-mobile', title: 'Mobile App', price: '$3,000+', desc: 'React Native iOS + Android companion app' },
  { icon: 'bx-shield', title: 'Security Audit', price: '$499', desc: 'Penetration testing and vulnerability assessment' },
  { icon: 'bx-tachometer', title: 'Performance Boost', price: '$399', desc: 'Core Web Vitals optimization to achieve 90+ Lighthouse score' },
  { icon: 'bx-edit', title: 'Content Writing', price: '$99/page', desc: 'SEO-optimized copywriting for all your pages' },
  { icon: 'bx-support', title: 'Monthly Retainer', price: '$500/mo', desc: 'Ongoing maintenance, updates, and priority support' },
];

const FAQS = [
  {
    q: 'How does the payment process work?',
    a: 'I require a 50% deposit upfront before starting any project, with the remaining 50% due upon project completion and your approval. For longer projects, milestone-based payments can be arranged.',
  },
  {
    q: 'What if I need changes after the project is done?',
    a: "Each plan includes a set number of revision rounds. After that, additional changes are billed at $75/hr. I also offer monthly maintenance retainers for ongoing support and updates.",
  },
  {
    q: 'Do you offer custom pricing for unique projects?',
    a: "Absolutely! Every project is unique. These prices are starting points. Contact me with your specific requirements and I'll provide a detailed custom quote within 24 hours.",
  },
  {
    q: 'Can I upgrade my plan mid-project?',
    a: "Yes! If your requirements expand during the project, we can easily upgrade your plan. I'll provide a revised quote for the additional scope and we'll proceed from there.",
  },
];

function ComparisonCell({ value }) {
  if (value === 'yes') return <i className="bx bx-check yes" />;
  if (value === 'no') return <i className="bx bx-x no" />;
  return <span>{value}</span>;
}

export default function Pricing() {
  const [bill, setBill] = useState('monthly');
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <PageHero title={<>Pricing <span className="text-gradient">Plans</span></>} crumb="Pricing" />

      <section className="pricing-section section">
        <div className="container">
          {/* Billing Toggle */}
          <div className="billing-toggle">
            <span>Monthly</span>
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={bill === 'project'}
                onChange={() => setBill((b) => (b === 'monthly' ? 'project' : 'monthly'))}
              />
              <span className="toggle-slider" />
            </label>
            <span>Project-Based <span className="save-badge">Save 20%</span></span>
          </div>

          {/* Pricing Cards */}
          <div className="pricing-grid">
            {PLANS.map((p, i) => (
              <div className={`pricing-card ${p.featured ? 'featured' : ''}`} data-aos="fade-up" data-aos-delay={(i + 1) * 100} key={p.name}>
                {p.featured && <div className="pricing-popular">Most Popular</div>}
                <div className="pricing-header">
                  <div className="pricing-icon"><i className={`bx ${p.icon}`} /></div>
                  <h3 className="pricing-plan">{p.name}</h3>
                  <p className="pricing-desc">{p.desc}</p>
                </div>
                <div className="pricing-price">
                  <span className="price-currency">$</span>
                  <span className="price-amount">{bill === 'monthly' ? p.monthly : p.project}</span>
                  <span className="price-period">{p.period}</span>
                </div>
                <div className="pricing-divider" />
                <ul className="pricing-features">
                  {p.included.map((f) => (
                    <li className="included" key={f}><i className="bx bx-check" /> {f}</li>
                  ))}
                  {p.notIncluded.map((f) => (
                    <li className="not-included" key={f}><i className="bx bx-x" /> {f}</li>
                  ))}
                </ul>
                <Link to="/contact" className={`btn ${p.primary ? 'btn-primary' : 'btn-outline'} btn-full`}>{p.cta}</Link>
                <p className="pricing-note">{p.note}</p>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <div className="comparison-table">
            <h2 className="section-title" style={{ textAlign: 'center', marginBottom: 40 }}>
              Detailed <span className="text-gradient">Comparison</span>
            </h2>
            <div className="table-wrapper">
              <table className="pricing-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Starter</th>
                    <th className="highlight">Professional</th>
                    <th>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  {COMPARISON.map((row) => (
                    <tr key={row.feature}>
                      <td>{row.feature}</td>
                      <td><ComparisonCell value={row.values[0]} /></td>
                      <td className="highlight"><ComparisonCell value={row.values[1]} /></td>
                      <td><ComparisonCell value={row.values[2]} /></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add-ons */}
          <div className="addons-section">
            <div className="section-header">
              <span className="section-tag">Extras</span>
              <h2 className="section-title">Add-On <span className="text-gradient">Services</span></h2>
            </div>
            <div className="addons-grid">
              {ADDONS.map((a, i) => (
                <div className="addon-card" data-aos="fade-up" data-aos-delay={(i + 1) * 50} key={a.title}>
                  <i className={`bx ${a.icon}`} />
                  <h4>{a.title}</h4>
                  <span className="addon-price">{a.price}</span>
                  <p>{a.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="faq-preview" style={{ marginTop: 80 }}>
            <div className="section-header">
              <span className="section-tag">Questions</span>
              <h2 className="section-title">Pricing <span className="text-gradient">FAQs</span></h2>
            </div>
            <div className="faq-list">
              {FAQS.map((f, i) => (
                <div className={`faq-item ${openFaq === i ? 'active' : ''}`} key={f.q}>
                  <button className="faq-question" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}>
                    <span>{f.q}</span>
                    <i className={`bx ${openFaq === i ? 'bx-minus' : 'bx-plus'} faq-icon`} />
                  </button>
                  <div className="faq-answer">
                    <p>{f.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
