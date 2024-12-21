"use client"

import PackageCard from '@/components/PackagePage/PackageCard'
import Spinner from '@/components/UI/Spinner'
import { GET_LEARNING_PACKAGES_API } from '@/constants/apis'
import { IBaseModel, IPaginate } from '@/types/general'
import { GetPagedPackageRequest, LearningPackageDto } from '@/types/package'
import axiosClient from '@/utils/axios/axiosClient'
import { useRequest } from 'ahooks'
import { useState } from 'react'

const Page = () => {

  const [packages, setPackages] = useState<IPaginate<LearningPackageDto>>();

  const { loading } = useRequest(async () => {
    const query: GetPagedPackageRequest = {
      searchProp: '',
      searchKey: '',
      page: 1,
      size: 100,
      orderOn: '',
      isAscending: true,
    }
    const response = await axiosClient.get<IBaseModel<IPaginate<LearningPackageDto>>>(GET_LEARNING_PACKAGES_API, { params: query })
    if (!response.data.isSuccess) {
      return
    }
    setPackages(response.data.responseRequest)
  })

  return (
    <div className='flex gap-4 h-full'>
      {
        loading
          ?
          (
            <div className='h-full w-full flex justify-center items-center'>
              <Spinner />
            </div>
          )
          :
          <>
            {
              packages?.items.map((item) => {
                return (
                  <>
                    <PackageCard package={item}></PackageCard>
                  </>
                )
              })
            }
          </>
      }

    </div>
  )
}

export default Page
