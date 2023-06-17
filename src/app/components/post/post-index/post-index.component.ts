import { Component, OnInit } from '@angular/core';
import { IPost } from 'src/app/models/post.model';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-index',
  templateUrl: './post-index.component.html',
  styleUrls: ['./post-index.component.scss'],
})
export class PostIndexComponent implements OnInit {
  isLoggedIn: boolean = false;
  posts: IPost[] = [];
  isLoading: boolean = false;
  hasErrors: boolean = false;

  constructor(
    public authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn$.subscribe((isUserLoggedIn) => {
      this.isLoggedIn = isUserLoggedIn;
    });

    this.postService.posts$.subscribe((posts) => {
      this.posts = posts;
    });

    this.postService.isPostLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });

    this.postService.postHasErrors$.subscribe((hasErrors) => {
      this.hasErrors = hasErrors;
    });

    this.postService.getAllPosts();
  }
}
