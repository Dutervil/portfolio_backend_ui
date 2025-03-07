import Head from "next/head";
import {IoHome} from "react-icons/io5";
import {Bar} from "react-chartjs-2";

import {Chart as  ChartJS, CategoryScale,LinearScale,BarElement, Title, Tooltip, Legend} from "chart.js";
import {useEffect, useState} from "react";



export default function Home() {

    ChartJS.register(CategoryScale,LinearScale,BarElement, Title, Tooltip, Legend)

    const [blogData, setBlogData] = useState([]);
    const [projectsData, setProjectsData] = useState([]);
    const [photosData, setPhotosData] = useState([]);
    const [shopData, setShopData] = useState([]);
    const [loading, setLoading] = useState(true);


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "Blogs Created Monthly by Year",  // Title text
            },
        },
    };

useEffect(() => {
   const fetchData = async () => {

       try {
           const response = await fetch("/api/blogs");
           // const projects = await  fetch("/api/projects");
           // const shops = await  fetch("/api/shops");
           // const photos = await  fetch("/api/photos");

           const data = await response.json();
           // const dataProject = await projects.json();
           // const dataPhotos = await photos.json();
           // const dataShops = await shops.json();


           setBlogData(data);
           // setProjectsData(dataProject);
           // setPhotosData(dataPhotos);
           // setShopData(dataShops);
           setLoading(false);

       }catch(err){
           setLoading(false);
           console.log(err);
       }
   };
   fetchData();
},[])



    const monthlyData = blogData
        .filter(blog => blog.status === "published")
        .reduce((acc, blog) => {
            const blogDate = new Date(blog.createdAt.seconds * 1000); // Convert Firestore Timestamp to JS Date
            const year = blogDate.getFullYear();
            const month = blogDate.getMonth();
            acc[year] = acc[year] || Array(12).fill(0);  // Corrected here
            acc[year][month]++;  // Increment the count for the given month of the year

            return acc;
        }, {});

    const  currentYear = new Date().getFullYear();
    const years = Object.keys(monthlyData);
    const labels =['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    }
    const datasets = years.map(year => ({
             label:  `${year}`,
            data : monthlyData[year] || Array(12).fill(0),
           backgroundColor:getRandomColor()
    }))

    const data ={
        labels,datasets
    }
    return (

    <>
      <Head>
        <title>Portfolio Backend</title>
        <meta name="description" content="Blog website backend" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

     <div className="dashboard">
         <div className="titledashboard flex flex-sb">
             <div>
                 <h2>Admin <span>Dashboard</span> </h2>
                 <h3>ADMIN PANEL</h3>
             </div>
             <div className="breadcrumb">
                 <IoHome/> <span>/</span> <span>Dashboard</span>
             </div>
         </div>

         {/*    Dashboard four card*/}
         <div className="topfourcards flex flex-sb">
             <div className="four_card">
                 <h2>Total Blog</h2>
                 <span>{blogData.filter(dat=> dat.status === 'published').length}</span>
             </div>

             <div className="four_card">
                 <h2>Total Projects</h2>
                 <span>3</span>
             </div>

             <div className="four_card">
                 <h2>Total Products</h2>
                 <span>2</span>
             </div>
             <div className="four_card">
                 <h2>Galery Photos</h2>
                 <span>5</span>
             </div>

         </div>

        {/*    Year overview*/}
        <div className="year_overview flex flex-sb">
            <div className="leftyearoverview">
             <div className=" flex flex-sb">
                 <h3>Year Overview</h3>
                 <ul className="creative-dots">
                     <li className="big-dot"></li>
                     <li className="semi-big-dot"></li>
                     <li className="medium-dot"></li>
                     <li className="semi-medium-dot"></li>
                     <li className="semi-small-dot"></li>
                     <li className="small-dot"></li>
                 </ul>
                 <h3>{blogData.filter(dat=> dat.status === 'published').length}/365 <br/> <span>Total published</span></h3>
             </div>
                <Bar options={options}  data={data}/>
            </div>
            <div className="right_salescont">
                <div>
                    <h3>Blogs By Category</h3>
                    <ul className="creative-dots">
                        <li className="big-dot"></li>
                        <li className="semi-big-dot"></li>
                        <li className="medium-dot"></li>
                        <li className="semi-medium-dot"></li>
                        <li className="semi-small-dot"></li>
                        <li className="small-dot"></li>
                    </ul>
                </div>

                <div className="blogscategory flex flex-center">


                </div>
            </div>
        </div>

     </div>
    </>

  );



}
