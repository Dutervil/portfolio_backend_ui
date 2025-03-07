import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {BsPostcard} from "react-icons/bs";
import {IoHome, IoSettingsOutline} from "react-icons/io5"
import {MdOutlineWorkOutline} from "react-icons/md";
import {RiContactsBook2Line, RiShoppingCart2Line} from "react-icons/ri";

export default function Aside({asideOpen,handleAsideOpen}) {

    const router = useRouter();

    const [clicked, setClicked] = useState(false);

    const [activeLink, setActiveLink] = useState('/');

    const handleClick = () => setClicked(!clicked)

    const handleLinkClick = (link) => {
        setActiveLink(preActive => (preActive === link ? null : link));
        setClicked(false);
    }


    useEffect(() => {
        setActiveLink(router.pathname);
    }, [router.pathname])

    return <>
        <aside className={asideOpen ? 'asideleft active' :'asideleft'}>
            <ul>
                <Link href={"/"}>
                    <li className="navactive">
                        <IoHome/>
                        <span>Dashoabrd</span>
                    </li>
                </Link>
                <li className={activeLink === '/blogs' ? 'navactive flex-col flex-left':' flex-col flex-left'} onClick={()=> handleLinkClick('/blogs')}>
                    <div className="flex gap-1">
                        <BsPostcard/>
                        <span>Blogs</span>
                    </div>
                        {activeLink === "/blogs" && (
                            <ul>
                                    <Link href={"/blogs"}>
                                            <li>All Blogs</li>
                                    </Link>
                                    <Link href={"/blogs/addblog"}>
                                            <li>Add Blogs</li>
                                    </Link>
                                    <Link href={"/blogs/draft"}>
                                            <li>Draft Blogs</li>
                                    </Link>
                            </ul>
                        )}

                </li>

                <li className={activeLink === '/shops' ? 'navactive flex-col flex-left':' flex-col flex-left'} onClick={()=> handleLinkClick('/shops')}>
                    <div className="flex gap-1">
                        <RiShoppingCart2Line/>
                        <span>Shops</span>
                    </div>
                    {activeLink === "/shops" && (
                        <ul>
                            <Link href={"/shops"}>
                                <li>All Shops</li>
                            </Link>
                            <Link href={"/shops/addproduct"}>
                                <li>Add Shops</li>
                            </Link>
                            <Link href={"/shops/draftshop"}>
                                <li>Draft Shops</li>
                            </Link>
                        </ul>
                    )}

                </li>

                <li className={activeLink === '/blogs' ? 'navactive flex-col flex-left':' flex-col flex-left'} onClick={()=> handleLinkClick('/projects')}>
                    <div className="flex gap-1">
                        <MdOutlineWorkOutline/>
                        <span>Projects</span>
                    </div>
                    {activeLink === "/projects" && (
                        <ul>
                            <Link href={"/projects"}>
                                <li>All Projects</li>
                            </Link>
                            <Link href={"/projects/addproject"}>
                                <li>Add Projects</li>
                            </Link>
                            <Link href={"/projects/draftprojects"}>
                                <li>Draft Projects</li>
                            </Link>
                        </ul>
                    )}

                </li>

                <Link href={"/contacts"}>
                    <li className={activeLink === '/contacts' ? 'navactive' :''} onClick={()=> handleLinkClick('/contacts')}>
                        <RiContactsBook2Line/>
                        <span>Contacts</span>
                    </li>
                </Link>

                <Link href={"/setting"}>
                    <li className={activeLink === '/setting' ? 'navactive' :''} onClick={()=> handleLinkClick('/setting')}>
                      <IoSettingsOutline/>
                        <span>Settings</span>
                    </li>
                </Link>
            </ul>
            <button className="logoutbtn">Logout</button>
        </aside>

    </>


}