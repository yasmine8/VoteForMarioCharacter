import Navbar from './component/Navbar'
import Welcome from './component/Welcome'
import { VotingProvider } from './context/VotingContext'
export default function Home() {
  return (
    <VotingProvider>
      <Navbar />
      <Welcome />
    </VotingProvider>
  )
}
