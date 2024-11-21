"use client"

import { useAuth } from '@clerk/nextjs'
import React from 'react'

const Page = () => {

    const { getToken } = useAuth();

    getToken({ template: 'Solara' }).then(token => console.log(token))


    return (
        <div>

        </div>
    )
}

export default Page
