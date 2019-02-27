import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/model';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/comment.services';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {

  @Input()
  comments: Comment[] = []


  onNewComment$:Subscription;

  constructor(private commSvc: CommentService) { }

  ngOnInit() {
    this.onNewComment$ = this.commSvc.onNewComment.subscribe(
    (comm: Comment) =>{
     this.loadComment();
    }
  )
  this.loadComment();
  }

  private loadComment() {
    this.commSvc.getCommentWithPromise()
    .then(
      (result: Comment[]) => {
        console.info('result: ', result)
      this.comments = result;
    })//then
    .catch(error => {
      console.error('Error: ',error);
    })
  }
  
    ngOnDestory(){
      this.onNewComment$.unsubscribe();
    }
  
  }
