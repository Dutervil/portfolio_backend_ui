import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";
import Head from "next/head";
import {BsPostcard} from "react-icons/bs";
import Blog from "@/components/Blog";


export default function DeleteProduct() {
    const [blogInfo, setBlogInfo] = useState(null);


    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) return;

        axios.get('/api/blogs?id=' + id)
            .then(response => {
                setBlogInfo(response.data);
            })
            .catch(err => {
                console.error('Axios error:', err.response ? err.response.data : err); // Log the full error details
            });
    }, [id]);


    function goBack() {
        router.push('/blogs');
    }

    async function deleteBlog() {
        axios.delete('/api/blogs?id=' + id);
        toast.success('Blog deleted successfully.');
        goBack();
    }
    return <>
      <Head>
          <title>Delete Blog</title>
      </Head>

        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Delete <span>{blogInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard/><span>/ <span>delete blog</span></span>
                </div>
            </div>
            <div className="deletesec flex flex-center wh-100">
                 <div className="deletecard">
                     <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="60" height="60">
                         <g fill="none" stroke="red" stroke-width="2">
                             <path d="M3 6H21"/>
                             <path d="M5 6V4C5 3.44772 5.44772 3 6 3H18C18.5523 3 19 3.44772 19 4V6"/>
                             <path d="M7 6V18C7 18.5523 7.44772 19 8 19H16C16.5523 19 17 18.5523 17 18V6"/>
                             <path d="M9 10V14"/>
                             <path d="M15 10V14"/>
                         </g>
                     </svg>
                     <p className="cookieHeading">Are you sure ?</p>
                     <p className="cookieDescription">This action will permanently delete the website content</p>
                      <div className="buttonContainer">
                          <button onClick={deleteBlog } className="acceptButton">Delete</button>
                          <button onClick={goBack} className="declineButton">Cancel</button>
                      </div>

                 </div>
            </div>
        </div>
    </>
}