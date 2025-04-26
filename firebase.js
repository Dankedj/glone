// Importez les modules Firebase (assurez-vous que Firebase est installé dans votre projet via npm ou un CDN)
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js";
  import { getDoc,getFirestore,collection,addDoc,getDocs,updateDoc,deleteDoc,doc,setDoc,arrayUnion} from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js";



// Configuration Firebase (remplacez les valeurs par celles de votre projet Firebase)
const firebaseConfig = {
  apiKey: "AIzaSyD7kDmttR2DMBObRvrMktr5sdHYYLNEEiE",
  authDomain: "imara-at.firebaseapp.com",
  projectId: "imara-at",
  storageBucket: "imara-at.firebasestorage.app",
  messagingSenderId: "559969324918",
  appId: "1:559969324918:web:9710d545301b5608be3457",
  measurementId: "G-Q2BC310T5M"
};
// Initialisez Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Initialisez Firestore
const db = getFirestore(firebaseApp);

// Exemples de fonctions Firestore

/**
 * Ajoute un document à une collection Firestore.
 * @param {string} collectionName - Le nom de la collection.
 * @param {Object} data - Les données à ajouter.
 */
export async function addDocument(collectionName,docID,data) {
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    console.log("Document ajouté avec ID :", docRef.id);
  } catch (error) {
    console.error("Erreur lors de l'ajout du document :", error);
  }
}

/**
 * Récupère tous les documents d'une collection Firestore.
 * @param {string} collectionName - Le nom de la collection.
 */
export async function getDocuments(collectionName) {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName));
    const documents = [];
    querySnapshot.forEach((doc) => {
      documents.push({ id: doc.id, ...doc.data() });
    });
    console.log("Documents récupérés :", documents);
    return documents;
  } catch (error) {
    console.error("Erreur lors de la récupération des documents :", error);
  }
}

/**
 * Met à jour un document existant dans Firestore.
 * @param {string} collectionName - Le nom de la collection.
 * @param {string} docId - L'ID du document à mettre à jour.
 * @param {Object} updatedData - Les données mises à jour.
 */
export async function updateDocument(collectionName, docId, updatedData) {
  try {
    const docRef = doc(db, collectionName, docId);
    await updateDoc(docRef, updatedData);
    console.log("Document mis à jour avec succès :", docId);
  } catch (error) {
    console.error("Erreur lors de la mise à jour du document :", error);
  }
}

/**
 * Supprime un document d'une collection Firestore.
 * @param {string} collectionName - Le nom de la collection.
 * @param {string} docId - L'ID du document à supprimer.
 */
export async function deleteDocument(collectionName, docId) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log("Document supprimé avec succès :", docId);
  } catch (error) {
    console.error("Erreur lors de la suppression du document :", error);
  }
}

export async function addDocumentWithId(collectionName, docId, data) {
  const docRef = doc(db, collectionName, docId);

  try {
    await setDoc(docRef, data);
    console.log("Document ajouté avec succès avec l'ID :", docId);
  } catch (e) {
    console.error("Erreur lors de l'ajout du document : ", e);
  }
}
/**
 * 
 * @param {String} docId 
 * @param {String} fieldName 
 * @param {JSON} newElement 
 */
export async function addArrayFieldToDocument(docId, fieldName, newElement) {

  const docRef = doc(db, "organisations", docId);

  try {
    await updateDoc(docRef, {
      [fieldName]: arrayUnion(newElement) // Ajoute l'élément au tableau
    });
    console.log("Élément ajouté au champ tableau avec succès !");
  } catch (e) {
    console.error("Erreur lors de l'ajout de l'élément au tableau : ", e);
  }
}

export async function getAllDocumentsFromCollection(collectionName) {
  const collectionRef = collection(db, collectionName);

  try {
    const querySnapshot = await getDocs(collectionRef);
    const documents = [];
    
    querySnapshot.forEach((doc) => {
      documents.push(doc.id); // Ajoute l'ID et les données du document
    });

    console.log("Documents récupérés :", documents);
    return documents;
  } catch (e) {
    console.error("Erreur lors de la récupération des documents : ", e);
    return []
  }
}

export async function getDocumentValue(docId,collectionName="organisations") {

  const docRef = doc(db, collectionName, docId);

  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Données du document :", docSnap.data());
      return docSnap.data(); // Retourne les données du document
    } else {
      console.log("Aucun document trouvé !");
      return null; // Retourne null si le document n'existe pas
    }
  } catch (e) {
    console.error("Erreur lors de la récupération du document : ", e);
  }
}