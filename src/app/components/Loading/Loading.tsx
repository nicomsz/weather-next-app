import { Montserrat } from 'next/font/google'
import Background from '../Backgrounds/Background'

const montserrat300 = Montserrat({
  weight: '300',
  subsets: ['latin'],
})
export default function Loading() {
  return (
    <>
      <div className="z-[-1] flex h-screen flex-row items-center justify-center">
        <Background />
        <div className="absolute z-10 mx-auto w-full rounded-[30px] p-10 lg:h-[800px]">
          <div className="text-center">
            <p className={`${montserrat300.className} text-2xl lg:text-5xl`}>
              Carregando... Habilite a localização no seu navegador!
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
