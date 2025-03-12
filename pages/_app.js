
import Header from "@/components/Header";
import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";
import {useEffect, useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from "@/components/Loading";
import {useRouter} from "next/router";
import {SessionProvider} from "next-auth/react";
import LoginLayout from "@/components/LoginLayout";

export default function App({  Component, pageProps: { session, ...pageProps }, }) {

const [asideOpen, setAsideOpen] = useState(false);
const [loading, setLoading] = useState(true);
const router = useRouter();

const AsideClickOpen = () => {
    setAsideOpen(!asideOpen)
}

useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false);
    if (router.isReady){
        setLoading(false)
    }

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
        router.events.off("routeChangeStart", handleStart);
        router.events.off("routeChangeComplete", handleComplete);
        router.events.off("routeChangeError", handleComplete);
    }

},[router.isReady])

    return (
        <>
            {loading ? (
                <div className="flex flex-col flex-center wh_100">
                    <Loading />
                    <h1 className="mt-1">Loading...</h1>
                </div>
            ) : (

                <SessionProvider session={session}>

                    <ParentComponent appOpen={asideOpen} appAsideClickOpen={AsideClickOpen} />

                    <main>
                        <div className={asideOpen ? 'container' : 'container active'}>

                            <Component {...pageProps} />
                            <ToastContainer />
                        </div>
                    </main>

                </SessionProvider>
            )}
        </>
    );
}


