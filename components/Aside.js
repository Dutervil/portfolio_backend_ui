import Link from "next/link";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {BsPostcard} from "react-icons/bs";
import {IoHome, IoSettingsOutline} from "react-icons/io5"
import {MdOutlineWorkOutline} from "react-icons/md";
import {RiContactsBook2Line, RiShoppingCart2Line} from "react-icons/ri";
import LoginLayout from "@/components/LoginLayout";
import {useSession} from "next-auth/react";
import { signOut } from "next-auth/react";

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

    const {data:session} = useSession();

    if (session) {

    return <>

        <aside className={asideOpen ? 'asideleft active' :'asideleft'}>
            <ul>
                <Link href={"/"}>
                    <li className={activeLink === '/' ? 'navactives':' '} onClick={()=> handleLinkClick('/')}>
                        <IoHome/>
                        <span>Dashoabrd</span>
                    </li>
                </Link>
                <li className={activeLink === '/blogs' ? 'navactives flex-col flex-left':' flex-col flex-left'} onClick={()=> handleLinkClick('/blogs')}>

                    <Link href={"/blogs"}>
                        <div className="flex gap-1">
                            <BsPostcard/>
                            <span>Blogs</span>
                        </div>
                    </Link>
                </li>

                <li className={activeLink === '/shops' ? 'navactives flex-col flex-left':' flex-col flex-left'} onClick={()=> handleLinkClick('/shops')}>


                    <Link href={"/shops"}>
                        <div className="flex gap-1">
                            <RiShoppingCart2Line/>
                            <span>Shops</span>
                        </div>
                    </Link>

                </li>

                <li className={activeLink === '/projects' ? 'navactives flex-col flex-left':' flex-col flex-left'} onClick={()=> handleLinkClick('/projects')}>

                    <Link href={"/projects"}>
                        <div className="flex gap-1">
                            <MdOutlineWorkOutline/>
                            <span>Projects</span>
                        </div>
                    </Link>
                </li>

                <Link href={"/contacts"}>
                    <li className={activeLink === '/contacts' ? 'navactives' :''} onClick={()=> handleLinkClick('/contacts')}>
                        <RiContactsBook2Line/>
                        <span>Contacts</span>
                    </li>
                </Link>

                <Link href={"/setting"}>
                    <li className={activeLink === '/setting' ? 'navactives' :''} onClick={()=> handleLinkClick('/setting')}>
                      <IoSettingsOutline/>
                        <span>Settings</span>
                    </li>
                </Link>
            </ul>
            <button onClick={()=>signOut()} className="logoutbtn">Logout</button>
        </aside>

    </>
    }

}