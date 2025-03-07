import {RiBarChartHorizontalLine} from "react-icons/ri";
import {BiExitFullscreen} from "react-icons/bi";
import {GoScreenFull} from "react-icons/go";
import {useState} from "react";


export default function Header({handleAsideOpen}) {

    const [isFullScreen, setIsFullScreen] = useState(false)

    const toggleFullScreen = () =>{

        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen().then(()=>{
                setIsFullScreen(true)
            })
        }else {
            document.exitFullscreen().then(()=>{
                setIsFullScreen(false)
            })
        }
    }

    return <>
      <header className="header flex flex-sb">
           <div className="logo flex gap-2">
             <h1>ADMIN</h1>
               <div className="headerham flex  flex-center">
                <RiBarChartHorizontalLine onClick={handleAsideOpen}/>
               </div>
           </div>

          <div className="rightnav flex gap-2">
              <div onClick={toggleFullScreen}>
                  {isFullScreen ?   <BiExitFullscreen/> :  <GoScreenFull/> }
              </div>
          <div className="notification">
              <img src="/img/notification.png" alt="notification Image"/>
          </div>

              <div className="profilenav">
                  <img src="/img/user.png" alt="user Image"/>
              </div>

          </div>
      </header>

    </>
}