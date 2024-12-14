import { ExcerciseDto } from '@/types/excercise';
import useExcerciseStore from '@/zustand/useExcerciseStore'
import { useRequest } from 'ahooks';
import { Button } from 'antd';
import React, { useState } from 'react'

const Flashcard = () => {

    const { excercises } = useExcerciseStore();

    const [flip, setFlip] = useState<boolean>(false);
    const [excercise, setExcercise] = useState<ExcerciseDto>();

    const handleFlip = () => {
        setFlip(!flip)
    }

    const { } = useRequest(async () => {
        console.log(excercise);
        setExcercise(excercises?.items[0])
    })


    return (
        <>
            <div onClick={handleFlip} className='flex h-full flex-col gap-4 cursor-pointer'>
                <div className="group h-5/6 w-full [perspective:1000px]">
                    <div className={`relative h-full w-full rounded-xl bg-gray-200 transition-all duration-500 [transform-style:preserve-3d] ${flip ? '[transform:rotateY(180deg)]' : ''}`}>
                        {/* Front Face */}
                        <div className="absolute inset-0 h-full w-full rounded-xl [backface-visibility:hidden]">
                            <div className="flex min-h-full flex-col items-center justify-center">
                                <h2 className="text-2xl font-bold mb-4">Question</h2>
                                <p className="text-lg text-pretty text-center mb-4">
                                    {excercise?.question}
                                </p>
                            </div>
                        </div>
                        {/* Back Face */}
                        <div className="absolute inset-0 h-full w-full rounded-xl px-12 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                            <div className="flex min-h-full flex-col items-center justify-center">
                                <h2 className="text-2xl font-bold mb-4">Answer</h2>
                                <p className="text-lg text-pretty text-center mb-4">
                                    {}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex h-1/6 gap-4 justify-center items-center'>
                    <Button>Previous</Button>
                    <Button>Next</Button>
                </div>
            </div>
        </>
    )
}

export default Flashcard
