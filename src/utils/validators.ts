export const checkEmail = (value : string) => {
   if(/^[a-zA-Z0-9.+_-]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/.test(value)){
    return true;
   }
   return false;
} 

export const checkPassword = (value : string) => {
   const list = [];
   if(!/[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/.test(value)){
      list.push("Least 1 special character.")
   }
   if(!/(?=.*[A-Z])/.test(value)){
      list.push("Least 1 uppercase letter.")
   }
   if(!/(?=.*[a-z])/.test(value)){
      list.push("Least 1 lowercase letter.")
   }
   if(!/.{8}$/.test(value)){
      list.push("Minimum length 8 characters.")
   }
   return list
} 
