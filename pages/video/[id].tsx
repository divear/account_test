import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import ReactPlayer from 'react-player'

function Video() {
	const [data, setData] = useState<any>([]);
  const {query} = useRouter()
  const id = query.id
  console.log(id);
  

	const serverDomain =
		process.env.NODE_ENV === "development"
			? "http://localhost:4000/"
			: process.env.NEXT_PUBLIC_SERVERDOMAIN;

	useEffect(() => {
    console.log(query.id);
  
    const id = query.id
    console.log(id);
		async function getBlog() {
			try {
        if(!id){
          return
        }
				const response = await fetch(`${serverDomain}posts/${id}`);
				const jsonData = await response.json();
				setData(jsonData[0]);
        console.log(jsonData[0]);
        
			} catch (error) {
				console.log(error);
			}
		}
		getBlog();
	}, [id]);
  

  return (
    <div className='content'>
      <h1>{data.body}</h1>
      <ReactPlayer 
      url={data.video_id}
      controls />
    </div>
  )
}

export default Video;