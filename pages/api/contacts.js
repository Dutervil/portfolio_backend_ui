
import { getFirestore, collection, addDoc, getDocs,getDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import {db} from "@/lib/firebaseConfig";

// CRUD Operations
export default async function handler(req, res) {
    const { method } = req;


    if (method === 'POST') {
        const { name, lname,email,company,phone,country,price,description,project } = req.body;
        try {
            const contactCollectionRef = collection(db, 'contacts');
            const contactDocRef = await addDoc(contactCollectionRef, {
                name, lname,email,company,phone,country,price,description,project,
                createdAt: new Date(),
            });
            res.status(201).json({ id: contactDocRef.id, ...req.body });
        } catch (error) {
            res.status(500).json({ error: 'Error creating contact' });
        }
    }

    if (method === 'GET') {
        try {
            if (req.query?.id) {
                // Create a document reference
                const contactDocRef = doc(db, 'contacts', req.query.id);

                // Fetch the document
                const contactDoc = await getDoc(contactDocRef);

                // Check if the document exists
                if (!contactDoc.exists()) {
                    return res.status(404).json({ error: 'contact not found' });
                }

                // Return the document data
                res.status(200).json({ id: contactDoc.id, ...contactDoc.data() });
            } else {
                // Fetch all blog posts
                const contactCollectionRef = collection(db, 'contacts');
                const contactSnapshot = await getDocs(contactCollectionRef);
                const contacts = contactSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                res.status(200).json(contacts.reverse());
            }
        } catch (error) {
            console.error('Error fetching contacts:', error);
            res.status(500).json({ error: 'Error fetching contacts' });
        }
    }
    // UPDATE - Update an existing blog post
    if (method === 'PUT') {
        const { _id,  name, lname,email,company,phone,country,price,description,project } = req.body;
        try {
            const contactDocRef = doc(db, 'contacts', _id);
            await updateDoc(contactDocRef, {
                name, lname,email,company,phone,country,price,description,project,
                updatedAt: new Date(),
            });
            res.status(200).json({ message: 'contact updated successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error updating contact' });
        }
    }

    // DELETE - Delete a blog post
    if (method === 'DELETE') {
        const { id } = req.query;
        try {
            const contactDocRef = doc(db, 'contact', id);
            await deleteDoc(contactDocRef);
            res.status(200).json({ message: 'contact deleted successfully' });
        } catch (error) {
            res.status(500).json({ error: 'Error deleting contact' });
        }
    }
}