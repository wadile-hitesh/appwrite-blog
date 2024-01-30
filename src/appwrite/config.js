import conf from "../conf/conf";
import { Client, Databases, Storage, ID, Query } from "appwrite";

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
        this.bucket = new Storage(this.client);
    }

    async createPost({title,content,slug,featuredImage,status}){
        try {
            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                {
                title,
                content,
                featuredImage,
                status
            });
        } catch (error) {
            console.log("Appwrite Create Post Error :: createPost",error);
        }
    }
    async updatePost(slug,{title,content,featuredImage,status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                });
        } catch (error) {
            console.log("Appwrite Update Post Error :: updatePost",error);
        }
    }

    async deletePost(slug){
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
            return true;
            
        } catch (error) {
            console.log("Appwrite Delete Post Error :: deletePost",error);
        }
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            );
        } catch (error) {
            console.log("Appwrite Get Post Error :: getPost",error);
            return false;
        }
    }
    async getPosts(queries = [ Query.equal("status", "active") ]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
                
            );
            
        } catch (error) {
            console.log("Appwrite Get Posts Error :: getPosts",error);
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.log("Appwrite Upload File Error :: uploadFile",error);
            return false
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            );
            return true
        } catch (error) {
            console.log("Appwrite Delete File Error :: deleteFile",error);
            return false
        }
    }

    // getFilePreview(){
    //     try {
            
    //     } catch (error) {
            
    //     }
    // }
}

const service = new Service();
export default service;