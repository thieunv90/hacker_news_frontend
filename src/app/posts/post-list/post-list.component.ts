import { Component, OnInit } from '@angular/core';
import { PostService } from '../shared/post.service';
import { LoaderService } from '../../loader/loader.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {
  posts: any = [];
  currentPage: number = 1;
  nextPage: number;
  hasNewPosts: boolean = false;
  hasNoPosts: boolean = false;

  constructor(
    public postService: PostService,
    public loaderService: LoaderService
  ) {
  }

  ngOnInit(): void {
    this.fetchPosts(1);
    this.nextPage = this.currentPage;
  }

  fetchPosts(page: number = 1) {
    return this.postService.getPosts(page).subscribe((data: any) => {
       if(data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          this.posts.push(data[i]);
        }
        this.hasNewPosts = true;
        this.nextPage += 1;
      } else {
        this.hasNewPosts = false;
        this.hasNoPosts = true;
      }
    })
  }

  showMorePosts(page: number) {
    this.fetchPosts(page);
  }
}
