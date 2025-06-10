import './TipsAndTricksSection.css'

const tips = [
  {
    title: 'Iterate Your Prompts',
    description: 'Refine your prompt for each target sector or company. The more specific, the better the AI output.'
  },
  {
    title: 'Cross-Reference Everything',
    description: 'Always verify AI findings with LinkedIn, company sites, and trusted industry sources.'
  },
  {
    title: 'Use Multiple AI Models',
    description: 'Compare outputs from ChatGPT, Gemini, Claude, and Perplexity to get a 360° view.'
  },
  {
    title: 'Mock Interviews with AI',
    description: 'Paste job descriptions into an AI and have it interview you. Practice with real-world scenarios.'
  },
  {
    title: 'Summarize Networking Calls',
    description: 'Use AI to distill your notes from informational interviews into actionable next steps.'
  },
  {
    title: 'Track Your Progress',
    description: 'Keep a spreadsheet of prompts, companies, and outcomes to spot patterns and improve your approach.'
  },
  {
    title: 'Showcase AI Wins',
    description: 'Add case studies to your portfolio: "How AI helped close a $X deal" or "Automated a sales process."'
  },
  {
    title: 'Outcome-First Resume Bullets',
    description: 'Frame your resume bullets around business impact: revenue, pipeline, CAC, or process improvement.'
  },
  {
    title: 'Network in Micro-Communities',
    description: 'Find niche Slack groups, Discords, and forums for AI and tech sales professionals.'
  },
  {
    title: 'Tailor Everything',
    description: 'Customize your resume, cover letter, and outreach for each role. Use AI to help, but always personalize.'
  }
];

export const TipsAndTricksSection = () => (
  <section className="tips-section section">
    <div className="container">
      <h2 className="section-title gradient-text">Pro Tips & Advanced Tactics</h2>
      <p className="section-subtitle">
        Level up your AI-powered job search with these expert strategies.
      </p>
      <div className="tips-grid">
        {tips.map((tip, idx) => (
          <div className="tip-card" key={idx}>
            <h3>{tip.title}</h3>
            <p>{tip.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
); 