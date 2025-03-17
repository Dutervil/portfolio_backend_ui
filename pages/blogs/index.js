import {SiBloglovin} from "react-icons/si";
import {useState} from "react";
import useFetchData from "@/hooks/useFetchData";
import Dataloading from "@/components/Dataloading";
import Link from "next/link";
import {FaEdit} from "react-icons/fa";

import {RiDeleteBin6Fill} from "react-icons/ri";
import {AiFillEye, AiOutlinePlus} from "react-icons/ai";
import {MdDrafts} from "react-icons/md";
import {useSession} from "next-auth/react";
import {useRouter} from "next/router";


export default function Blogs() {
    const {data :session,status} =useSession()
     //Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const[perPage] = useState(7);

    //Search
    const[searchQuery, setSearchQuery] = useState("");

    //fetch blog data
    const { allData, loading, error } = useFetchData("/api/blogs");

    // function to handle page change
    const paginate = (pageNumber) => {setCurrentPage(pageNumber );}

    // total number of blog
    const totalBlogs= allData.length;

    // filter based on searchQuery
   const  filteredBlogs = searchQuery.trim() === '' ? allData :allData.filter((blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase())))

    // calculate index of first blog displayed on the current page
    const indexOfFirstBlog= (currentPage-1) * perPage;
   const indexOfLastBlog= currentPage * perPage;

   // get the current page blogs
    const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);

    const publishedBlogs = currentBlogs.filter((blog => blog.status === "published") );

    const pageNumbers =[];

    for(let i = 1; i <= Math.ceil(allData /perPage); i++){
        pageNumbers.push(i);
    }





    // const router = useRouter();
    // if(!session){
    //     router.push('/auth/signin');
    //     return  null;
    // }
    return <>

        <div className="blogpage">
           <div className="titledashboard flex flex-sb">
               <div>
                   <h2>All Published <span>Blogs</span></h2>
                   <h3>ADMIN PANEL</h3>
               </div>
               <div className="breadcrumb">
                   <SiBloglovin/>  <span>/Blos</span>
               </div>

           </div>
            {loading ? <><Dataloading/> </>:
                <>
                    <div className="blogstable">
                        <div className=" mb-1" style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                           <div>
                               <h2>Search Blogs:</h2>
                               <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} type="text" placeholder="Search Blogs by title ..." />
                           </div>
                           <div style={{ float:"right"}} >
                              <Link href={"/blogs/addblog"}>
                                  <button className="acceptButton">
                                      <AiOutlinePlus/>
                                  </button>
                              </Link>
                                  <span>  </span>
                               <Link href={"/blogs/draft"}>
                                   <button className="acceptButton" style={{backgroundColor:"skyblue"}}>
                                       <MdDrafts/>
                                   </button>
                               </Link>
                           </div>
                        </div>
                        <table className="table table-styling">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Image</th>
                                <th>Title</th>
                                <th>Edit/Delete</th>
                            </tr>
                            </thead>
                            <tbody>
                            {publishedBlogs.length === 0 ? (
                                <tr  className="text-center">
                                    <td colSpan={4}>No Blogs found {searchQuery ? 'title: '+searchQuery: ''}</td>
                                </tr>
                            ):(
                                publishedBlogs.map((blog, index) => (
                                     <tr key={index}>
                                         <td>{indexOfFirstBlog + index + 1}</td>
                                         <td>
                                             <img width={70} src={blog.images[0]} alt={blog.title} />
                                         </td>
                                         <td>{blog.title}</td>
                                         <td>
                                             <div className="flex gap-2 flex-center">
                                               <Link href={`/blogs/edit/${blog.id}`}>  <button> <FaEdit/> </button> </Link>
                                               <Link href={`/blogs/delete/${blog.id}`}>  <button> <RiDeleteBin6Fill/> </button> </Link>
                                             </div>
                                         </td>
                                     </tr>
                                ))

                            )}
                            </tbody>
                        </table>
                    </div>

                </>
            }

        </div>
    </>
}