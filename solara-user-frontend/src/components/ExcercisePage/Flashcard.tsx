import { ExcerciseDto } from '@/types/excercise'
import React from 'react'

interface IProps {
    flip: boolean
    handleFlip: () => void,
    excercise: ExcerciseDto
}

const Flashcard = ({ handleFlip, excercise, flip }: IProps) => {
    return (
        <div onClick={handleFlip} className="group h-5/6 w-full [perspective:1000px] cursor-pointer">
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

                        {
                            excercise?.ans[0] === undefined
                                ?
                                'No answer'
                                :
                                (
                                    <div>
                                        <h2 className="text-2xl font-bold mb-4">Answer</h2>
                                        <p className="text-lg text-pretty text-center mb-4">
                                            {excercise?.ans[0].optionText}
                                        </p>
                                        {
                                            excercise?.ans[0].explanation === undefined
                                                ?
                                                <></>
                                                : (
                                                    <div>
                                                        <h2 className="text-xl font-bold mb-4">Explanation</h2>
                                                        <p className="text-lg text-pretty text-center mb-4">
                                                            {excercise?.ans[0].explanation}
                                                        </p>
                                                    </div>
                                                )
                                        }
                                    </div>
                                )

                        }

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Flashcard
