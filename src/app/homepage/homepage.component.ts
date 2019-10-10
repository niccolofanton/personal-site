import { Component, OnInit } from '@angular/core';
import anime from 'animejs/lib/anime.js';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    // const animation = anime({
    //   targets: '.canvas',
    //   delay: (el, i) => { return i * 100; },
    //   elasticity: 200,

    //   height: '10px',
    //   easing: 'easeInOutSine',
    //   autoplay: false

    // });


    // window.onwheel = (e) => {
    //   console.log(this.getScrollPercent());
    //   animation.seek(this.getScrollPercent());
    // };

  }


  getScrollPercent() {
    return (document.getElementById('wall').scrollTop / document.documentElement.clientHeight) * 100;
  }
}
