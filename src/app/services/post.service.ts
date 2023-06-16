import { HttpClient, HttpResponseBase } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IPost } from '../models/post.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  posts = new BehaviorSubject<IPost[]>([]);
  post = new BehaviorSubject<IPost | null>(null);
  isPostLoading = new BehaviorSubject<boolean>(false);
  postHasErrors = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  createPostInProvidedCategory(newPost: IPost, categoryId: string): void {
    this.http
      .post<IPost>(`${environment.baseUrl}/post?categoryId=${categoryId}`, {
        newPost,
      })
      .subscribe((post: IPost) => {
        this.post.next(post);
      });
  }

  getAllPosts(): void {
    this.isPostLoading.next(true);
    this.http.get<IPost[]>(`${environment.baseUrl}/posts/all`).subscribe({
      next: (posts: IPost[]) => {
        this.isPostLoading.next(false);
        this.posts.next(posts);
      },
      error: (error) => {
        this.handlePostError(error);
      },
    });
  }

  getSinglePostByGivenId(postId: string): void {
    this.http
      .get<IPost>(`${environment.baseUrl}/post/${postId}`)
      .subscribe((post: IPost) => {
        this.post.next(post);
      });
  }

  getAllPostsForGivenCategory(categoryId: string): void {
    this.http
      .get<IPost[]>(`${environment.baseUrl}/category/${categoryId}/all`)
      .subscribe((posts: IPost[]) => {
        this.posts.next(posts);
      });
  }

  updateSinglePostById(updatedPost: IPost, postId: string): void {
    this.http
      .put<IPost>(`${environment.baseUrl}/post/${postId}`, {
        updatedPost,
      })
      .subscribe((post: IPost) => {
        this.post.next(post);
      });
  }

  deleteSinglePostById(postId: string): void {
    this.http
      .delete<HttpResponseBase>(`${environment.baseUrl}/post/${postId}`)
      .subscribe((response) => {
        if (response.ok) {
          const postArr: IPost[] = this.posts.getValue();
          postArr.forEach((post: IPost, index: number) => {
            if (post.id === postId) {
              postArr.splice(index, 1);
            }
          });
          this.posts.next(postArr);
        }
      });
  }

  handlePostError(error: Error) {
    console.error(error);
    this.isPostLoading.next(false);
    this.postHasErrors.next(true);
  }
}
