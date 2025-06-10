import { HeroSection } from './components/HeroSection'
import { PhilosophySection } from './components/PhilosophySection'
import { MasterPromptSection } from './components/MasterPromptSection'
import { MethodologySection } from './components/MethodologySection'
import { AIModelStrategySection } from './components/AIModelStrategySection'
import { FindingsShowcase } from './components/FindingsShowcase'
import { TipsAndTricksSection } from './components/TipsAndTricksSection'

function App() {
  return (
    <div className="app">
      <HeroSection />
      <PhilosophySection />
      <MasterPromptSection />
      <MethodologySection />
      <AIModelStrategySection />
      <FindingsShowcase />
      <TipsAndTricksSection />
    </div>
  )
}

export default App 