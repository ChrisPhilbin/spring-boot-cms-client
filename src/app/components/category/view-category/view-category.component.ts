import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { ICategory } from 'src/app/models/category.model';
import { IPost } from 'src/app/models/post.model';
import { CategoryService } from 'src/app/services/category.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-view-category',
  templateUrl: './view-category.component.html',
  styleUrls: ['./view-category.component.scss'],
})
export class ViewCategoryComponent implements OnInit {
  category: ICategory | null = null;
  categoryPosts: IPost[] | null = null;
  isCategoryLoading: boolean = false;
  categoryHasErrors: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const categoryId = this.route.snapshot.paramMap.get('categoryId');
    if (categoryId) {
      this.postService.isPostLoading$.subscribe((isLoading) => {
        this.isCategoryLoading = isLoading;
      });

      this.postService.posts$.subscribe((posts: IPost[]) => {
        this.categoryPosts = posts;
      });

      this.postService.postHasErrors$.subscribe((postError) => {
        console.error(postError);
        this.categoryHasErrors = true;
      });

      this.postService.getAllPostsForGivenCategory(categoryId);
    }
  }
}
