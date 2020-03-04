import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { PostService } from '../shared/post.service';
import { Post } from '../shared/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  post: Post;
  url: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    public postService: PostService
  ) {}


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.url = params['url'];
      this.fetchPostDetail(this.url);
    });
  }

  fetchPostDetail(url: string) {
    return this.postService.getPost(url).subscribe((post) => {
      this.post = post;
    })
  }

  goBack() {
    this.location.back();
  }
}
