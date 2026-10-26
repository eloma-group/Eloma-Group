import { useCallback, useState } from 'react'
import Header from './components/Header'
import Drawer from './components/Drawer'
import Hero from './components/Hero'
import CompanyPanel from './components/CompanyPanel'
import About from './components/About'
import Services from './components/Services'
import Presence from './components/Presence'
import Countries from './components/Countries'
import Community from './components/Community'
import Contact from './components/Contact'
import Footer from './components/Footer'
import { COS, SECTIONS, TOPICS } from './data'
import { useSectionRouting } from './hooks'

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [topic, setTopic] = useState(TOPICS[0])
  const closeMenu = useCallback(() => setMenuOpen(false), [])
  useSectionRouting(SECTIONS)

  const pickTopic = (name: string) => {
    const t = TOPICS.find(o => o.startsWith(name))
    if (t) setTopic(t)
  }

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header menuOpen={menuOpen} onMenu={() => setMenuOpen(true)} />
      <Drawer open={menuOpen} onClose={closeMenu} />
      <main id="main" tabIndex={-1}>
        <Hero />
        <div id="panels">
          {COS.map(c => <CompanyPanel key={c.id} company={c} onPick={pickTopic} />)}
        </div>
        <About />
        <Services />
        <Presence />
        <Countries />
        <Community />
        <Contact topic={topic} onTopic={setTopic} />
      </main>
      <Footer />
    </>
  )
}
