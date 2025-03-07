import Blog from "@/components/Blog";
import Head from "next/head"
import axios from "axios";
import { useState, useEffect } from "react";
import { BsPostcard } from "react-icons/bs";
import {router, useRouter} from 'next/router';
import {SiBloglovin} from "react-icons/si";


export default function EditBlog() {
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


    return <>

        <Head>
            <title>Edit Blogs</title>
        </Head>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>Edit <span>{blogInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard/><span>/ <span>Edit blog</span></span>
                </div>
            </div>
          <div className="mt-3">
              {
                  blogInfo && (
                     <Blog _id={id} {...blogInfo} />
                  )
              }
          </div>
        </div>
    </>
}