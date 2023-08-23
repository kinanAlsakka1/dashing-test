import { auth , signInWithEmailAndPassword , signOut } from '../services/firebase';
import BaseNetwork from "../network/baseNetwork";

export async function  signIn (email : string , password : string){
     return await signInWithEmailAndPassword(auth , email, password)
      .then(async (userCredential : any) => {
        // Signed in
        var user = userCredential.user;
        return await BaseNetwork.getOneDoc(`users` , user.uid)
        // ...
      })
      .catch((error : any) => {
      });
};

export async function  isAuth (){
  return new Promise(async (resolve) => {
     auth.onAuthStateChanged(async (user: any) => {
      if(user?.uid){
        resolve(await BaseNetwork.getOneDoc(`users` , user.uid));
      }
      else{
        resolve({});
      }
    });
  })
};

export async function  logOut (){
  return new Promise(async (resolve) => {
    signOut(auth).then(() => {
      resolve(true);
    }).catch((error : any) => {
      resolve(false);
    });
  })
};