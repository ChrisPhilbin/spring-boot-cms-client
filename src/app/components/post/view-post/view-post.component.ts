import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPost } from 'src/app/models/post.model';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.scss'],
})
export class ViewPostComponent implements OnInit {
  @Input() post: IPost | null = null;
  hasErrors: boolean = false;
  isLoading: boolean = false;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (!this.post) {
      this.isLoading = true;
      const postId = this.route.snapshot.paramMap.get('postId');
      if (!postId) {
        this.hasErrors = true;
        this.isLoading = false;
        return;
      }

      this.postService.post$.subscribe((post) => {
        this.post = post;
        this.isLoading = false;
      });

      this.postService.getSinglePostByGivenId(postId);
    }
  }
}
