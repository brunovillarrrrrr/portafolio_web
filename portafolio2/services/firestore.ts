import { db } from './firebase-config';
import { collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore';

// Definición de la interfaz para un Post
export interface BlogPost {
  id?: string;
  title: string;
  slug: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
  imageUrl?: string;
  published: boolean;
}

const postsCollectionRef = collection(db, 'posts');

// Función para añadir un nuevo post
export const addPost = async (post: Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const newPost = {
      ...post,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      published: true, // Por defecto, los posts se publican al crearse
    };
    const docRef = await addDoc(postsCollectionRef, newPost);
    return docRef.id;
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Función para obtener todos los posts
export const getPosts = async (): Promise<BlogPost[]> => {
  try {
    const q = query(postsCollectionRef, orderBy('createdAt', 'desc'));
    const data = await getDocs(q);
    return data.docs.map((doc) => ({
      ...(doc.data() as BlogPost),
      id: doc.id,
      createdAt: (doc.data().createdAt?.toDate() || new Date()),
      updatedAt: (doc.data().updatedAt?.toDate() || new Date()),
    }));
  } catch (error) {
    console.error("Error getting documents: ", error);
    throw error;
  }
};

// Función para obtener un post por su ID
export const getPostById = async (id: string): Promise<BlogPost | null> => {
  try {
    const postDocRef = doc(db, 'posts', id);
    const postDoc = await getDoc(postDocRef);
    if (postDoc.exists()) {
      return {
        ...(postDoc.data() as BlogPost),
        id: postDoc.id,
        createdAt: (postDoc.data().createdAt?.toDate() || new Date()),
        updatedAt: (postDoc.data().updatedAt?.toDate() || new Date()),
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
};

// Función para actualizar un post
export const updatePost = async (id: string, post: Partial<Omit<BlogPost, 'id' | 'createdAt' | 'updatedAt' | 'authorId' | 'authorName'>>) => {
  try {
    const postDocRef = doc(db, 'posts', id);
    await updateDoc(postDocRef, { ...post, updatedAt: serverTimestamp() });
    console.log("Document updated successfully!");
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Función para eliminar un post
export const deletePost = async (id: string) => {
  try {
    const postDocRef = doc(db, 'posts', id);
    await deleteDoc(postDocRef);
    console.log("Document deleted successfully!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};
