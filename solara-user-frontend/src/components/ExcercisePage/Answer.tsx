import { POST_ATTEMPT_EXCERCISE_API } from '@/constants/apis'
import { IBaseModel } from '@/interfaces/general'
import { AnswerDto, AttemptResponse, CreateUserAttemptRequest } from '@/types/excercise'
import axiosClient from '@/utils/axios/axiosClient'
import useExcerciseStore from '@/zustand/useExcerciseStore'
import { Card } from 'antd'
import { getCookie } from 'cookies-next'
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
