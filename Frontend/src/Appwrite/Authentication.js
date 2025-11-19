import {ID,Client,Account} from "appwrite";
import config from '../config/config';
export  class AuthService{
     client=new Client();//Every service in Appwrite (like Account, Database, Storage) needs a client instance to communicate with the server. isi liye hamne ye instance banaya hai
     account;//aur account ka nahi

     constructor()
     {
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)
        
        this.account=new Account(this.client);
     }

     async createAccount({email,password,name})
     {
        console.log(typeof(email)," ",password," ",name)
        try {
            const userAccount=await this.account.create(String(ID.unique()),email,password,name)
            if(userAccount) 
               {
                 //we will call a method
                const session= this.login(email,password)
                console.log(session)
                if(session)
                {
                    return session;
                }
               }
            else
                return userAccount
            

        } catch (error) {
            throw error;
        }
     }

     async login(email,password)
     {
        // console.log("in login ",email," ",typeof(email))
        try {
             return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error
        }
     }

     async getcurrentUser()
    //  When a user logs in (via email+password, OAuth, anonymous, etc.), Appwrite creates a session for that user.
    // In the browser SDK, this is stored in cookies (HttpOnly secure cookies).
    // In server-side SDKs, you can pass the X-Appwrite-JWT or session token.
    // Every request to Appwrite automatically includes that session (if you’re using the Appwrite client SDK).
     {
        try {
            return await this.account.get();
        } catch (error) {
            console.log("In Authentication :: ",error)
            throw error;
            
        }

        // return null;
     }

     async logout(){
        try {
            return await this.account.deleteSessions();
        } catch (error) {
            console.log(error);
        }
     }
}



const authService=new AuthService();

export default authService

