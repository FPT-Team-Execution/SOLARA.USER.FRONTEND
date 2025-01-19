import { ExcerciseDto } from '@/types/excercise'
import Image from 'next/image'

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
                    <div className="flex min-h-full flex-col items-center justify-center gap-2">

                        {/* {
                            excercise.imageUrl &&
                            <Image src={excercise.imageUrl} alt='' width={500} height={500} className="w-2/6 h-auto object-cover rounded-lg" loading='eager' />
                        } */}

                        <p className="p-2 text-sm md:text-lg text-pretty text-center">
                            {excercise?.question}
                        </p>

                    </div>
                </div>
                {/* Back Face */}
                <div className="absolute inset-0 h-full w-full rounded-xl px-12 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
                    <div className="flex min-h-full flex-col items-center justify-center">

                        {
                            excercise.imageUrl &&
                            <Image src={excercise.imageUrl} alt='' width={500} height={500} className="w-2/6 h-auto object-cover rounded-lg" loading='eager' />
                        }
                        {
                            excercise?.ans[0] === undefined
                                ?
                                'Chưa có câu trả lời'
                                :
                                (
                                    <div className='flex flex-col gap-4'>

                                        <div>
                                            <p className="text-sm md:text-lg text-pretty text-center">
                                                {excercise?.ans[0].optionText}
                                            </p>
                                        </div>
                                        {/* {
                                            excercise?.ans[0].explanation === undefined
                                                ?
                                                <></>
                                                : (
                                                    <div>
                                                        <h2 className="text-2xl font-bold mb-2">Giải thích:</h2>
                                                        <p className="text-lg text-pretty text-center">
                                                            {excercise?.ans[0].explanation}
                                                        </p>
                                                    </div>
                                                )
                                        } */}
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
