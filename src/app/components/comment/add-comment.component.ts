import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/comment.services';
import { NgForm } from '@angular/forms';
import { Comment } from 'src/app/model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  //link variable
  private href: string = "";
  constructor(private commSvc: CommentService, private router: Router) { }

  ngOnInit() {
  this.href = this.router.url;
  }

  processForm(commForm: NgForm) {
    const comm: Comment = <Comment>commForm.value;
    comm.url = this.href;
    console.info('comment: ', comm);
    console.info('processing form: ', commForm);

    this.commSvc.addCommentWithPromise(comm)
      .then((result) => {
        console.log('inserted: ', result)
        commForm.resetForm();
      }).catch(error => {
        console.error('Insert error: ', error);
      })
  }

}

