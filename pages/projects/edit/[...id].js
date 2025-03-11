import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";
import Head from "next/head";
import {BsPostcard} from "react-icons/bs";
import Blog from "@/components/Blog";
import Project from "@/components/Project";


export default function EditProject() {

    const [projectInfo, setProjectInfo] = useState(null);


    const router = useRouter();
    const { id } = router.query;
    useEffect(() => {
        if (!id) return;

        axios.get('/api/projects?id=' + id)
            .then(response => {
                setProjectInfo(response.data);
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
                    <h2>Edit <span>{projectInfo?.title}</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <BsPostcard/><span>/ <span>Edit Project</span></span>
                </div>
            </div>
            <div className="mt-3">
                {
                    projectInfo && (
                        <Project _id={id} {...projectInfo} />
                    )
                }
            </div>
        </div>
    </>
}