import './AIModelStrategySection.css'

const models = [
  {
    name: 'ChatGPT (OpenAI)',
    strengths: [
      'Best for: creative writing, prompt iteration, and interview practice.',
      'Great at: summarizing job descriptions, generating tailored cover letters, and simulating recruiter Q&A.'
    ],
    tips: [
      'Use for: brainstorming outreach messages, refining resume bullets, and mock interviews.'
    ]
  },
  {
    name: 'Gemini (Google)',
    strengths: [
      'Best for: research, up-to-date company info, and extracting structured data from web results.',
      'Great at: finding recent news, company financials, and market trends.'
    ],
    tips: [
      'Use for: company research, market analysis, and validating AI findings.'
    ]
  },
  {
    name: 'Claude (Anthropic)',
    strengths: [
      'Best for: long-form synthesis, ethical analysis, and nuanced communication.',
      'Great at: summarizing large documents, analyzing company culture, and drafting thoughtful outreach.'
    ],
    tips: [
      'Use for: deep-dive company profiles, culture fit analysis, and sensitive communications.'
    ]
  },
  {
    name: 'Perplexity',
    strengths: [
      'Best for: rapid Q&A, web search, and fact-checking.',
      'Great at: getting quick answers, verifying job data, and cross-referencing sources.'
    ],
    tips: [
      'Use for: fact-checking, quick research, and supplementing other AI outputs.'
    ]
  }
];

export const AIModelStrategySection = () => (
  <section className="ai-model-strategy-section section">
    <div className="container">
      <h2 className="section-title gradient-text">AI Model Strengths & Strategy</h2>
      <p className="section-subtitle">
        Leverage the unique strengths of each AI model to maximize your job search results.
      </p>
      <div className="ai-models-grid">
        {models.map((model, idx) => (
          <div className="ai-model-card" key={idx}>
            <h3>{model.name}</h3>
            <ul>
              {model.strengths.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
            <div className="ai-model-tips">
              <strong>Tips:</strong>
              <ul>
                {model.tips.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
); 