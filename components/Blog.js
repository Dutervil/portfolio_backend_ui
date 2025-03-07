
import MarkdownEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import Spinner from "@/components/Spinner";
import ReactMarkdown from 'react-markdown';
import {useState} from "react";
import {useRouter} from "next/router";
import axios from "axios";

import {ReactSortable} from "react-sortablejs";
import {MdDeleteForever} from "react-icons/md";
import {toast} from "react-toastify";





export default function Blog(
    {
        _id,
        title:existingTitle,
        description:existingDescription,
        tags:existingTags,
        blogCategory:existingBlogCategory,
        status:existingStatus,
        slug:existingSlug,
        images:existingImages,

    }
) {

    const [redirect, setRedirect] = useState(false);
    const router = useRouter();

    const [title, setTitle] = useState( existingTitle || "");
    const [description, setDescription] = useState( existingDescription  || "");
    const [images, setImages] = useState( existingImages || [] );
    const [blogCategory, setBlogCategory] = useState(existingBlogCategory || []);
    const [tags, setTags] = useState( existingTags || []);
    const [slug, setSlug] = useState( existingSlug || "");
    const [status, setStatus] = useState(existingStatus || "");

    const [isUploading, setIsUploading] = useState(false);
    const uploadImagesQueue =[];

    async function createBlog(event) {
        event.preventDefault();

        if(isUploading) {
            await Promise.all(uploadImagesQueue)
        }
        const data = {title, slug, images, blogCategory,description, tags, status}

        try {
        if (_id){
            console.log({_id})
            await axios.put('/api/blogs', {...data,_id:_id[0]});
            toast.success("Blog updated successfully!");

        }else{
           await axios.post('/api/blogs', data);
            toast.success("Blog created successfully!");

        }
        setRedirect(true);
        } catch (error) {
            console.error('Error creating blog:', error);
            toast.error('An error occurred while creating the blog!');
        }
    };

    if (redirect){
        router.push('/blogs');
        return null;
    }

    async  function uploadImage(event){
        event.preventDefault();
        const files = event.target?.files;
        if (files && files.length > 0){
            setIsUploading(true)

            for(const file of files){
                const data = new FormData();
                data.append("file", file);
                uploadImagesQueue.push(
                    await axios.post('/api/upload',data,{
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }).then(res => {
                        setImages(olImages =>[...olImages, ...res.data.links]);
                    })
                );

            }
             // wait for all images to finish uploading
            await  Promise.all(uploadImagesQueue)
            setIsUploading(false)
            toast.success("Image uploaded successfully!");
        }else{
            toast.error("An error occurred!");
        }

    }

    function updateImageOrder(images){
        setImages(images)
    }

    function  handleDeleteImages (index){
        const updatedImages = [...images];
        updatedImages.splice(index,1);
        setImages(updatedImages);
        toast.success("Image deleted successfully!");

    }
 const  handleSlugChange = (event) => {
        const slug = event.target.value;
        const newSlug = slug.replace(/\s+/g, '-');
        setSlug(newSlug);

 }

    return <>
        <form className="addWebsiteform" onSubmit={createBlog}>

                 {/*blog title*/}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="title">Title</label>
                    <input value={title}  onChange={event => {
                        setTitle(event.target.value); handleSlugChange(event)
                    }} type="text" id="title" placeholder="Enter your small title"/>
                </div>

                {/*slug*/}
                <div className="w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="slug">Slug (SEO friendly url)</label>
                    <input value={slug}  onChange={handleSlugChange} type="text" id="slug" placeholder="Slug url"/>
                </div>

             {/*Category*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <label htmlFor="blogCategory">
                    Select Category (You can choose multiple by pressing Ctrl+click)
                </label>
                <select onChange={event => setBlogCategory(Array.from(event.target.selectedOptions,option=>option.value))} value={blogCategory} id="blogCategory" name="blogCategory" multiple>
                    <option value="Node js">Node js</option>
                    <option value="React js">React js</option>
                    <option value="Next js">Next js</option>
                    <option value="Nest js">Nest js</option>
                    <option value="Angular">Angular</option>
                    <option value="Angular Material">Angular Material</option>
                    <option value="Spring Boot">Spring Boot</option>
                    <option value="Mysql">Mysql</option>
                    <option value="Laravel">Laravel</option>
                    <option value="JavaScript">JavaScript</option>
                    <option value="TypeScript">TypeScript</option>
                    <option value="Python">Python</option>
                    <option value="Django">Django</option>
                    <option value="Flask">Flask</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Rails">Rails</option>
                    <option value="PHP">PHP</option>
                    <option value="GraphQL">GraphQL</option>
                    <option value="MySQL">MySQL</option>
                    <option value="PostgreSQL">PostgreSQL</option>
                    <option value="MongoDB">MongoDB</option>
                    <option value="Redis">Redis</option>
                    <option value="AWS">AWS</option>
                    <option value="Google Cloud">Google Cloud</option>
                    <option value="Azure">Azure</option>
                    <option value="Docker">Docker</option>
                    <option value="Kubernetes">Kubernetes</option>
                    <option value="Webpack">Webpack</option>
                    <option value="Babel">Babel</option>
                    <option value="Jest">Jest</option>
                    <option value="Mocha">Mocha</option>
                    <option value="Chai">Chai</option>
                    <option value="Tailwind CSS">Tailwind CSS</option>
                    <option value="Bootstrap">Bootstrap</option>
                    <option value="Material UI">Material UI</option>
                    <option value="Vue js">Vue js</option>
                    <option value="Svelte">Svelte</option>
                    <option value="Go">Go</option>
                    <option value="Rust">Rust</option>
                    <option value="Flutter">Flutter</option>
                    <option value="React Native">React Native</option>
                    <option value="Electron">Electron</option>
                    <option value="C#">C#</option>
                    <option value="Java">Java</option>
                    <option value="Swift">Swift</option>
                    <option value="Kotlin">Kotlin</option>
                    <option value="Xamarin">Xamarin</option>
                    <option value="GraphQL">GraphQL</option>
                </select>
            </div>


            {/*Image*/}
            <div className="w-100 flex flex-col flex-left mb-2">
                <div className="w-100">
                    <label htmlFor="image">Images (First Image will be used as thumbnail)</label>
                    <input type="file" id="fileInput" className="mt-1" accept="images/*" multiple onChange={uploadImage}/>
                </div>

                <div className="w-100 flex flex-left mt-1">
                    {isUploading && (<Spinner/>)}
                </div>
            </div>
            {/*Images preview and sorting*/}
            {!isUploading && (
                <div className="flex">
                    <ReactSortable  list={Array.isArray(images) ? images : []} setList={updateImageOrder} animation={200}
                     className="flex gap-1"
                    >
                        {images?.map((link, index) => (
                            <div key={index} className="uploadedimg">
                             <img src={link} alt="images" className='object-cover'/>
                                <div className='deleteimg'>
                                    <button onClick={()=>handleDeleteImages(index)}>
                                        <MdDeleteForever/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </ReactSortable>
                </div>
            )}
            {/*Description*/}
            <div className="description w-100 flex flex-col flex-left mb-2">
                <label htmlFor="description"> Blog Content (For Image: First upload and copy link and paste in ![alt
                    text] link</label>
                <MarkdownEditor
                    value={description}
                    onChange={(event) => setDescription(event.text)}
                    style={{width: '100%', height: '400px'}}
                    renderHTML={(text) => (
                                    <ReactMarkdown

                                        components={{
                                        code: ({node, inline, className, children, ...props}) => {
                                            // for code
                                        const match= /language-(\w+)/.exec(className || '');
                                            if (inline) {
                                                return <code>{children}</code>
                                            }else  if (match) {
                                                return (

                                                        <div style={{position:'relative'}}>
                                                        <pre style={{padding:'0',borderRadius:'5px',overflowX:'auto',whiteSpace:'pre-wrap'}} {...props}>
                                                            <code>{children}</code>
                                                        </pre>
                                                            <button style={{position:'absolute',top:'0',zIndex:'1',right:'0'}} onClick={()=> navigator.clipboard.writeText(children)}>
                                                                Copy code
                                                            </button>
                                                        </div>
                                                )
                                            }else{
                                                return <code {...props}>{children}</code>
                                                }
                                        }
                                    }}>
                                        {text}
                                    </ReactMarkdown>
                                )}
                />


            </div>

                <div className="description w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="tags">Tags</label>
                    <select  onChange={event => setTags(Array.from(event.target.selectedOptions,option=>option.value))} value={tags} id="tags" name="tags" multiple>
                        <option value="Nodejs">Nodejs</option>
                        <option value="Reactjs">Reactjs</option>
                        <option value="Nextjs">Nextjs</option>
                        <option value="Nestjs">Nestjs</option>
                        <option value="Angular">Angular</option>
                        <option value="AngularMaterial">AngularMaterial</option>
                        <option value="SpringBoot">Springboot</option>
                        <option value="Vuejs">Vue.js</option>
                        <option value="Express">Express</option>
                        <option value="JavaScript">JavaScript</option>
                        <option value="TypeScript">TypeScript</option>
                        <option value="Python">Python</option>
                        <option value="Django">Django</option>
                        <option value="Flask">Flask</option>
                        <option value="PHP">PHP</option>
                        <option value="Laravel">Laravel</option>
                        <option value="Ruby">Ruby</option>
                        <option value="Rails">Rails</option>
                        <option value="Go">Go</option>
                        <option value="Rust">Rust</option>
                        <option value="GraphQL">GraphQL</option>
                        <option value="MongoDB">MongoDB</option>
                        <option value="MySQL">MySQL</option>
                        <option value="PostgreSQL">PostgreSQL</option>
                        <option value="SQLServer">SQL Server</option>
                        <option value="Redis">Redis</option>
                        <option value="Docker">Docker</option>
                        <option value="Kubernetes">Kubernetes</option>
                        <option value="AWS">AWS</option>
                        <option value="Azure">Azure</option>
                        <option value="GCP">Google Cloud Platform</option>
                        <option value="Terraform">Terraform</option>
                        <option value="Jenkins">Jenkins</option>
                        <option value="CI/CD">CI/CD</option>
                        <option value="Nginx">Nginx</option>
                        <option value="Apache">Apache</option>
                        <option value="Git">Git</option>
                        <option value="GitHub">GitHub</option>
                        <option value="GitLab">GitLab</option>
                        <option value="Bitbucket">Bitbucket</option>
                        <option value="Webpack">Webpack</option>
                        <option value="Babel">Babel</option>
                        <option value="Sass">Sass</option>
                        <option value="LESS">LESS</option>
                        <option value="TailwindCSS">Tailwind CSS</option>
                        <option value="Bootstrap">Bootstrap</option>
                        <option value="MaterialUI">Material UI</option>
                        <option value="Storybook">Storybook</option>
                        <option value="Jest">Jest</option>
                        <option value="Mocha">Mocha</option>
                        <option value="Chai">Chai</option>
                        <option value="Cypress">Cypress</option>
                        <option value="Selenium">Selenium</option>
                        <option value="Puppeteer">Puppeteer</option>
                        <option value="Electron">Electron</option>
                        <option value="Vuex">Vuex</option>
                        <option value="Redux">Redux</option>
                        <option value="MobX">MobX</option>
                        <option value="ApolloClient">Apollo Client</option>
                        <option value="Storybook">Storybook</option>
                    </select>
                </div>

                <div className="description w-100 flex flex-col flex-left mb-2">
                    <label htmlFor="status">Status</label>
                    <select onChange={event => setStatus(event.target.value)} value={status} id="status" name="status"  >
                        <option value="">No Select</option>
                        <option value="drafted">Draft</option>
                        <option value="published">published</option>
                    </select>
                </div>


            <div className=" w-100 mb-2 mt-2">
                <button type="submit" className="w-100 addwebbtn">Save Blog</button>
            </div>

        </form>
    </>
}

