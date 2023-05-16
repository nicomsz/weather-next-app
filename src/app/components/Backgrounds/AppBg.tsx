import Image from 'next/image'

export default function AppBg() {
  return (
    <div>
      <Image
        src="/bg-sun-clouds.png"
        fill
        alt="Clouds app background"
        className=" rounded-3xl blur-[-2px] lg:rounded-[24px]"
      />
    </div>
  )
}
