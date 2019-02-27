import { Component, OnInit } from '@angular/core';
import { CommentService } from 'src/app/comment.services';
import { NgForm } from '@angular/forms';
import { Comment } from 'src/app/model';


@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {

  constructor(private commSvc: CommentService) { }

  ngOnInit() {
  }

  processForm(commForm: NgForm) {
    const comm: Comment = <Comment> commForm.value;
    console.info('comment: ', comm);
    console.info('processing form: ', commForm);

    this.commSvc.addCommentWithPromise(comm)
    .then((result)=> {
      console.log('inserted: ',result)
      commForm.resetForm();
    }).catch(error=>{console.error('Insert error: ', error);
  })
  }

}

