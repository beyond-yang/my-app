import { Component, EventEmitter, Output } from '@angular/core';
import {
  SwiperClickEvent,
  SwiperDirective,
} from '../directive/swiper/swiper.directive';
import { NzCarouselComponent } from 'ng-zorro-antd/carousel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-swiper',
  imports: [NzCarouselComponent, SwiperDirective, CommonModule],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
})
export class SwiperComponent {
  @Output() imageClick = new EventEmitter<SwiperClickEvent>();

  images = [
    'https://image.baidu.com/search/detail?adpicid=0&b_applid=9443006902436458913&bdtype=0&commodity=&copyright=&cs=1480912265%2C3405959951&di=7500620934571622401&fr=click-pic&fromurl=http%253A%252F%252Fmbd.baidu.com%252Fnewspage%252Fdata%252Fdtlandingsuper%253Fnid%253Ddt_4086843240508925016&gsm=1e&hd=&height=0&hot=&ic=&ie=utf-8&imgformat=&imgratio=&imgspn=0&is=4199277072%2C3428064503&isImgSet=&latest=&lid=b7e18bdd0004b980&lm=&objurl=https%253A%252F%252Fiknow-pic.cdn.bcebos.com%252Fb3119313b07eca80d6f6ae67832397dda04483bb&os=4199277072%2C3428064503&pd=image_content&pi=0&pn=0&rn=1&simid=3456753339%2C467907635&tn=baiduimagedetail&width=0&word=%E5%AE%A0%E7%89%A9%E5%9B%BE%E7%89%87&z=',
    'https://image.baidu.com/search/detail?adpicid=0&b_applid=9443006902436458913&bdtype=0&commodity=&copyright=&cs=3843983442%2C4174181047&di=7500620934571622401&fr=click-pic&fromurl=http%253A%252F%252Fm.dianping.com%252Fugcdetail%252F261526064%253FsceneType%253D0%2526bizType%253D29%2526msource%253Dbaiduappugc&gsm=1e&hd=&height=0&hot=&ic=&ie=utf-8&imgformat=&imgratio=&imgspn=0&is=2933893490%2C3596943423&isImgSet=&latest=&lid=b7e18bdd0004b980&lm=&objurl=https%253A%252F%252Fqcloud.dpfile.com%252Fpc%252FdlFBg_0rL99HbRNH2pLwf7baX97Qus6XtQc_lOaCP8O1NpX6wMdvSN80YpcTbMKw.jpg&os=2933893490%2C3596943423&pd=image_content&pi=0&pn=1&rn=1&simid=3843983442%2C4174181047&tn=baiduimagedetail&width=0&word=%E5%AE%A0%E7%89%A9%E5%9B%BE%E7%89%87&z=',
    'https://image.baidu.com/search/detail?adpicid=0&b_applid=9443006902436458913&bdtype=0&commodity=&copyright=&cs=2771526872%2C81104291&di=7500620934571622401&fr=click-pic&fromurl=http%253A%252F%252Fmbd.baidu.com%252Fnewspage%252Fdata%252Fdtlandingsuper%253Fnid%253Ddt_4803413625635671574&gsm=1e&hd=&height=0&hot=&ic=&ie=utf-8&imgformat=&imgratio=&imgspn=0&is=1417806300%2C3893129775&isImgSet=&latest=&lid=b7e18bdd0004b980&lm=&objurl=https%253A%252F%252Fiknow-pic.cdn.bcebos.com%252F3b292df5e0fe9925d36544cf26a85edf8cb171c7&os=1417806300%2C3893129775&pd=image_content&pi=0&pn=2&rn=1&simid=4185475397%2C555093675&tn=baiduimagedetail&width=0&word=%E5%AE%A0%E7%89%A9%E5%9B%BE%E7%89%87&z=',
  ];
  onImageClick(event: SwiperClickEvent) {
    this.imageClick.emit(event);
  }

  onCarouselChange(index: number) {
    console.log('轮播图切换到索引:', index);
  }
}
