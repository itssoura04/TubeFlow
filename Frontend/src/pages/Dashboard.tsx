import { useRecoilState, useRecoilValue } from "recoil"
import { hamburger } from "../context/hamburger.atoms"
import Sidebar from "../components/Sidebar"
import '../styles/dashboard.css'
import VideoCard from "../components/VideoCard"
import { useEffect } from "react"
import api from "../services/api"
import videoContext from "../context/videodetails.atom"


function Dashboard() {
  const isSidebarOpen = useRecoilValue(hamburger)
  const [videoDetails, setVideoDetails] = useRecoilState(videoContext)

  useEffect(()=>{
    // const token = localStorage.getItem('token')
    api.get('/video/get-all-videos')
    .then((res)=>{
      // console.log(res.data.videoDetails)
      setVideoDetails(res.data.videoDetails)
    })
    .catch(()=>{
      <p>No videos Found</p>
    })
  }, [])



  return (
    <div>
      {/*
      
      Videos , search box, home(which leads to the videos), subscriptions, you> History,  watch later,  
      Liked videos, playlists, your videos, channels that I subscribed, a notification bell, and side of it
      a avatar of my own
      */}

      <div className="dashboard__content">
        {isSidebarOpen && <Sidebar />}
        <div className={`dashboard__videos ${isSidebarOpen ? "with-sidebar" : ""}`}>
          <VideoCard videos={videoDetails} />
        </div>
      </div>
    </div>
  )
}

export default Dashboard