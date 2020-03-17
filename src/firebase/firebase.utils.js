import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
const config ={
    apiKey: "AIzaSyBFsBAfSzmPfE5nKl0j2q4E01-iQ1CODVo",
    authDomain: "react-ecom-a716a.firebaseapp.com",
    databaseURL: "https://react-ecom-a716a.firebaseio.com",
    projectId: "react-ecom-a716a",
    storageBucket: "react-ecom-a716a.appspot.com",
    messagingSenderId: "680101966788",
    appId: "1:680101966788:web:1790fa3176b86085f86a91",
    measurementId: "G-WMB73LWRNR"
  }
export const createUserProfileDocument= async (userAuth,additionalData)=>{
      if(!userAuth) return
      const userRef = await firestore.doc(`users/${userAuth.uid}`)
      const snapShot=  await userRef.get()
      if(!snapShot.exists)
      {
        const {displayName,email,photoURL}=userAuth
        const createdAt= new Date()
        try{
            userRef.set({
              createdAt,
              displayName,
              email,photoURL,
              ...additionalData
            })
        }
        catch(e) {
          console.log(e)
          } 
     }
     else{
       const lastUpdatedAt =new Date()
       userRef.update(
      {
        lastUpdatedAt
      })
     }
     return userRef
  }
  firebase.initializeApp(config)
  export const auth =firebase.auth()
  export const firestore = firebase.firestore()
  const provider = new firebase.auth.GoogleAuthProvider()
  provider.setCustomParameters({prompt:'select_account'})
  export const signInWithGoogle=()=>auth.signInWithPopup(provider)
  export default firebase;