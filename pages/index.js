
import Hero from './hero'
import Explore from './explore'
import About from './about'
import Cursor from '@/components/Cursor'



export default function Home() {
  return (
    <div className=''>
      <Cursor/>
     
      <Hero />
      <div className='bg-black/40 backdrop-blur-sm'>
        <About />
        <Explore />
      </div>
    </div>
  )
}
