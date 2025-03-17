
import { getFirestore, collection, addDoc, getDocs,getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import {db} from "@/lib/firebaseConfig";
import Cors from 'cors';
import { initMiddleware } from '@/lib/init-middleware';


const cors = Cors({
    methods: ['GET', 'POST', 'OPTIONS'], // Specify allowed methods
    allowedHeaders: ['Content-Type', 'my-api-key'], // Allow your custom header 'my-api-key'
    origin: 'http://localhost:3001',
});

// CRUD Operations
export default async function handler(req, res) {
    const { method } = req;
    await initMiddleware(cors)(req, res);

    // CREATE - Add a new blog post
    if (method === 'POST') {
        const { title, slug, images, blogCategory, description, tags, status } = req.body;
        try {
            const blogCollectionRef = collection(db, 'blogs');
            const blogDocRef = await addDoc(blogCollectionRef, {
                title,
                slug,
                images,
                blogCategory,
                description,
                tags,
                status,
                createdAt: new Date(),
            });
            res.status(201).json({ id: blogDocRef.id, ...req.body });
        } catch (error) {
            res.status(500).json({ error: 'Error creating blog post' });
        }
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                // Create a document reference
                const blogDocRef = doc(db, 'blogs', req.query.id);

                // Fetch the document
                const blogDoc = await getDoc(blogDocRef); // Correct use of getDoc()

                // Check if the document exists
                if (!blogDoc.exists()) {
                    return res.status(404).json({ error: 'Blog post not found' });
                }

                // Return the document data
                res.status(200).json({ id: blogDoc.id, ...blogDoc.data() });
            } else {
                // Fetch all blog posts
                const blogCollectionRef = collection(db, 'blogs');
                const blogSnapshot = await getDocs(blogCollectionRef);
                const blogs = blogSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                res.status(200).json(blogs.reverse());
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            res.status(500).json({ error: 'Error fetching blog posts' });
        }
    }
    // UPDATE - Update an existing blog post
    if (method === 'PUT') {
        const { _id, title, slug, images, blogCategory, description, tags, status } = req.body;
        try {
            const blogDocRef = doc(db, 'blogs', _id);
            await updateDoc(blogDocRef, {
                title,
                slug,
                images,
                blogCategory,
                description,
                tags,
                status,
                updatedAt: new Date(),
            });
            res.status(200).json({ message: 'Blog updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating blog post' });
        }
    }

    // DELETE - Delete a blog post
    if (method === 'DELETE') {
        const { id } = req.query;
        try {
            const blogDocRef = doc(db, 'blogs', id);
            await deleteDoc(blogDocRef);
            res.status(200).json({ message: 'Blog deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting blog post' });
        }
    }
}