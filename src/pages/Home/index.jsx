import Card from '../../components/Card'
import Header from '../../components/Header'
import Pokedex from '../../components/Pokedex'

export default function Home() {
  return (
    <>
    <div className='flex flex-col min-h-screen max-w-screen bg-[#CE092A]'>
      <Header/>
      <Pokedex/>
    </div>
    </>
  )
}