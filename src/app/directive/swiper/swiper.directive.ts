import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

export interface SwiperClickEvent {
  clickTime: string; // 格式化的点击时间
  currentImage: {
    // 当前图片信息
    index: number;
    url: string;
  };
  nextImage: {
    // 下一张图片信息
    index: number;
    url: string;
  };
}

@Directive({
  selector: '[appSwiper]',
  standalone: true,
})
export class SwiperDirective implements OnInit {
  @Input() images: string[] = [];
  @Output() imageClick = new EventEmitter<SwiperClickEvent>();

  private defaultImages = [
    'https://image.baidu.com/search/detail?adpicid=0&b_applid=9443006902436458913&bdtype=0&commodity=&copyright=&cs=1480912265%2C3405959951&di=7500620934571622401&fr=click-pic&fromurl=http%253A%252F%252Fmbd.baidu.com%252Fnewspage%252Fdata%252Fdtlandingsuper%253Fnid%253Ddt_4086843240508925016&gsm=1e&hd=&height=0&hot=&ic=&ie=utf-8&imgformat=&imgratio=&imgspn=0&is=4199277072%2C3428064503&isImgSet=&latest=&lid=b7e18bdd0004b980&lm=&objurl=https%253A%252F%252Fiknow-pic.cdn.bcebos.com%252Fb3119313b07eca80d6f6ae67832397dda04483bb&os=4199277072%2C3428064503&pd=image_content&pi=0&pn=0&rn=1&simid=3456753339%2C467907635&tn=baiduimagedetail&width=0&word=%E5%AE%A0%E7%89%A9%E5%9B%BE%E7%89%87&z=',
    'https://image.baidu.com/search/detail?adpicid=0&b_applid=9443006902436458913&bdtype=0&commodity=&copyright=&cs=3843983442%2C4174181047&di=7500620934571622401&fr=click-pic&fromurl=http%253A%252F%252Fm.dianping.com%252Fugcdetail%252F261526064%253FsceneType%253D0%2526bizType%253D29%2526msource%253Dbaiduappugc&gsm=1e&hd=&height=0&hot=&ic=&ie=utf-8&imgformat=&imgratio=&imgspn=0&is=2933893490%2C3596943423&isImgSet=&latest=&lid=b7e18bdd0004b980&lm=&objurl=https%253A%252F%252Fqcloud.dpfile.com%252Fpc%252FdlFBg_0rL99HbRNH2pLwf7baX97Qus6XtQc_lOaCP8O1NpX6wMdvSN80YpcTbMKw.jpg&os=2933893490%2C3596943423&pd=image_content&pi=0&pn=1&rn=1&simid=3843983442%2C4174181047&tn=baiduimagedetail&width=0&word=%E5%AE%A0%E7%89%A9%E5%9B%BE%E7%89%87&z=',
    'https://image.baidu.com/search/detail?adpicid=0&b_applid=9443006902436458913&bdtype=0&commodity=&copyright=&cs=2771526872%2C81104291&di=7500620934571622401&fr=click-pic&fromurl=http%253A%252F%252Fmbd.baidu.com%252Fnewspage%252Fdata%252Fdtlandingsuper%253Fnid%253Ddt_4803413625635671574&gsm=1e&hd=&height=0&hot=&ic=&ie=utf-8&imgformat=&imgratio=&imgspn=0&is=1417806300%2C3893129775&isImgSet=&latest=&lid=b7e18bdd0004b980&lm=&objurl=https%253A%252F%252Fiknow-pic.cdn.bcebos.com%252F3b292df5e0fe9925d36544cf26a85edf8cb171c7&os=1417806300%2C3893129775&pd=image_content&pi=0&pn=2&rn=1&simid=4185475397%2C555093675&tn=baiduimagedetail&width=0&word=%E5%AE%A0%E7%89%A9%E5%9B%BE%E7%89%87&z=',
  ];

  private currentIndex = 0;
  constructor(private el: ElementRef) {}

  ngOnInit() {
    // 只能绑定到DIV元素上
    if (this.el.nativeElement.tagName.toLowerCase() !== 'div') {
      throw new Error('swiper指令只能绑定到div元素上');
    }

    // 没有传入数组，使用默认数组
    if (!this.images || !this.images.length) {
      this.images = this.defaultImages;
    }
  }

  // 监听宿主元素的 onClick 事件
  @HostListener('click')
  onClick() {
    this.emitClickEvent();
  }

  private emitClickEvent() {
    const now = new Date();
    // 点击时间
    const clickTime = this.formatDateTime(now);
    const nextIndex = (this.currentIndex + 1) % this.images.length;
    // 当前轮播的图片序号及图片地址
    const eventData = {
      clickTime,
      currentImage: {
        index: this.currentIndex,
        url: this.images[this.currentIndex],
      },
      nextImage: {
        index: nextIndex,
        url: this.images[nextIndex],
      },
    };
    this.imageClick.emit(eventData);
  }

  private formatDateTime(date: Date): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }
}
