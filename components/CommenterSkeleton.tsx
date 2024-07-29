import React from 'react'
import { Skeleton } from './ui/skeleton'

const CommenterSkeleton = () => {
  return (
    <div className='mt-20 flex flex-col gap-y-1'>
        <Skeleton className='h-12 w-[20rem]'/>
        <div className='flex gap-1'>
            <Skeleton className='h-12 w-12 rounded-full'/>
            <Skeleton className='h-12 w-44'/>
        </div>
    </div>
  )
}

export default CommenterSkeleton