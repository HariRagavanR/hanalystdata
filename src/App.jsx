import { useState } from "react";

import {
  ArrowDownRight,
  ArrowRight,
  BarChart3,
  Database,
  Menu,
  X,
  ChartNoAxesCombined,
  Lightbulb,
  CheckCircle2,
  Mail,
  MapPin,
  Phone,
  Send,
  Workflow,
  Target,
  Layers3,
  Camera,
} from "lucide-react";

import "./index.css";

const services = [
  {
    number: "01",
    title: "Data Analytics & Reporting",
    description:
      "Turn raw business data into clear reports, useful insights, and better-informed decisions.",
    image: "/images/data-analytics.png",
    icon: BarChart3,
    tags: ["Data analysis", "Business reporting"],
  },
  {
    number: "02",
    title: "Dashboard Development",
    description:
      "Make key business metrics easier to understand with interactive dashboards and KPI reporting.",
    image: "/images/business-intelligence.png",
    icon: ChartNoAxesCombined,
    tags: ["Power BI", "KPI dashboards"],
  },
  {
    number: "03",
    title: "Data Engineering & Automation",
    description:
      "Organize data workflows and reduce repetitive manual work with practical automation.",
    image: "/images/data-engineering.png",
    icon: Database,
    tags: ["Data workflows", "Python"],
  },
  {
    number: "04",
    title: "Business Insights & Solutions",
    description:
      "Explore business performance, understand patterns, and identify opportunities for improvement.",
    image: "/images/consulting.png",
    icon: Lightbulb,
    tags: ["Business insights", "Decision support"],
  },
];

const solutions = [
  {
    icon: Layers3,
    title: "Scattered business data",
    text: "Bring information from different files and sources into a more organized workflow.",
  },
  {
    icon: Workflow,
    title: "Manual reporting",
    text: "Reduce repetitive reporting work and make routine updates easier to manage.",
  },
  {
    icon: Target,
    title: "Unclear performance",
    text: "Present relevant metrics in a format that helps teams understand business performance.",
  },
];

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Solutions", href: "#solutions" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function Logo() {
  return (
    <a className="brand-logo" href="#home" aria-label="Hanalytics Data home">
      <img src="/hanalytics-logo.png" alt="Hanalytics Data" />
    </a>
  );
}

function SectionHeading({ eyebrow, title, description, centered = false }) {
  return (
    <div className={`section-heading ${centered ? "centered" : ""}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "Data Analytics & Reporting",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage("");
    setSubmitError(false);

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/contact@hanalyticsdata.in",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            email: form.email.trim(),
            service: form.service,
            message: form.message.trim(),
            _subject: `Project enquiry from ${form.name.trim()}`,
            _template: "table",
          }),
        }
      );

      const result = await response.json();
      const succeeded = result.success === true || result.success === "true";

      if (!response.ok || !succeeded) {
        throw new Error(result.message || "The enquiry could not be submitted.");
      }

      setSubmitMessage(
        "Thank you! Your enquiry has been submitted. We will get back to you soon."
      );
      setForm({
        name: "",
        email: "",
        service: "Data Analytics & Reporting",
        message: "",
      });
    } catch (error) {
      setSubmitError(true);
      setSubmitMessage(
        "We couldn't submit your enquiry. Please email contact@hanalyticsdata.in directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <Logo />

          <button
            className="mobile-menu-toggle"
            type="button"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>

          <nav className={`main-nav ${menuOpen ? "nav-open" : ""}`}>
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMenu}
              >
                {item.label}
              </a>
            ))}
            <a
              className="nav-cta"
              href="#contact"
              onClick={closeMenu}
            >
              Discuss a Project <ArrowRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero-section" id="home">
          <div className="hero-photo" aria-hidden="true" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="container hero-content">
            <div className="hero-copy">
              <div className="hero-label">
                <span className="status-dot" />
                DATA · ANALYTICS · AUTOMATION
              </div>

              <h1>
                Turn Business Data Into{" "}
                <span>Better Decisions.</span>
              </h1>

              <p className="hero-description">
                We help businesses organize data, simplify reporting,
                and discover actionable insights through practical
                data solutions.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#contact">
                  Discuss a Project <ArrowRight size={18} />
                </a>
                <a className="button button-outline" href="#services">
                  Explore Our Services <ArrowDownRight size={18} />
                </a>
              </div>

              <div className="hero-points">
                <span><CheckCircle2 size={17} /> Practical solutions</span>
                <span><CheckCircle2 size={17} /> Clear reporting</span>
                <span><CheckCircle2 size={17} /> Business-focused</span>
              </div>
            </div>

            <div className="hero-note">
              <span className="hero-note-icon">
                <ChartNoAxesCombined size={22} />
              </span>
              <div>
                <strong>Clarity from data</strong>
                <p>Insights that support better decisions.</p>
              </div>
            </div>

            <a className="scroll-cue" href="#services">
              <span /> Scroll to explore
            </a>
          </div>
        </section>

        <section className="intro-strip">
          <div className="container intro-strip-inner">
            <p>
              <span className="intro-mark">H.</span>
              Making business data more useful, accessible, and actionable.
            </p>
            <a href="#about">Get to know us <ArrowRight size={16} /></a>
          </div>
        </section>

        <section className="section services-section" id="services">
          <div className="container">
            <SectionHeading
              eyebrow="WHAT WE DO"
              title="Data solutions built around your business."
              description="From understanding your data to presenting the right insights, we focus on solutions that address real business needs."
            />

            <div className="services-grid">
              {services.map((service) => {
                const Icon = service.icon;

                return (
                  <article className="service-card" key={service.number}>
                    <div className="service-image-wrap">
                      <img
                        src={service.image}
                        alt=""
                        className="service-image"
                        loading="lazy"
                      />
                      <span className="service-number">
                        {service.number}
                      </span>
                      <span className="service-image-icon">
                        <Icon size={22} />
                      </span>
                    </div>

                    <div className="service-card-content">
                      <h3>{service.title}</h3>
                      <p>{service.description}</p>

                      <div className="service-tags">
                        {service.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>

                      <a
                        className="text-link"
                        href={`#contact`}
                        onClick={() =>
                          setForm((previous) => ({
                            ...previous,
                            service: service.title,
                          }))
                        }
                      >
                        Discuss this service <ArrowRight size={16} />
                      </a>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="solutions-section" id="solutions">
          <div className="solutions-photo" aria-hidden="true" />
          <div className="container solutions-layout">
            <div className="solutions-copy">
              <span className="eyebrow">BUSINESS CHALLENGES</span>
              <h2>
                Less time managing data.
                <span> More time using it.</span>
              </h2>
              <p>
                Good data solutions start with understanding the
                challenge. We work toward practical ways to make
                information easier to manage and act on.
              </p>
              <a className="button button-primary" href="#contact">
                Let's Talk About Your Needs <ArrowRight size={18} />
              </a>
            </div>

            <div className="solution-list">
              {solutions.map((solution, index) => {
                const Icon = solution.icon;

                return (
                  <article className="solution-item" key={solution.title}>
                    <div className="solution-icon"><Icon size={23} /></div>
                    <div>
                      <span className="solution-index">
                        CHALLENGE 0{index + 1}
                      </span>
                      <h3>{solution.title}</h3>
                      <p>{solution.text}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="approach-section section">
          <div className="container">
            <SectionHeading
              eyebrow="OUR APPROACH"
              title="Simple, collaborative, outcome-focused."
              description="A clear process helps keep each project focused on the problem it is meant to solve."
              centered
            />

            <div className="approach-grid">
              {[
                ["01", "Understand", "Learn about your goals, data, and current challenges."],
                ["02", "Analyze", "Review the available information and identify what matters."],
                ["03", "Build", "Develop a practical report, dashboard, or data workflow."],
                ["04", "Improve", "Review the outcome and identify useful next steps."],
              ].map(([number, title, description]) => (
                <article className="approach-card" key={number}>
                  <span className="approach-number">{number}</span>
                  <div className="approach-line" />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="about-section section" id="about">
          <div className="container about-layout">
            <div className="founder-visual">  
              <div className="founder-photo">
                <img
                  src="/founder.png"
                  alt="Founder of Hanalytics Data"
                  className="founder-image"
                />
              </div>
              <div className="founder-caption">
                <span className="founder-caption-dot" />
                <div>
                  <strong>Founder-Led approach</strong>
                  <p>Turning complexity into clarity.</p>
                </div>
              </div>
              
            </div>

            <div className="about-copy">
              <span className="eyebrow">ABOUT HANALYTICS DATA</span>
              <h2>
                A practical approach to making data <span>work for you.</span>
              </h2>
              <p>
                Hanalytics Data was created with a simple goal: help
                businesses make better use of their data. We focus on
                practical analytics, clear reporting, and solutions
                designed around real business needs.
              </p>
              <p>
                Our approach starts by listening, understanding the
                challenge, and building a solution that is useful,
                understandable, and aligned with the business goal.
              </p>

              <div className="founder-bio">
                <span className="founder-bio-label">MEET THE FOUNDER</span>
                <h3>Hari Ragavendiran R</h3>
                <p className="founder-role">Founder & CEO of Hanalytics Data</p>
                <p>
                  With a technical background and an interest in data
                  and business problem-solving, I am building Hanalytics
                  Data to help organizations turn information into
                  meaningful business insights.
                </p>
              </div>

              <a className="text-link" href="#contact">
                Connect with us <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>
        
        
        <section className="cofounder-section section" id="cofounder">
          <div className="container cofounder-layout">
            <div className="cofounder-visual">
              <img
                src="/cofounder.png"
                alt="Tamilarasan J, Co-Founder of Hanalytics Data"
                className="cofounder-image"
                loading="lazy"
              />

              <div className="cofounder-caption">
                <span className="founder-caption-dot" />
                <div>
                  <strong>Co-Founder & Full-Stack Developer</strong>
                  <p>Building useful digital experiences.</p>
                </div>
              </div>
            </div>

            <div className="cofounder-copy">
              <span className="eyebrow">MEET OUR CO-FOUNDER</span>

              <h2>
                Turning ideas into{" "}
                <span>digital experiences.</span>
              </h2>

              <div className="cofounder-bio">
                <h3>Tamilarasan J</h3>
                <p className="cofounder-role">
                  Co-Founder & Full-Stack Developer
                </p>
                <p>
                  Focused on building responsive web applications,
                  reliable backend systems, and seamless digital
                  experiences that help businesses grow.
                </p>
              </div>

              <a className="text-link" href="#contact">
                Connect with us <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </section>


        <section className="contact-section section" id="contact">
          <div className="container contact-layout">
            <div className="contact-copy">
              <span className="eyebrow">LET'S WORK TOGETHER</span>
              <h2>
                Have a business challenge?
                <span> Let's talk data.</span>
              </h2>
              <p>
                Tell us what you are trying to solve. We'll use your
                enquiry to understand your needs and discuss the next
                steps.
              </p>

              <div className="contact-detail">
                <span className="contact-detail-icon"><Mail size={19} /></span>
                <div>
                  <small>EMAIL US</small>
                  <a href="mailto:contact@hanalyticsdata.in">
                    contact@hanalyticsdata.in
                  </a>
                </div>
              </div>

              <div className="contact-detail">
                <span className="contact-detail-icon"><MapPin size={19} /></span>
                <div>
                  <small>WORKING WITH BUSINESSES</small>
                  <p>India · Remote collaboration</p>
                </div>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-heading">
                <span>PROJECT ENQUIRY</span>
                <h3>Tell us about your project.</h3>
              </div>

              <label htmlFor="name">Your name</label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                required
              />

              <label htmlFor="email">Work email</label>
              <input
                id="email"
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
                required
              />

              <label htmlFor="service">What do you need help with?</label>
              <select
                id="service"
                value={form.service}
                onChange={(event) =>
                  setForm({ ...form, service: event.target.value })
                }
              >
                {services.map((service) => (
                  <option key={service.number} value={service.title}>
                    {service.title}
                  </option>
                ))}
              </select>

              <label htmlFor="message">Project details</label>
              <textarea
                id="message"
                rows="4"
                placeholder="Briefly describe your business challenge..."
                value={form.message}
                onChange={(event) =>
                  setForm({ ...form, message: event.target.value })
                }
                required
              />

              <button
                className="button button-primary form-submit"
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Enquiry"}
                {!isSubmitting && <Send size={17} />}
              </button>
              {submitMessage && (
                <p
                  className={`form-note ${submitError ? "form-note-error" : "form-note-success"}`}
                  role="status"
                  aria-live="polite"
                >
                  {submitMessage}
                </p>
              )}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Logo />
            <p>
              Practical data solutions for clearer reporting
              and better business decisions.
            </p>
          </div>

          <div className="footer-links">
            <span>EXPLORE</span>
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>{item.label}</a>
            ))}
          </div>

          <div className="footer-links footer-contact">
            <span>GET IN TOUCH</span>
            <a href="mailto:contact@hanalyticsdata.in">
              contact@hanalyticsdata.in
            </a>
            <a href="#contact">Discuss a project <ArrowRight size={14} /></a>
          </div>
        </div>

        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Hanalytics Data. All rights reserved.</p>
          <p>Turning data into direction.</p>
        </div>
      </footer>
    </>
  );
}

export default App;
