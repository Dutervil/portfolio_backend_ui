import {useState} from "react";
import useFetchData from "@/hooks/useFetchData";
import {SiBloglovin} from "react-icons/si";
import Dataloading from "@/components/Dataloading";
import Link from "next/link";
import {AiFillEye, AiOutlinePlus} from "react-icons/ai";
import {MdDrafts} from "react-icons/md";
import {FaEdit} from "react-icons/fa";
import {RiDeleteBin6Fill} from "react-icons/ri";


export default function contacts() {

    //Pagination
    const [currentPage, setCurrentPage] = useState(1);

    const[perPage] = useState(7);

    //Search
    const[searchQuery, setSearchQuery] = useState("");

    //fetch blog data
    const { allData, loading, error } = useFetchData("/api/contacts");

    // function to handle page change
    const paginate = (pageNumber) => {setCurrentPage(pageNumber );}

    // total number of blog
    const totalBlogs= allData.length;

    // filter based on searchQuery
    const  filteredProjects = searchQuery.trim() === '' ? allData :allData.filter((blog => blog.title.toLowerCase().includes(searchQuery.toLowerCase())))


    const indexOfFirstBlog= (currentPage-1) * perPage;
    const indexOfLastBlog= currentPage * perPage;

    // get the current page blogs
    const currentContacts = filteredProjects.slice(indexOfFirstBlog, indexOfLastBlog);

    const  contacts = currentContacts;

    const pageNumbers =[];

    for(let i = 1; i <= Math.ceil(allData /perPage); i++){
        pageNumbers.push(i);
    }
    return <>
        <div className="blogpage">
            <div className="titledashboard flex flex-sb">
                <div>
                    <h2>All  <span>Contact</span></h2>
                    <h3>ADMIN PANEL</h3>
                </div>
                <div className="breadcrumb">
                    <SiBloglovin/>  <span>/Contacts</span>
                </div>

            </div>
            {loading ? <><Dataloading/> </>:
                <>
                    <div className="blogstable">
                        <div className=" mb-1" style={{display: "flex", gap:3, alignItems: "center"}}>

                                <h2>Search contacts:</h2>
                                <input value={searchQuery} onChange={event => setSearchQuery(event.target.value)} type="text" placeholder="Search contacts by name ..." />

                        </div>
                        <table className="table table-styling">
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Company</th>
                                <th>Project</th>
                                <th>Phone</th>
                                <th>View</th>
                            </tr>
                            </thead>
                            <tbody>
                            {contacts.length === 0 ? (
                                <tr  className="text-center">
                                    <td colSpan={7}>No contact found {searchQuery ? 'title: '+searchQuery: ''}</td>
                                </tr>
                            ):(
                                contacts.map((contact, index) => (
                                    <tr key={index}>
                                        <td>{indexOfFirstBlog + index + 1}</td>
                                        <td>{contact.name +' '+contact.lname}</td>
                                        <td>{contact.company}</td>
                                        <td>{contact.project[0]}</td>
                                        <td>{contact.phone}</td>
                                        <td>
                                            <div className="flex gap-2 flex-center">
                                                <Link href={`/contacts/view/${contact.id}`}>  <button> <AiFillEye/> </button> </Link>

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