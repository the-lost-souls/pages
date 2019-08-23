import * as IsMobile from 'is-mobile';
import { CarouselSection } from './carouselsection';

export class CarouselOptions {
    public constructor(
        public center: number,
        public grow: number,
        public sectionHeight: number,
        public contentWidth: number,
        public padding: number,
        public blurRadius: number,
        public backgroundFadeRadius: number,
        public titleFontSize: string,
        public subtitleFontSize: string,
        public sections: CarouselSection[]) { }

    public static default(): CarouselOptions {

        const content: CarouselSection[] = [
            {
              image: 'assets/iv.jpg',
              title: 'IV - Racer',
              text: ['The Gathering 2002', '#2 pc demo'],
              youtube: 'https://www.youtube.com/watch?v=mHV_oIYZyEg',
              pouet: 'http://www.pouet.net/prod.php?which=5555',
              github: 'https://github.com/the-lost-souls/IV'
            },
            {
              image: 'assets/anytime.jpg',
              title: 'Anytime',
              text: ['Norvegia 2001', '#1 pc demo'],
              youtube: 'https://www.youtube.com/watch?v=_ubBTbGcLv8',
              pouet: 'http://www.pouet.net/prod.php?which=4244',
              github: 'https://github.com/the-lost-souls/anytime'
            },
            {
              image: 'assets/III.jpg',
              title: 'III - Live tomorrow',
              text: ['The Gathering 1999', '#2 pc demo'],
              youtube: 'https://youtu.be/rMkFe3xxZmA',
              pouet: 'http://www.pouet.net/prod.php?which=5919',
              github: 'https://github.com/the-lost-souls/III'
            },
            {
              image: 'assets/cucumber01.png',
              title: 'Cucumber Slumber',
              text: ['The Gathering 1999', '#1 fast demo'],
              youtube: 'https://youtu.be/ClB6vvaWzMg',
              pouet: 'https://www.pouet.net/prod.php?which=81547',
              github: null
            },
            {
              image: 'assets/FYH.jpg',
              title: 'Follow your Heart',
              text: ['Aasheim Party 1999', '#1 combined demo'],
              youtube: 'https://youtu.be/AAPkby4EDQY',
              pouet: 'https://www.pouet.net/prod.php?which=81546',
              github: null
            },
            {
              image: 'assets/II.jpg',
              title: 'II',
              text: ['The Gathering 1998', '#5 pc demo'],
              youtube: 'https://youtu.be/stSv0y_zg1o',
              pouet: 'http://www.pouet.net/prod.php?which=5923',
              github: 'https://github.com/the-lost-souls/II'
            },
            {
              image: 'assets/pgp.gif',
              title: 'pgp',
              text: ['The Gathering 1997', '#7 pc 4k'],
              youtube: 'https://youtu.be/Fg-FixaV6ws',
              pouet: 'http://www.pouet.net/prod.php?which=15848',
              github: 'https://github.com/the-lost-souls/pgp'
            },
            {
              image: 'assets/mom02.png',
              title: 'Mind over Matter',
              text: ['The Gathering 1996', '#8 pc demo'],
              youtube: 'https://youtu.be/UtopQ09WZ9c',
              pouet: 'http://www.pouet.net/prod.php?which=58683',
              github: 'https://github.com/the-lost-souls/mind-over-matter'
            },
            {
              image: 'assets/pese01.png',
              title: 'PESE',
              text: ['The Gathering 1996', '#3 fast intro'],
              youtube: 'https://youtu.be/OlRxaUWLNgU',
              pouet: null,
              github: null
            },
            {
              image: 'assets/time01.png',
              title: 'Time',
              text: ['Tonstad 1996'],
              youtube: 'https://youtu.be/AyIQb7SAhP0',
              pouet: 'http://www.pouet.net/prod.php?which=58684',
              github: 'https://github.com/the-lost-souls/time'
            },
            {
              image: 'assets/synthetic.png',
              title: 'Synthetic',
              text: ['Tonstad 1995'],
              youtube: 'https://youtu.be/tJvQbS8wOok',
              pouet: null,
              github: 'https://github.com/the-lost-souls/synthetic'
            },
            {
              image: 'assets/sorcerer.png',
              title: 'Sorcerer',
              text: ['1995', 'BBS Intro'],
              youtube: 'https://youtu.be/F_KWflqlF1g',
              pouet: null,
              github: 'https://github.com/the-lost-souls/sorcerer'
            },
            {
              image: 'assets/tib.png',
              title: 'Tiß',
              text: ['Melhus Party 1994'],
              youtube: 'https://youtu.be/Qd8WPVmYhX8',
              pouet: null,
              github: 'https://github.com/the-lost-souls/TiB'
            }
          ];

        const mobile: CarouselOptions = {
            center: 250,
            grow: 3,
            sectionHeight: 80,
            contentWidth: 60 * 2,
            padding: 10,
            blurRadius: 3,
            backgroundFadeRadius: 20,
            titleFontSize: '8pt',
            subtitleFontSize: '5pt',
            sections: content
        };

        const desktop: CarouselOptions = {
            center: 400,
            grow: 3,
            sectionHeight: 130,
            contentWidth: 100 * 2,
            padding: 15,
            blurRadius: 5,
            backgroundFadeRadius: 50,
            titleFontSize: '12pt',
            subtitleFontSize: '5pt',
            sections: content
        };

        return IsMobile.isMobile(navigator.userAgent) ? mobile : desktop;
    }
}
