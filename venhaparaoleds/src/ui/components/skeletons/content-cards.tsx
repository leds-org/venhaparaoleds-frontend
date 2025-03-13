import { shimmer } from '@/ui/components/skeletons/shimmer'

export function SkeletonContentCard() {
  return (
    <div
      className={`${shimmer} relative flex flex-row items-start gap-3 p-4 overflow-hidden rounded-xl shadow-md bg-gray-100`}
    >
      <div className="flex flex-col gap-1 leading-none">
        <div className="w-40 h-8 rounded-xl bg-gray-200"></div>

        <div className="flex flex-row flex-wrap gap-1 mb-1">
          <div className="w-20 h-6 rounded-xl bg-gray-200"></div>
          <div className="w-20 h-6 rounded-xl bg-gray-200"></div>
          <div className="w-20 h-6 rounded-xl bg-gray-200"></div>
        </div>

        <div className="w-32 h-5 rounded-xl bg-gray-200"></div>
        <div className="w-20 h-5 rounded-xl bg-gray-200"></div>
      </div>
    </div>
  )
}

export function SkeletonContentCards() {
  const qtd = 12

  const contentCards: number[] = Array.from({ length: qtd }, (_, i) => i)

  return (
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {contentCards.map((i) => (
        <SkeletonContentCard key={i} />
      ))}
    </div>
  )
}