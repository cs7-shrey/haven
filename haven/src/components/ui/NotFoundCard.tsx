import React from 'react'
import Image from 'next/image'

const NotFound = "/assets/NotFound.svg" 
const NotFoundCard: React.FC<{
    text: string
}> = ({text}) => {
    return (
        <div className='flex flex-col items-center font-bold gap-2'>
            <img 
                src={NotFound} 
                alt="Not Found" 
                className='size-[50%]'
            />
            <div className='text-xl text-center font-mono'>
                {text}
            </div>
        </div>
    )
}

export default NotFoundCard
