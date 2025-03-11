
import { getFirestore, collection, addDoc, getDocs,getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import {db} from "@/lib/firebaseConfig";

// CRUD Operations
export default async function handler(req, res) {
    const { method } = req;


    if (method === 'POST') {
        const { title, slug, images, projectCategory, description,client, tags, livePreview,status  } = req.body;
        try {
            const projectCollectionRef = collection(db, 'projects');
            const projectDocRef = await addDoc(projectCollectionRef, {
                title,
                slug,
                images,
                projectCategory,
                description,
                client,
                tags,
                livePreview,
                status,
                createdAt: new Date(),
            });
            res.status(201).json({ id: projectDocRef.id, ...req.body });
        } catch (error) {
            res.status(500).json({ error: 'Error creating project ' });
        }
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                // Create a document reference
                const projectDocRef = doc(db, 'projects', req.query.id);

                // Fetch the document
                const projectDoc = await getDoc(projectDocRef); // Correct use of getDoc()

                // Check if the document exists
                if (!projectDoc.exists()) {
                    return res.status(404).json({ error: 'project  not found' });
                }

                // Return the document data
                res.status(200).json({ id: projectDoc.id, ...projectDoc.data() });
            } else {

                const projectCollectionRef = collection(db, 'projects');
                const projectSnapshot = await getDocs(projectCollectionRef);
                const projects = projectSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                res.status(200).json(projects.reverse());
            }
        } catch (error) {
            console.error('Error fetching projects :', error);
            res.status(500).json({ error: 'Error fetching projects' });
        }
    }

    if (method === 'PUT') {
        const { _id, title, slug, images, projectCategory, description,client, tags, livePreview,status } = req.body;
        try {
            const projectDocRef = doc(db, 'projects', _id);
            await updateDoc(projectDocRef, {
                title,
                slug,
                images,
                projectCategory,
                description,
                client,
                tags,
                livePreview,
                status,
                updatedAt: new Date(),
            });
            res.status(200).json({ message: 'project updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating project ' });
        }
    }


    if (method === 'DELETE') {
        const { id } = req.query;
        try {
            const projectDocRef = doc(db, 'projects', id);
            await deleteDoc(projectDocRef);
            res.status(200).json({ message: 'project deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting project' });
        }
    }
}