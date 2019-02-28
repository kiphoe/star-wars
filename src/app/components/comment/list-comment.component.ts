import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/model';
import { Subscription } from 'rxjs';
import { CommentService } from 'src/app/comment.services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-comment',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.css']
})
export class ListCommentComponent implements OnInit {
 //link variable
 private href: string = "";
  @Input()
  comments: Comment[] = []


  onNewComment$:Subscription;

  constructor(private commSvc: CommentService, private router: Router) { }

  ngOnInit() {
    this.href = this.router.url;
    this.onNewComment$ = this.commSvc.onNewComment.subscribe(
    (comm: Comment) =>{
     this.loadComment();
    }
  )
  this.loadComment();
  }

  private loadComment() {
    this.commSvc.getCommentWithPromise(this.href)
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
