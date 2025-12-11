import { db } from "../data/firebase.js";
import { collection, getDocs, getDoc, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";

export const obtenerProductos = async () => {
  const querySnapshot = await getDocs(collection(db, "products"));
  return querySnapshot.docs.map(docItem => ({ id: docItem.id, ...docItem.data() }));
};

export const obtenerProducto = async (id) => {
  const docRef = doc(db, "products", id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
};

export const agregarProducto = async (producto) => {
  const docRef = await addDoc(collection(db, "products"), producto);
  return { id: docRef.id, ...producto };
};

export const actualizarProducto = async (id, producto) => {
  const docRef = doc(db, "products", id);
  await updateDoc(docRef, producto);
  return { id, ...producto };
};

export const eliminarProducto = async (id) => {
  await deleteDoc(doc(db, "products", id));
  return true;
};
