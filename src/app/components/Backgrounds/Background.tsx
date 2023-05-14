import Image from 'next/image'

export default function Background() {
  return (
    <Image
      src="/bg-cloud.png"
      alt="Clouds background"
      fill
      className="scale-[1] overflow-hidden border-solid border-transparent shadow-none blur-[25px]"
    />
  )
}
