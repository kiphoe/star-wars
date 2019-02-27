import { Injectable, EventEmitter } from "@angular/core";
import Dexie from 'dexie';
import { Comment } from './model';

@Injectable() //making this service able to inject into other components
export class CommentService{
    
    
    onNewComment = new EventEmitter<Comment>();

    contactDB: Dexie;

    constructor() {
        this.contactDB= new Dexie('PublicComment');
        this.contactDB.version(1).stores({
            comment:'comment'
        })
    }
    
    addCommentWithPromise(comm: Comment): Promise<any>{
        //#3
        return (
            this.contactDB.table('comment').put(comm)
            .then((result)=> {
                this.onNewComment.next(comm);
                return (result);
            })
        ).catch(error=>{
            console.log('test error',error)
        })
        
    }
    getCommentWithPromise(): Promise<Comment[]>{
        return(this.contactDB.table('comment').toArray());
    }
}