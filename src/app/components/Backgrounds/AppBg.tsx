import Image from 'next/image'

export default function AppBg() {
  return (
    <div>
      <Image
        src="/bg-sun-clouds.png"
        fill
        alt="Clouds app background"
        className=" invisible rounded-none blur-[-2px] lg:visible lg:rounded-[24px]"
      />
    </div>
  )
}
