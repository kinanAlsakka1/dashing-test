import NetResponse from "./netResponse";
import { collection, query , where , getDocs , getDoc, addDoc , updateDoc , deleteDoc, doc , setDoc  } from "firebase/firestore"; 
import { db } from '../services/firebase';

const noMsg = 'Sorry, something went wrong. Please try again later.';


class BaseNetwork {
    

    static async getAll(url : string, params = {}) {
        return new Promise((resolve) => {
            const querySnapshot = getDocs(collection(db, url));
            querySnapshot
            .then((response) => {
                let obj : any[] = []
                response.forEach((doc) => {
                        let d = doc.data()
                        obj.push({...d , id :doc.id})
                 });
                if (response) {
                    resolve(new NetResponse(true, obj , ''));
                } else
                    resolve(new NetResponse(false, obj, ''));
            }).catch((error) =>{
                try {
                    resolve(new NetResponse(false, error, error));
                } catch (e) {
                    resolve(new NetResponse(false, error, noMsg));
                }
            });
        });
    }

    static async getOneDoc(url : string, params : any = {}) {
        return new Promise((resolve) => {
            const querySnapshot = getDoc(doc(db, url , params));
            querySnapshot
            .then((response) => {
                if (response.exists()) {
                    resolve(new NetResponse(true, response.data() , ''));
                } else
                    resolve(new NetResponse(false, response.data(), ''));
            }).catch((error) =>{
                try {
                    resolve(new NetResponse(false, error, error));
                } catch (e) {
                    resolve(new NetResponse(false, error, noMsg));
                }
            });
        });
    }

    static async getWhere(url : string, conditions : Array<{ field: any; operator: any; value: any }> , params = {}) {
        return new Promise(async (resolve) => {
            const colRef = collection(db, url);

            const conditionQueries = conditions.map(({ field, operator, value }) =>
                where(field, operator, value)
            );

            const q = query(colRef, ...conditionQueries);

            const querySnapshot = await getDocs(q);

            const documents : any[] = [];
            await querySnapshot.forEach((doc) => {
                    documents.push({...doc.data() ,id : doc.id});
            });

            if (documents) {
                resolve(new NetResponse(true, documents , ''));
                } else
                resolve(new NetResponse(false, "", ''));
        });
    }

    static post(url : string, body : any ) {
        return new Promise((resolve , reject) => {
        addDoc(collection(db, url ), body)
                .then((response : any) => {
                    if (response.exists) {
                        resolve(new NetResponse(true, response.id.data() , ''));
                    } else {
                        resolve(new NetResponse(false, response.id, ''));
                    }
                })
                .catch((error) => {
                    try {
                        reject(new NetResponse(false, error, error));
                    } catch (e) {
                        reject(new NetResponse(false, error, noMsg));
                    }
                });
        });
    }
    
    static set(url : string, body : any, id : string) {
        return new Promise((resolve , reject) => {
            setDoc(doc(db, url , id), body)
                .then((response) => {
                    resolve(new NetResponse(true, '' , ''));
                })
                .catch((error) => {
                    try {
                        reject(new NetResponse(false, error, error));
                    } catch (e) {
                        reject(new NetResponse(false, error, noMsg));
                    }
                });
        });
    }

    static put(url : string , body : any , id : string) {
        return new Promise((resolve , reject) => {
            const docRef = doc(db, url, id);
            updateDoc(docRef, body)
                    .then((response : any) => {
                        if (response) {
                            resolve(new NetResponse(true, response.id.data() , ''));
                        } else {
                            resolve(new NetResponse(false, response, ''));
                        }
                    })
                    .catch((error) => {
                        try {
                            reject(new NetResponse(false, error, error));
                        } catch (e) {
                            reject(new NetResponse(false, error, noMsg));
                        }
                    });
            });
    }

    static delete(url : string , id : string) {
        return  new Promise((resolve, reject) => {
            const docRef = doc(db, url, id);
            deleteDoc(docRef)
            .then((response : any) => {
                if (response) {
                    resolve(new NetResponse(true, response , ''));
                } else
                    resolve(new NetResponse(false, response, ''));
            })
            .catch((error) => {
                try {
                    reject(new NetResponse(false, error, error));
                } catch (e) {
                    reject(new NetResponse(false, error, noMsg));
                }
            });
        });
    }
}

export default BaseNetwork;