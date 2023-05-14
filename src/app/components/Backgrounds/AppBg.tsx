import Image from 'next/image'

export default function AppBg() {
  return (
    <div>
      <Image
        src="/bg-cloud.png"
        fill
        alt="Clouds app background"
        className="scale-[-1] rounded-[24px] blur-[-2px]"
      />
    </div>
  )
}
