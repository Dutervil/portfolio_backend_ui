
import Header from "@/components/Header";
import ParentComponent from "@/components/ParentComponent";
import "@/styles/globals.css";
import {useState} from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }) {

const [asideOpen, setAsideOpen] = useState(true);

const AsideClickOpen = () => {
    setAsideOpen(!asideOpen)
}
  return <>
    <ParentComponent appOpen ={asideOpen} appAsideClickOpen={AsideClickOpen} />
      <main>
          <div className={asideOpen ? 'container' : 'container active'}>
            <Component {...pageProps} />
              <ToastContainer />
          </div>
      </main>

  </>
}
