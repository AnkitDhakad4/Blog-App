import {ID,Databases,Storage  , Client, Query} from 'appwrite'
import config from '../config/config';

// Storage Purpose: Stores files and binary data.
// Examples: Images, videos, PDFs, documents, audio files, backups, or any file you want to serve or retrieve later.


// database Purpose: Stores structured data that you can query, filter, and relate.
// Examples: User info, orders, products, messages, settings.
export class Service{
    client=new Client();
    databases;
    bucket;

    //jab call kare tab hi storage and database create ho
    constructor(){
        this.client
        .setEndpoint(config.appwriteUrl)
        .setProject(config.appwriteProjectId)



        this.databases=new Databases(this.client);
        this.bucket=new Storage(this.client)//upar Storage import na kare toh ye samjega ki localStorage browser ka use karna hai
        //us storage ko hamne bucket nam de diya
    }

    async createPost({title,slug,content="",featuredImage,status,user})
    {
        try {
            // console.log("In create psot now ",title,slug,content,featuredImage,status,user)
           return await this.databases.createDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                String(slug),//ye id ka kaam karega post ki slug hm input denge
                {//Each property here must match an attribute you defined in your Appwrite collection schema.
                    title,
                    content,
                    featuredImage,
                    slug,
                    status,
                    user,
                }
            )
            
        } catch (error) {
            // console.log("Error in AppWrite service :: createPost: ",error);
            throw error;
        }
    }

    async updatePost(slug,{title,content,featuredImage,status,user}){
        //  console.log("In updatePost now ",title,slug,content,featuredImage,status)

        try {
            return await this.databases.updateDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                String(slug),
                {
                    title,
                    content,
                    slug,
                    featuredImage,
                    status,
                    user
                }

            )
        } catch (error) {
            console.log("Error in AppWrite service :: updatePost: ",error);
            throw error;
        }

    }

    async deletePost(slug){
            try {
                await this.databases.deleteDocument(
                    config.appwriteDatabaseId,
                    config.appwriteCollectionId,
                    slug,
                );
                return true;
                
            } catch (error) {
                 console.log("Error in AppWrite service :: DeletePost: ",error);
                 return false;
            }
    }


    async getPost(slug){
        try {
            return await this.databases.getDocument(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                slug
            );


        } catch (error) {
            console.log("Error in AppWrite service :: getPost: ",error);
            return false;
        }
    }

    async getPosts(queries=[Query.equal("status" ,["active"])]){//ye parameter hai
        try {

            // console.log("Here in the all Posts")
            return await this.databases.listDocuments(
                config.appwriteDatabaseId,
                config.appwriteCollectionId,
                queries//upar jo likha hai queris = karke use yha bhi likh sakte hai
            );
        } catch (error) {
            console.log("Error in AppWrite service :: getPosts: ",error); 
            throw error;
            return false
        }
    }

    //file upload services
    async uploadFile(file,slug){
        // console.log("in uploadFile ",file ,"and slug is ",slug)
        // console.log("in uploadFile ",typeof(file) ,"and slug is ",typeof(slug))

        try {
            return await this.bucket.createFile(//yha se file ka id hi return mileg
                config.appwriteBucketId,
                String(slug),
                file
        );
            
        } catch (error) {
            console.log("Error in AppWrite service :: uploadFile: ",error);
            return false;
        }
    } 
    


    async deleteFile(featuredImage){
        console.log("In delete file ",featuredImage," ",typeof(featuredImage))
        try {
            return await this.bucket.deleteFile(
                config.appwriteBucketId,
                featuredImage
            )
            

        } catch (error) {
            console.log("Error in AppWrite service :: deleteFile: ",error);
            return false;
        }
    }

    getFilePreview(slug){//ye kafi fast hai toh hamne async me nahi dala
        
        // console.log("In getfilepreview in dataservice ",fileId)
        // console.log('in getFilePreview in database ',featuredImage)
        return this.bucket.getFilePreview(//upar bhi same func hai par ye dot(.) karke access kiya hai ye Storage ka function hai
            config.appwriteBucketId,
            String(slug)    
        )
    }
}


const service=new Service();
export default service;