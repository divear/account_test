import React from 'react'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'

function Video() {
  const router = useRouter()

  return (
    <div className='content'>
      <ReactPlayer 
      url='
      https://firebasestorage.googleapis.com/v0/b/accounts-8a8bf.appspot.com/o/video%2Fbad_pc_build.mp4?alt=media&token=43da284d-9301-4137-b444-5e921f6debce' 
      controls />
    </div>
  )
}

export default Video;