
import Hero from './hero'
import Explore from './explore'
import About from './about'



export default function Home() {
  return (
    <div className=''>
      <Hero />
      <div className='bg-black/40 backdrop-blur-sm'>
        <About />
        <Explore />
      </div>
    </div>
  )
}
