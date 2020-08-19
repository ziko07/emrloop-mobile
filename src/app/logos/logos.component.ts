import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-logos',
  templateUrl: './logos.component.html',
  styleUrls: ['./logos.component.scss'],
})
export class LogosComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  logos = [
    {
      name: 'Straightline',
      imgSrc: 'https://prod-kaizenloop-logos.s3.amazonaws.com/Straight%20Line%20Global.png',
      type: 'web'
    },
    {
      name: 'Straightline',
      imgSrc: 'https://prod-kaizenloop-logos.s3.amazonaws.com/Straight%20Line%20Global.png',
      type: 'mobile'
    },
    {
      name: 'Calyx',
      imgSrc: 'https://prod-kaizenloop-logos.s3.amazonaws.com/calyx-vector-logo.jpg',
      type: 'web'
    },
    {
      name: 'Calyx',
      imgSrc: 'https://prod-kaizenloop-logos.s3.amazonaws.com/calyx-vector-logo.jpg',
      type: 'mobile'
    },
    {
      name: 'Calyx 1',
      imgSrc: 'https://prod-kaizenloop-logos.s3.amazonaws.com/IMG_36641.jpg',
      type: 'web'
    },
    {
      name: 'Calyx 1',
      imgSrc: 'https://prod-kaizenloop-logos.s3.amazonaws.com/IMG_36641.jpg',
      type: 'mobile'
    },
    {
      name: 'Aloha Hemp',
      imgSrc: 'https://prod-kaizenloop-logos.s3.amazonaws.com/IMG_95971.png',
      type: 'web'
    },
    {
      name: 'Aloha Hemp',
      imgSrc: 'https://prod-kaizenloop-logos.s3.amazonaws.com/IMG_95971.png',
      type: 'mobile'
    },
  ]

  deleteLogo(id) {
    if (confirm('Are you sure?')) {
      this.logos.splice(id,1);
      console.log(this.logos,id);
    }
  }
}