import {SiBloglovin} from "react-icons/si";
import {IoSettingsOutline} from "react-icons/io5";
import {MdOutlineAccountCircle} from "react-icons/md";


export default function Setting() {

  


    return (
       <>
       <div className="settingpage">
           <div className="titledashboard flex flex-sb">
               <div>
                   <h2>Admin <span>Setting</span></h2>
                   <h3>ADMIN PANEL</h3>
               </div>
               <div className="breadcrumb">
                    <IoSettingsOutline/><span>/</span><span>Settings</span>
               </div>
           </div>

           <div className="profilesettings">
               <div className="leftprofile_details flex">
                   <img src="/img/coder.png" alt="profile" />
                   <div className="wh-100">
                       <div className="flex flex-sb flex-left mt-2">
                           <h2>My Profile:</h2>
                           <h3>Wadson D. <br/> Software Developer</h3>
                       </div>

                       <div className="flex flex-sb  mt-2">
                           <h2>Phone:</h2>
                           <input type="text" defaultValue={"+509 3134-0028"}/>
                       </div>
                       <div className=" mt-2">

                           <input type="email" defaultValue={"dwadson@gmail.com"}/>
                       </div>

                       <div className="flex flex-center  wh-100 mt-2">
                           <button>Save</button>
                       </div>
                   </div>
               </div>
               <div className="rightlogoutsec">
                  <div className="topaccoutnbox">
                      <h2 className="flex flex-sb">My Account<MdOutlineAccountCircle/></h2>
                      <hr/>
                      <div className="flex flex-sb mt-1">

                          <h3>Active Account <br/> <span>Email</span> </h3>
                          <button>Logout</button>
                      </div>
                  </div>
               </div>
           </div>
       </div>
       </>
    )


}
