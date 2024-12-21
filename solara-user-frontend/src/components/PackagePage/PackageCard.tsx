import { LearningPackageDto } from '@/types/package'
import React from 'react'

interface IProps {
  package: LearningPackageDto
}

const PackageCard = (props: IProps) => {
  return (
    <div>
        {props.package.name}
    </div>
  )
}

export default PackageCard
