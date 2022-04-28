import React from 'react'
import { useRouter } from 'next/router'

function Video() {
    const router = useRouter()
    const {id} = router.query
  return (
    <div className='content'>
        <h1>video</h1>
        <h1>{id}</h1>
    </div>
  )
}

export default Video