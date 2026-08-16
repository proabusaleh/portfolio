import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/PageHero.jsx';
import { sendContact } from '../lib/api.js';
import { useToast } from '../lib/Toast.jsx';

const CONTACT_CARDS = [
  { icon: 'bx-envelope', label: 'Email Me', value: 'alex@portfolio.com', href: 'mailto:alex@portfolio.com' },
  { icon: 'bx-phone', label: 'Call Me', value: '+1 (123) 456-7890', href: 'tel:+11234567890' },
  { icon: 'bx-map', label: 'Location', value: 'San Francisco, CA, USA' },
  { icon: 'bx-time', label: 'Availability', value: 'Open to Work', available: true },
];

const SOCIALS = [
  { icon: 'bxl-github', label: 'GitHub' },
  { icon: 'bxl-linkedin', label: 'LinkedIn' },
  { icon: 'bxl-twitter', label: 'Twitter' },
  { icon: 'bxl-dribbble', label: 'Dribbble' },
];

const BUDGETS = ['<5k', '5-10k', '10-25k', '>25k'];

const FAQS = [
  { q: 'What is your typical project timeline?', a: 'Project timelines vary based on complexity. A simple landing page takes 1–2 weeks, while a full-stack web application typically takes 6–12 weeks. I provide detailed timeline estimates after our initial consultation.' },
  { q: 'Do you work with clients remotely?', a: 'Absolutely! I work with clients worldwide. I use video calls, Slack, and project management tools to ensure seamless collaboration regardless of time zone differences.' },
  { q: 'What payment methods do you accept?', a: 'I accept bank transfers, PayPal, Stripe, and cryptocurrency. I typically require a 50% deposit upfront with the remainder due on project completion.' },
  { q: 'Do you offer post-launch support?', a: 'Yes! I provide 30 days of free bug-fixing support after launch. Ongoing maintenance packages are available at competitive monthly rates.' },
];

const SUBJECTS = [
  { value: 'web', label: 'Web Development' },
  { value: 'design', label: 'UI/UX Design' },
  { value: 'mobile', label: 'Mobile App' },
  { value: 'seo', label: 'SEO & Marketing' },
  { value: 'other', label: 'Other' },
];

export default function Contact() {
  const showToast = useToast();
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [fileName, setFileName] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get('name'),
      email: fd.get('email'),
      phone: fd.get('phone') || null,
      subject: fd.get('subject'),
      budget: fd.get('budget') || null,
      message: fd.get('message'),
    };
    setSending(true);
    try {
      await sendContact(payload);
      setSuccess(true);
      showToast('success', 'Message sent successfully!');
      e.currentTarget.reset();
      setFileName('');
      setCharCount(0);
    } catch (err) {
      showToast('error', err.payload?.message || 'Something went wrong. Please try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <PageHero title={<>Contact <span className="text-gradient">Me</span></>} crumb="Contact" />

      <section className="contact-section section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info-side" data-aos="fade-right">
              <span className="section-tag">Contact</span>
              <h2 className="section-title" style={{ textAlign: 'left' }}>
                Let's Work <span className="text-gradient">Together</span>
              </h2>
              <p className="contact-intro">
                Have a project in mind or just want to say hi? My inbox is always open.
                I respond within 24 hours on business days.
              </p>

              <div className="contact-cards">
                {CONTACT_CARDS.map((c) => (
                  <div className="contact-card" key={c.label}>
                    <div className="contact-card-icon">
                      <i className={`bx ${c.icon}`} />
                    </div>
                    <div className="contact-card-info">
                      <span className="contact-card-label">{c.label}</span>
                      {c.href ? (
                        <a href={c.href} className="contact-card-value">{c.value}</a>
                      ) : (
                        <span className={`contact-card-value ${c.available ? 'available' : ''}`}>{c.value}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-social">
                <h4>Connect on Social</h4>
                <div className="contact-social-links">
                  {SOCIALS.map((s) => (
                    <a href="#" className="contact-social-item" data-tooltip={s.label} key={s.label}>
                      <i className={`bx ${s.icon}`} />
                      <span>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-side" data-aos="fade-left">
              <div className="contact-form-wrapper">
                <h3 className="form-title">Send a Message</h3>
                <p className="form-subtitle">Fill out the form below and I'll get back to you ASAP!</p>

                <form id="contactForm" className="contact-form" noValidate onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <input type="text" name="name" className="form-control" placeholder=" " required minLength={2} autoComplete="name" />
                      <label className="form-label">Your Name *</label>
                      <div className="form-focus-line" />
                    </div>
                    <div className="form-group">
                      <input type="email" name="email" className="form-control" placeholder=" " required autoComplete="email" />
                      <label className="form-label">Email Address *</label>
                      <div className="form-focus-line" />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <input type="tel" name="phone" className="form-control" placeholder=" " autoComplete="tel" />
                      <label className="form-label">Phone (Optional)</label>
                      <div className="form-focus-line" />
                    </div>
                    <div className="form-group">
                      <select name="subject" className="form-control form-select" required defaultValue="">
                        <option value="" disabled hidden />
                        {SUBJECTS.map((s) => <option value={s.value} key={s.value}>{s.label}</option>)}
                      </select>
                      <label className="form-label">Service Needed *</label>
                      <div className="form-focus-line" />
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="budget-options">
                      <span className="budget-label">Project Budget</span>
                      <div className="budget-btns">
                        {BUDGETS.map((b) => (
                          <label className="budget-opt" key={b}>
                            <input type="radio" name="budget" value={b} />
                            <span>{b === '<5k' ? '< $5K' : b === '5-10k' ? '$5K–$10K' : b === '10-25k' ? '$10K–$25K' : '$25K+'}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <textarea
                      name="message"
                      className="form-control form-textarea"
                      placeholder=" "
                      required
                      minLength={20}
                      rows="5"
                      onChange={(e) => setCharCount(e.target.value.length)}
                    />
                    <label className="form-label">Your Message *</label>
                    <div className="form-focus-line" />
                    <span className="char-count">{charCount} / 500</span>
                  </div>

                  <div className="form-group">
                    <label className="file-upload-area" htmlFor="attachment">
                      <input
                        type="file"
                        id="attachment"
                        name="attachment"
                        accept=".pdf,.doc,.docx,.zip"
                        hidden
                        onChange={(e) => setFileName(e.target.files?.[0]?.name || '')}
                      />
                      <i className="bx bx-upload" />
                      <span>Attach File (PDF, DOC, ZIP — max 10MB)</span>
                    </label>
                    {fileName && <div className="file-name">{fileName}</div>}
                  </div>

                  <div className="form-group checkbox-group">
                    <label className="checkbox-label">
                      <input type="checkbox" required />
                      <span className="checkmark" />
                      <span className="checkbox-text">
                        I agree to the <a href="#">Privacy Policy</a> and consent to my
                        data being stored for contact purposes.
                      </span>
                    </label>
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg btn-full" id="submitBtn" disabled={sending}>
                    <span>{sending ? 'Sending...' : 'Send Message'}</span>
                    <i className="bx bx-send" />
                  </button>

                  {success && (
                    <div className="form-success" id="formSuccess">
                      <i className="bx bx-check-circle" />
                      <div>
                        <strong>Message Sent Successfully!</strong>
                        <p>Thank you! I'll get back to you within 24 hours.</p>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="map-section" data-aos="fade-up">
            <div className="map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100940.14245968247!2d-122.43759999999999!3d37.75769999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA%2C%20USA!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="400"
                style={{ border: 0, borderRadius: 'var(--radius-lg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Location Map"
              />
              <div className="map-overlay-card">
                <div className="map-pin"><i className="bx bx-map" /></div>
                <div>
                  <strong>Alex Morgan</strong>
                  <span>San Francisco, CA 94102</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Preview */}
          <div className="faq-preview" data-aos="fade-up">
            <div className="section-header">
              <span className="section-tag">FAQ</span>
              <h2 className="section-title">Common <span className="text-gradient">Questions</span></h2>
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
            <div style={{ textAlign: 'center', marginTop: 32 }}>
              <Link to="/faq" className="btn btn-outline">
                View All FAQs <i className="bx bx-arrow-back bx-rotate-180" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
