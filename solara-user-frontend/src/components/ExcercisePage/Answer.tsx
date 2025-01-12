import { AnswerDto } from '@/types/excercise'
import { Card } from 'antd'
import React from 'react'

interface IProps {
    answer: AnswerDto,
    no: number,
}

const Answer = ({ no, answer }: IProps) => {
    return (
        <Card size='small' className='w-full' title={no + 1} hoverable>
            <p>{answer.optionText}</p>
        </Card>
    )
}

export default Answer
