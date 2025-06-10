import './MethodologySection.css'

const workflow = [
  {
    phase: 'Phase 1: Company Identification',
    details: [
      'Compile a list of 10+ standout companies per sector (Digital Marketing, Creative Tech, AI Startups).',
      'Prioritize based on AI integration, innovation culture, growth stage, and fit for mid-market/enterprise sales.'
    ]
  },
  {
    phase: 'Phase 2: Role Matching',
    details: [
      'Identify open Account Executive roles at each company.',
      'Prioritize listings referencing CRM expertise, sales automation, and AI-powered workflows.'
    ]
  },
  {
    phase: 'Phase 3: Profiles & Descriptions',
    details: [
      'For each company, provide a snapshot: mission, values, key markets, leadership.',
      'Break down role duties, required experience, and AI tool fluency.',
      'Include compensation, location, and benefits where available.'
    ]
  },
  {
    phase: 'Phase 4: Strategic Insights & Recommendations',
    details: [
      'Show how to stand out with AI: resume language, cover letter framing, interview storytelling.',
      'Outline networking moves: targeted outreach, events, micro-communities.',
      'Detail application strategy: role-specific tailoring, showcasing AI-backed success metrics.'
    ]
  }
];

export const MethodologySection = () => (
  <section className="methodology-section section">
    <div className="container">
      <h2 className="section-title gradient-text">Workflow Overview</h2>
      <p className="section-subtitle">
        A step-by-step process for targeting, researching, and landing elite sales roles in AI and tech.
      </p>
      <div className="workflow-grid">
        {workflow.map((step, idx) => (
          <div className="workflow-card" key={step.phase}>
            <div className="phase-number">{idx + 1}</div>
            <h3>{step.phase}</h3>
            <ul>
              {step.details.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  </section>
); 