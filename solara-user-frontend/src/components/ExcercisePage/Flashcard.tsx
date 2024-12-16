import useExcerciseStore from '@/zustand/useExcerciseStore'
import { useRequest } from 'ahooks';
import { Button, Progress } from 'antd';
import { useState } from 'react'

const Flashcard = () => {

    const { excercises, excercise, getExcercise } = useExcerciseStore();

    const [flip, setFlip] = useState<boolean>(false);
    const [no, setNo] = useState<number>(0);
    const [progress, setProgress] = useState<number>(0);

    const { } = useRequest(async () => {

        if (!excercises || !excercises.items || !excercises.items[no]) {
            return;
        }

        const id = excercises.items[no].id;

        if (id == null) {
            return;
        }

        await getExcercise(id);
        calculateProgress();
    }, {
        refreshDeps: [no]
    });

    const handleFlip = () => {
        setFlip(!flip)
    }

    const calculateProgress = () => {
        if (excercises?.total === undefined) {
            return;
        }
        console.log(no)
        const progress = no / (excercises?.total - 1) * 100
        setProgress(progress);
    }

    const navigateNext = () => {

        if (!excercises || no >= (excercises.total || 0) - 1) {
            return;
        }

        setFlip(false);
        setNo((prev) => prev + 1);

    };

    const navigatePrev = () => {

        if (no <= 0) {
            return
        }
        setFlip(false)
        setNo((prev) => prev - 1)
    }

    return (
        <div className='flex w-full h-full flex-col'>
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
                            <h2 className="text-2xl font-bold mb-4">Answer</h2>
                            <p className="text-lg text-pretty text-center mb-4">
                                {
                                    excercise?.ans[0] === undefined
                                        ?
                                        'No answer'
                                        :
                                        excercise?.ans[0].optionText
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col w-full h-1/6 gap-4 justify-center items-center'>
                <div className='w-full'>
                    <Progress percent={progress} percentPosition={{ align: 'center', type: 'inner' }} strokeColor="green" showInfo={false} style={{width: '100%'}} />
                </div>
                <div className='flex w-full gap-4'>
                    <Button className='!w-6/12 !h-14' onClick={navigatePrev}>Trở về</Button>
                    <Button className='!w-6/12 !h-14' onClick={navigateNext}>Kế tiếp</Button>
                </div>
            </div>
        </div>
    )
}

export default Flashcard
