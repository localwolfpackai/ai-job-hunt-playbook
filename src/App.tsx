import React, { useId, useMemo, useState } from 'react'

type NavItem = { label: string; href: `#${string}` }

type Resource = {
  title: string
  href: string
  note: string
  tag?: string
}

type CopyAsset = {
  title: string
  description: string
  body: string
}

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

function useCopyToClipboard() {
  const [status, setStatus] = useState<'idle' | 'copied' | 'error'>('idle')

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setStatus('copied')
      window.setTimeout(() => setStatus('idle'), 1200)
    } catch (err) {
      console.error('Clipboard write failed', err)
      setStatus('error')
      window.setTimeout(() => setStatus('idle'), 1600)
    }
  }

  return { status, copy }
}

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 flex items-center">
        <span className="font-mono text-[20px] tracking-[0.22em] text-[var(--text-primary)]">LUPO</span>
      </div>
      <div className="hidden sm:block">
        <div className="text-sm text-[var(--text-muted)] leading-tight">the mess is the method</div>
      </div>
    </div>
  )
}

function Header({ items }: { items: NavItem[] }) {
  return (
    <header className="sticky top-0 z-50 bg-[color:var(--background)]/70 backdrop-blur border-b border-white/10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="h-16 flex items-center justify-between">
          <a href="#top" className="rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-end)]">
            <Logo />
          </a>

          <nav className="hidden md:flex items-center gap-6 text-sm">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-end)] rounded"
              >
                {it.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto max-w-6xl px-6 py-12 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-[var(--text-muted)]">Lupo Studios © 2026</div>
        <div className="text-sm text-[var(--text-muted)]">
          Built to be copied. Verify everything. Ship with taste.
        </div>
      </div>
    </footer>
  )
}

function Kicker({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-xs uppercase tracking-[0.28em] text-[var(--text-muted)]">{children}</div>
  )
}

function Section(props: {
  id: string
  kicker: string
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <section id={props.id} className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="max-w-3xl">
          <Kicker>{props.kicker}</Kicker>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--text-primary)]">{props.title}</h2>
          {props.subtitle ? (
            <p className="mt-4 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">{props.subtitle}</p>
          ) : null}
        </div>
        <div className="mt-10">{props.children}</div>
      </div>
    </section>
  )
}

function Card(props: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cx(
        'rounded-2xl border border-white/10 bg-[color:var(--surface)]/60 shadow-[0_8px_32px_rgba(0,0,0,0.18)]',
        'transition duration-300 ease-in-out',
        props.className,
      )}
    >
      {props.children}
    </div>
  )
}

function CopyBlock(props: { title: string; description: string; body: string }) {
  const { status, copy } = useCopyToClipboard()
  const uid = useId()

  return (
    <Card className="overflow-hidden">
      <div className="px-6 py-5 border-b border-white/10 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-base font-semibold text-[var(--text-primary)]">{props.title}</div>
          <div className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">{props.description}</div>
        </div>
        <button
          type="button"
          onClick={() => copy(props.body)}
          className={cx(
            'shrink-0 rounded-lg px-3 py-2 text-sm font-medium',
            'border border-white/10 bg-[color:var(--background)]/40 hover:bg-[color:var(--background)]/70',
            'transition duration-200 ease-in-out',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-end)]',
          )}
          aria-describedby={uid}
        >
          {status === 'copied' ? 'Copied' : status === 'error' ? 'Copy failed' : 'Copy'}
        </button>
      </div>
      <div className="px-6 py-5">
        <pre className="text-[13px] leading-relaxed text-[var(--text-primary)] overflow-x-auto font-mono whitespace-pre-wrap">
          <code>{props.body}</code>
        </pre>
        <div id={uid} className="sr-only">
          Copies this template to your clipboard.
        </div>
      </div>
    </Card>
  )
}

function ResourceRow({ r }: { r: Resource }) {
  return (
    <a
      href={r.href}
      target="_blank"
      rel="noreferrer"
      className={cx(
        'group rounded-xl border border-white/10 bg-[color:var(--background)]/20 hover:bg-[color:var(--background)]/40',
        'transition duration-200 ease-in-out',
        'px-5 py-4 flex items-start gap-4',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-end)]',
      )}
    >
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-3">
          <div className="text-sm font-semibold text-[var(--text-primary)] truncate">{r.title}</div>
          {r.tag ? (
            <span className="text-[11px] uppercase tracking-[0.22em] text-[var(--text-muted)] border border-white/10 rounded-full px-2 py-1">
              {r.tag}
            </span>
          ) : null}
        </div>
        <div className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">{r.note}</div>
      </div>
      <div className="text-sm text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-colors duration-200 ease-in-out">
        Open
      </div>
    </a>
  )
}

function DetailsPlay(props: { title: string; summary: string; bullets: string[] }) {
  return (
    <details className="rounded-2xl border border-white/10 bg-[color:var(--surface)]/40 px-6 py-5">
      <summary className="cursor-pointer list-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-base font-semibold text-[var(--text-primary)]">{props.title}</div>
            <div className="mt-1 text-sm text-[var(--text-muted)] leading-relaxed">{props.summary}</div>
          </div>
          <div className="text-sm text-[var(--text-muted)]">Expand</div>
        </div>
      </summary>
      <ul className="mt-5 space-y-2 text-sm text-[var(--text-muted)] leading-relaxed list-disc pl-5">
        {props.bullets.map((b) => (
          <li key={b}>{b}</li>
        ))}
      </ul>
    </details>
  )
}

export default function App() {
  const nav = useMemo<NavItem[]>(
    () => [
      { label: 'System', href: '#system' },
      { label: 'Templates', href: '#templates' },
      { label: 'Resources', href: '#resources' },
      { label: 'Plays', href: '#plays' },
      { label: 'Cadence', href: '#cadence' },
    ],
    [],
  )

  const copyAssets = useMemo<CopyAsset[]>(
    () => [
      {
        title: 'Master Prompt (2026): Target List + Role Map + Talk Track',
        description:
          'One prompt to generate a tight target list, role matches, and narrative assets. Designed for verification and low-noise outputs.',
        body: `Role: Senior Career Strategist + Tech Sales Operator (Mid-Market/Enterprise AE)\n\nContext:\n- Candidate: AI-fluent AE (pipeline creation, enterprise process, measurable wins)\n- Target: AI-forward companies (marketing/creative tech/AI infra + apps)\n- Constraints: prioritize roles with clear ICP, sales motion clarity, and evidence of GTM rigor\n\nTask:\n1) Build a shortlist of 25 companies (max 5 per subcategory) with:\n   - Company: name, category, stage, why-now (1 line)\n   - Signals: 3 concrete signals (product, hiring, GTM, customer proof)\n   - Risk: 1 risk to diligence\n\n2) For each company, propose 1-2 likely-fit roles (AE/Strategic AE/MM AE) and:\n   - Primary buyer + ICP\n   - Typical deal size + cycle (estimate if unknown)\n   - 3 qualification questions I should ask in first call\n\n3) Write assets:\n   - 1 LinkedIn connect note (<= 250 chars) to hiring manager\n   - 1 cold email (<= 130 words) to hiring manager\n   - 1 recruiter reply that reframes me in outcomes + AI leverage (<= 120 words)\n\nRules:\n- Be decisive. If data is uncertain, label it as an estimate and explain the assumption.\n- Provide sources to verify (company blog, docs, customer stories, job post, LinkedIn signals).\n- Output in clean Markdown with tables for sections (1) and (2).`,
      },
      {
        title: 'LinkedIn Connect Note (Hiring Manager)',
        description: 'Short, specific, no fluff. Aimed at getting a reply, not telling your life story.',
        body: `Hey {FirstName} — I’ve been tracking {Company}’s push into {specific motion}. I’m an AE with measurable wins in {ICP} + I use AI for high-signal prospecting + deal execution. Open to a quick 10 min chat this week?`,
      },
      {
        title: 'Cold Email (Hiring Manager)',
        description: 'Outcome-first + one credible insight + a clean ask.',
        body: `Subject: {Company} AE — quick signal + question\n\n{FirstName} — I’m an AE focused on {ICP}. Recent wins: {win_1}, {win_2}.\n\nI noticed {Company} is leaning into {signal}. If your team is solving {problem}, I can help.\n\nQuestion: for this role, is success defined more by {metric A} or {metric B} in the first 90 days?\n\nIf useful, I can send a 1-page plan. Open to 12 minutes this week?\n\n— {YourName}`,
      },
      {
        title: 'Recruiter Reply (Control the Frame)',
        description: 'Use this when recruiters are vague or pushing low-signal screens.',
        body: `Thanks — before we schedule, can you confirm 3 things:\n1) ICP + primary buyer\n2) typical ACV + sales cycle\n3) what “good” looks like in the first 90 days\n\nIf it’s a fit: I’m an AE with {proof}. I use AI to compress research + personalization without sacrificing quality, and I’m disciplined on pipeline hygiene + forecasting. Happy to move fast once the motion is clear.`,
      },
      {
        title: '30/60/90 (One-Page Outline)',
        description: 'A polished structure you can paste into a doc and tailor per company.',
        body: `30 DAYS — LEARN + DIAGNOSE\n- Product: value props by persona, top 3 objections, competitive landmines\n- GTM: ICP, lead sources, handoffs, pipeline stages, win/loss notes\n- Calls: 10 customer conversations + 10 internal stakeholder interviews\n\n60 DAYS — BUILD PIPELINE + PROVE MOTION\n- Target list: 60 accounts with tiering + hypotheses per account\n- Outreach: sequence + messaging framework + QA rubric\n- Pipeline: create {X} qualified opportunities with clear next steps\n\n90 DAYS — SCALE + SYSTEMIZE\n- Repeatable plays: 2-3 proven sequences + discovery map\n- Forecasting: consistent stage hygiene + risk flags\n- Enablement: share one “what’s working” memo with clips + examples`,
      },
      {
        title: 'Brag Doc (Weekly, 10 minutes)',
        description: 'This becomes resume bullets, interview stories, and negotiating leverage.',
        body: `WEEK OF: {date}\n\nOUTCOMES\n- Pipeline created: $X (sources: ...)\n- Revenue influenced/closed: $X\n- Meetings booked: # (conversion rate)\n\nHARD PROOFS\n- 1 call clip timestamp / key moment\n- 1 email/sequence that performed\n- 1 objection I handled + how\n\nLEARNING\n- What I tested\n- What worked\n- What I’ll change next week`,
      },
    ],
    [],
  )

  const resources = useMemo<Resource[]>(
    () => [
      {
        title: 'LinkedIn Sales Navigator (filters + alerts)',
        href: 'https://www.linkedin.com/sales/',
        note: 'Set alerts for job changes, hiring manager moves, and account intent signals. Build lists that update themselves.',
        tag: 'Core',
      },
      {
        title: 'Clay (data enrichment + outbound workflows)',
        href: 'https://www.clay.com/',
        note: 'Use sparingly: enrich + qualify + personalize at scale with QA gates to avoid “AI spam.”',
        tag: 'Workflow',
      },
      {
        title: 'Perplexity (fast research + source links)',
        href: 'https://www.perplexity.ai/',
        note: 'Use for quick diligence and “what changed recently?” with citations you can verify.',
        tag: 'Research',
      },
      {
        title: 'OpenAI / ChatGPT (drafting + simulation)',
        href: 'https://chat.openai.com/',
        note: 'Best for messaging iterations, interview simulation, and turning notes into crisp assets.',
        tag: 'Model',
      },
      {
        title: 'Anthropic Claude (long-form synthesis)',
        href: 'https://claude.ai/',
        note: 'Great for dense docs: take a 10-page narrative and produce a 1-page talk track.',
        tag: 'Model',
      },
      {
        title: 'Google Gemini (broad research + cross-check)',
        href: 'https://gemini.google.com/',
        note: 'Use as a second opinion and for alternative angles in market/customer research.',
        tag: 'Model',
      },
      {
        title: 'G2 + case studies (proof over claims)',
        href: 'https://www.g2.com/',
        note: 'Scan review themes and customer stories to sharpen discovery questions and positioning.',
        tag: 'Diligence',
      },
      {
        title: 'Built In (startup/tech roles)',
        href: 'https://builtin.com/jobs',
        note: 'Useful for early-stage roles; cross-check role quality with leadership and GTM signals.',
        tag: 'Jobs',
      },
      {
        title: 'Wellfound (AngelList) (startup roles)',
        href: 'https://wellfound.com/jobs',
        note: 'Good for startups; filter aggressively and validate comp/motion before spending time.',
        tag: 'Jobs',
      },
      {
        title: 'Otta (curated roles + signals)',
        href: 'https://otta.com/',
        note: 'Use as a curated feed; still run diligence on product and sales motion clarity.',
        tag: 'Jobs',
      },
    ],
    [],
  )

  const trackerHeaders = useMemo(
    () =>
      `company,category,stage,role,location,comp_range,source_link,signal_1,signal_2,signal_3,risk,primary_buyer,acv_estimate,cycle_estimate,first_outreach_date,status,next_step,notes`,
    [],
  )

  return (
    <div id="top" className="min-h-dvh bg-[var(--background)] text-[var(--text-primary)]">
      <Header items={nav} />

      <main>
        <div className="mx-auto max-w-6xl px-6 pt-16 sm:pt-20 pb-12">
          <div className="max-w-3xl">
            <Kicker>AI JOB HUNT PLAYBOOK</Kicker>
            <h1 className="mt-4 text-4xl sm:text-6xl font-semibold tracking-tight text-[var(--text-primary)]">
              Editorial, minimal, and built for outcomes.
            </h1>
            <p className="mt-5 text-base sm:text-lg text-[var(--text-muted)] leading-relaxed">
              A 2026-grade system for Account Executives: target intelligently, message with restraint, prove competence fast,
              and treat AI as leverage—not a personality.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#templates"
                className={cx(
                  'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium',
                  'bg-[var(--text-primary)] text-[var(--background)] hover:opacity-90 transition duration-200 ease-in-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-end)]',
                )}
              >
                Copy the templates
              </a>
              <a
                href="#resources"
                className={cx(
                  'inline-flex items-center justify-center rounded-xl px-5 py-3 text-sm font-medium',
                  'border border-white/10 bg-[color:var(--background)]/30 hover:bg-[color:var(--background)]/60 text-[var(--text-primary)] transition duration-200 ease-in-out',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-end)]',
                )}
              >
                Open the resource vault
              </a>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                title: 'Signal over volume',
                body: 'Fewer targets, deeper diligence, cleaner outreach. The market punishes generic “spray and pray.”',
              },
              {
                title: 'Narrative assets',
                body: 'You need a talk track, 3 deal stories, and a 90-day plan that reads like an operator wrote it.',
              },
              {
                title: 'AI with QA gates',
                body: 'Use models to compress research + writing time. Never outsource judgment or truth.',
              },
            ].map((x) => (
              <Card key={x.title} className="px-6 py-5">
                <div className="text-sm font-semibold text-[var(--text-primary)]">{x.title}</div>
                <div className="mt-2 text-sm text-[var(--text-muted)] leading-relaxed">{x.body}</div>
              </Card>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10" />

        <Section
          id="system"
          kicker="THE SYSTEM"
          title="A calm process that wins in 2026."
          subtitle="Recruiting is noisier. Signal is rarer. Your edge is taste: what you ignore, what you verify, and how quickly you produce proof."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DetailsPlay
              title="Targeting: 25 companies, not 250"
              summary="Build a shortlist you can actually diligence and attack with precision."
              bullets={[
                'Cap categories to avoid “generic AE drift”: AI apps, AI infra, marketing platforms, creative tools, data/ops.',
                'Require three concrete signals (customers, hiring patterns, GTM motion, product traction).',
                'One risk per company: churn risk, unclear ICP, channel conflict, weak enablement, inconsistent messaging.',
              ]}
            />
            <DetailsPlay
              title="Diligence: prove the motion exists"
              summary="Don’t fall in love with the product. Fall in love with a clear buyer and a repeatable sales motion."
              bullets={[
                'Identify primary buyer + champion. If they can’t name it, that’s a red flag.',
                'Estimate ACV + cycle and ask directly on screen: “Is this a $15k or a $150k motion?”',
                'Read 10 reviews and 3 case studies. Extract objections and “why we switched.”',
              ]}
            />
            <DetailsPlay
              title="Outreach: personalize lightly, intelligently"
              summary="One real insight beats five paragraphs. Keep it human and testable."
              bullets={[
                'Write a single hypothesis per account: “I think you’re solving X because Y.”',
                'Keep first touch under 130 words. Ask one high-quality question.',
                'Build a 7-touch sequence with 2 “breakup” touches that are polite and specific.',
              ]}
            />
            <DetailsPlay
              title="Interviews: treat it like a deal cycle"
              summary="Run discovery. Confirm success criteria. Close for next steps."
              bullets={[
                'Ask for the scorecard: what differentiates top performers here?',
                'Bring proof: a one-page 30/60/90 and two deal stories mapped to their ICP.',
                'After every round: send a recap with risks + mitigations. This is rare and it lands.',
              ]}
            />
          </div>
        </Section>

        <Section
          id="templates"
          kicker="SHARABLES"
          title="Templates you can copy and ship."
          subtitle="These are intentionally short. The goal is clarity and restraint, not “AI cleverness.”"
        >
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
            {copyAssets.map((a) => (
              <CopyBlock key={a.title} title={a.title} description={a.description} body={a.body} />
            ))}
          </div>
        </Section>

        <Section
          id="resources"
          kicker="RESOURCE VAULT"
          title="Tools and references (low-noise, high-leverage)."
          subtitle="Use tools to compress time, not to inflate output. If it doesn’t increase signal, it’s a distraction."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {resources.map((r) => (
              <ResourceRow key={r.href} r={r} />
            ))}
          </div>
        </Section>

        <Section
          id="plays"
          kicker="PLAYS"
          title="Advanced tactics, without the chaos."
          subtitle="This is where most people overcomplicate. Keep the system tight and repeatable."
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <DetailsPlay
              title="ATS: write for humans, structure for machines"
              summary="Your resume should read cleanly in a PDF and parse cleanly in an ATS."
              bullets={[
                'Use a simple single-column layout. No icons, no text boxes, no weird columns.',
                'Mirror key phrases from the JD, but keep them anchored to outcomes.',
                'Bullet formula: outcome + scope + method + proof (numbers, timeframe, constraints).',
              ]}
            />
            <DetailsPlay
              title="AI proof: demonstrate taste, not novelty"
              summary="Everyone says “AI-first.” Prove you can use AI responsibly and effectively."
              bullets={[
                'Have 2 examples: (1) research compression, (2) messaging QA/rubric.',
                'Show a QA gate: how you detect hallucinations and verify claims.',
                'Talk in business terms: pipeline quality, cycle time, conversion rate, forecast accuracy.',
              ]}
            />
            <DetailsPlay
              title="Hiring manager outreach: treat it like ABM"
              summary="Small list, high context, crisp messaging, consistent follow-up."
              bullets={[
                'Build account dossiers: ICP, buyer map, trigger events, top objections.',
                'Sequence: connect note → email → comment on a post → value add → breakup.',
                'Track everything in a sheet. If you don’t measure, you can’t iterate.',
              ]}
            />
            <DetailsPlay
              title="Negotiation: trade, don’t ask"
              summary="Clean asks with clean tradeoffs win faster than vague “can you do better?”"
              bullets={[
                'Anchor to role scope + ramp expectations, not your rent.',
                'Trade: “If we can get X on base/OTE/equity, I can sign by Friday.”',
                'Confirm territory, quota setting, and ramp before you accept numbers.',
              ]}
            />
          </div>
        </Section>

        <Section
          id="cadence"
          kicker="CADENCE"
          title="A weekly cadence that compounds."
          subtitle="This keeps you moving without thrashing. It’s designed to be sustainable and measurable."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="px-6 py-5">
              <div className="text-sm font-semibold text-[var(--text-primary)]">Monday (45 min)</div>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)] leading-relaxed list-disc pl-5">
                <li>Review pipeline + targets. Cut 20% low-signal companies.</li>
                <li>Pick 5 accounts for deep diligence + 10 for light outreach.</li>
                <li>Write 1 talk track improvement based on last week’s feedback.</li>
              </ul>
            </Card>
            <Card className="px-6 py-5">
              <div className="text-sm font-semibold text-[var(--text-primary)]">Tue–Thu (60–90 min/day)</div>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)] leading-relaxed list-disc pl-5">
                <li>Outreach: 10 high-quality touches/day, max.</li>
                <li>Interview prep: one deal story/day, mapped to their ICP + buyer.</li>
                <li>Network: 2 warm intros or micro-community touches/day.</li>
              </ul>
            </Card>
            <Card className="px-6 py-5">
              <div className="text-sm font-semibold text-[var(--text-primary)]">Friday (30 min)</div>
              <ul className="mt-3 space-y-2 text-sm text-[var(--text-muted)] leading-relaxed list-disc pl-5">
                <li>Update your brag doc. Capture proof and learnings.</li>
                <li>Review what converted (replies, screens, loops). Adjust the sequence.</li>
                <li>Pre-write next week’s top 5 messages while context is fresh.</li>
              </ul>
            </Card>
            <CopyBlock
              title="Tracker CSV Headers"
              description="Start a sheet with columns that actually help you iterate. Copy and paste into row 1."
              body={trackerHeaders}
            />
          </div>
        </Section>
      </main>

      <Footer />
    </div>
  )
}

