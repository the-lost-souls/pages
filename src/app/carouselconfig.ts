import * as IsMobile from 'is-mobile';
import { CarouselItem } from './carouselitem';

export class CarouselConfig {
    public constructor(
        public center: number,
        public grow: number,
        public itemSize: number,
        public spacing: number,
        public blurRadius: number,
        public backgroundFadeRadius: number,
        public titleFontSize: string,
        public subtitleFontSize: string,
        public items: CarouselItem[]) { }

    public static default(): CarouselConfig {

        const content: CarouselItem[] = [
            {
              image: 'assets/iv.jpg',
              title: 'IV - Racer',
              subtitle: '2002',
              youtube: 'https://www.youtube.com/watch?v=mHV_oIYZyEg',
              pouet: 'http://www.pouet.net/prod.php?which=5555',
              github: 'https://github.com/the-lost-souls/IV'
            },
            {
              image: 'assets/anytime.jpg',
              title: 'Anytime',
              subtitle: '2001',
              youtube: 'https://www.youtube.com/watch?v=_ubBTbGcLv8',
              pouet: 'http://www.pouet.net/prod.php?which=4244',
              github: 'https://github.com/the-lost-souls/anytime'
            },
            {
              image: 'assets/III.jpg',
              title: 'III - Live tomorrow',
              subtitle: '1999',
              youtube: 'https://youtu.be/rMkFe3xxZmA',
              pouet: 'http://www.pouet.net/prod.php?which=5919',
              github: 'https://github.com/the-lost-souls/III'
            },
            {
              image: 'assets/cucumber01.png',
              title: 'Cucumber Slumber',
              subtitle: '1999',
              youtube: 'https://youtu.be/ClB6vvaWzMg',
              pouet: 'https://www.pouet.net/prod.php?which=81547',
              github: null
            },
            {
              image: 'assets/FYH.jpg',
              title: 'Follow your Heart',
              subtitle: '1999',
              youtube: 'https://youtu.be/AAPkby4EDQY',
              pouet: 'https://www.pouet.net/prod.php?which=81546',
              github: null
            },
            {
              image: 'assets/II.jpg',
              title: 'II',
              subtitle: '1998',
              youtube: 'https://youtu.be/stSv0y_zg1o',
              pouet: 'http://www.pouet.net/prod.php?which=5923',
              github: 'https://github.com/the-lost-souls/II'
            },
            {
              image: 'assets/pgp.gif',
              title: 'pgp',
              subtitle: '1997',
              youtube: 'https://youtu.be/Fg-FixaV6ws',
              pouet: 'http://www.pouet.net/prod.php?which=15848',
              github: 'https://github.com/the-lost-souls/pgp'
            },
            {
              image: 'assets/mom02.png',
              title: 'Mind over Matter',
              subtitle: '1996',
              youtube: 'https://youtu.be/UtopQ09WZ9c',
              pouet: 'http://www.pouet.net/prod.php?which=58683',
              github: 'https://github.com/the-lost-souls/mind-over-matter'
            },
            {
              image: 'assets/pese01.png',
              title: 'PESE',
              subtitle: '1996',
              youtube: 'https://youtu.be/OlRxaUWLNgU',
              pouet: null,
              github: null
            },
            {
              image: 'assets/time01.png',
              title: 'Time',
              subtitle: '1996',
              youtube: 'https://youtu.be/AyIQb7SAhP0',
              pouet: 'http://www.pouet.net/prod.php?which=58684',
              github: 'https://github.com/the-lost-souls/time'
            },
            {
              image: 'assets/synthetic.png',
              title: 'Synthetic',
              subtitle: '1995',
              youtube: 'https://youtu.be/tJvQbS8wOok',
              pouet: null,
              github: 'https://github.com/the-lost-souls/synthetic'
            },
            {
              image: 'assets/sorcerer.png',
              title: 'Sorcerer',
              subtitle: '1995',
              youtube: 'https://youtu.be/F_KWflqlF1g',
              pouet: null,
              github: 'https://github.com/the-lost-souls/sorcerer'
            },
            {
              image: 'assets/tib.png',
              title: 'Tiß',
              subtitle: '1994',
              youtube: 'https://youtu.be/Qd8WPVmYhX8',
              pouet: null,
              github: 'https://github.com/the-lost-souls/TiB'
            }
          ];


        return new CarouselConfig(
            250, 3,
            IsMobile.isMobile(navigator.userAgent) ? 60 : 100,
            IsMobile.isMobile(navigator.userAgent) ? 10 : 15,
            IsMobile.isMobile(navigator.userAgent) ? 3 : 5,
            IsMobile.isMobile(navigator.userAgent) ? 20 : 50,
            IsMobile.isMobile(navigator.userAgent) ? '7pt' : '10pt',
            IsMobile.isMobile(navigator.userAgent) ? '4pt' : '6pt',
            content
        );
    }
}
