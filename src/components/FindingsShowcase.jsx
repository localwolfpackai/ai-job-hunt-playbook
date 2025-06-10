import './FindingsShowcase.css'

export const FindingsShowcase = () => (
  <section className="findings-section section findings-modern-bg">
    <div className="container">
      <h2 className="section-title gradient-text">Key Findings & Outputs</h2>
      <p className="section-subtitle">
        As you work through the workflow, your curated company lists, role matches, and strategic insights will be displayed here.
      </p>
      <div className="findings-placeholder clever-message">
        <p>
          <span role="img" aria-label="spark">✨</span> <strong>Insight Network:</strong> Your AI-powered discoveries will soon populate this space—each connection, company, and strategy forming a living map of your job search journey. <span role="img" aria-label="map">🗺️</span>
        </p>
        <div className="node-graph-bg" aria-hidden="true"></div>
      </div>
    </div>
  </section>
); 