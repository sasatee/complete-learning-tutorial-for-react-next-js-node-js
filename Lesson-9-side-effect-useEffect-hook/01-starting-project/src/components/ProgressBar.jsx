import {useState,useEffect} from "react"

export default function ProgressBar({timer}){
  const [remainingTime,setRemainingTime] = useState(timer);


  useEffect(()=>{

    const TimerInterval  =  setInterval(()=>{
        console.log("Timer interval running")
        setRemainingTime(prevRemainingState => prevRemainingState - 10 )
    },10)

    return ()=>{
        clearInterval(TimerInterval)
    }

  },[])


    return <progress max={timer} value={remainingTime}/>
}