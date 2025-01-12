import { AnswerDto, AttemptResponse, CreateUserAttemptRequest } from '@/types/excercise'
import { Card } from 'antd'
import React from 'react'

interface IProps {
    handleAttempt: (answer: AnswerDto) => Promise<void>
    answer: AnswerDto,
    no: number,
}

const Answer = ({ no, answer, handleAttempt }: IProps) => {

    return (
        <Card onClick={() => handleAttempt(answer)} size='small' className='w-full' title={no + 1} hoverable>
            <p>{answer.optionText}</p>
        </Card>
    )
}

export default Answer
