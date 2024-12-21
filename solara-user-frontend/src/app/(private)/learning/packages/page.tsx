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
      orderOn: 'price',
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
          <div className='flex justify-between w-full flex-col gap-4'>

            <div className="container mx-auto">
              <div className="flex flex-wrap">
                <div className="w-full">
                  <div className="mx-auto max-w-[510px] text-center">
                    <span className="mb-2 block text-lg font-semibold text-primary">
                      Bảng giá
                    </span>
                    <h2 className="mb-3 text-3xl font-bold leading-[1.208] text-green-700 sm:text-4xl md:text-[40px]">
                      Các gói dịch vụ
                    </h2>
                    <p className="text-base text-body-color dark:text-dark-6">
                      Đừng bỏ lỡ cơ hội trải nghiệm hệ thống với mức giá vô cùng hợp lý! Chọn ngay gói dịch vụ phù hợp và khởi đầu hành trình của bạn.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex gap-4 flex-wrap w-full justify-evenly '>
              {
                packages?.items.map((item) => {
                  return (
                    <PackageCard key={item.id} package={item}></PackageCard>
                  )
                })
              }
            </div>

          </div>
      }

    </div>
  )
}

export default Page
