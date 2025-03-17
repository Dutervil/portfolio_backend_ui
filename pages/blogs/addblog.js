

import {MdOutlineWorkOutline} from "react-icons/md";
import {SiBloglovin} from "react-icons/si";
import Blog from "@/components/Blog";
import {useRouter} from "next/router";
import {useSession} from "next-auth/react";

export default function Addblog() {
    const {data :session,status} =useSession()



    return <>
      <div className="addblogspage">
          <div className="titledashboard flex flex-sb">
            <div>
                <h2>Add <span>Blog</span></h2>
                <h3>ADMIN PANEL</h3>
            </div>
              <div className="breadcrumb">
               <SiBloglovin/>  <span>/AddBlog</span>
              </div>
          </div>

          <div className="blogsadd">
              <Blog/>
          </div>
      </div>
    </>
}