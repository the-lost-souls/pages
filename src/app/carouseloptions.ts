import * as IsMobile from 'is-mobile';
import { CarouselSection } from './carouselsection';
import { Flare } from './flare';

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
              year: 2002,
              event: 'The Gathering',
              category: 'pc demo',
              ranked: 2,
              credits: [
                {name: 'Cyberfish', role: 'code, gfx, modeling, animation'},
                {name: 'Rawhead', role: 'gfx, modeling'},
                {name: 'Kezoomer', role: 'music'},
                {name: 'Kezoomer\'s aunt', role: 'vocals'}
              ],
              youtube: 'https://www.youtube.com/watch?v=mHV_oIYZyEg',
              pouet: 'http://www.pouet.net/prod.php?which=5555',
              github: 'https://github.com/the-lost-souls/IV'
            },
            {
              image: 'assets/anytime.jpg',
              title: 'Anytime',
              year: 2001,
              event: 'Norvegia',
              category: 'pc demo',
              ranked: 1,
              credits: [
                {name: 'Cyberfish', role: 'code, gfx, modeling, animation'},
                {name: 'Rawhead', role: 'gfx, modeling'},
                {name: 'Kezoomer', role: 'music'},
              ],
              youtube: 'https://www.youtube.com/watch?v=_ubBTbGcLv8',
              pouet: 'http://www.pouet.net/prod.php?which=4244',
              github: 'https://github.com/the-lost-souls/anytime'
            },
            {
              image: 'assets/III.jpg',
              title: 'III - Live tomorrow',
              event: 'The Gathering',
              year: 1999,
              category: 'pc demo',
              ranked: 2,
              credits: [
                {name: 'Cyberfish', role: 'code, gfx, modeling, animation'},
                {name: 'Rawhead', role: 'gfx, modeling'},
                {name: 'Kezoomer', role: 'music'},
              ],
              youtube: 'https://youtu.be/rMkFe3xxZmA',
              pouet: 'http://www.pouet.net/prod.php?which=5919',
              github: 'https://github.com/the-lost-souls/III'
            },
            // {
            //   image: 'assets/cucumber01.png',
            //   title: '"Cucumber Slumber"',
            //   text: ['The Gathering 1999', '#1 fast demo'],
            //   youtube: 'https://youtu.be/ClB6vvaWzMg',
            //   pouet: 'https://www.pouet.net/prod.php?which=81547',
            //   github: null
            // },
            // {
            //   image: 'assets/FYH.jpg',
            //   title: '"Follow your Heart"',
            //   text: ['Aasheim Party 1999', '#1 combined demo'],
            //   youtube: 'https://youtu.be/AAPkby4EDQY',
            //   pouet: 'https://www.pouet.net/prod.php?which=81546',
            //   github: null
            // },
            // {
            //   image: 'assets/II.jpg',
            //   title: '"II"',
            //   text: ['The Gathering 1998', '#5 pc demo'],
            //   youtube: 'https://youtu.be/stSv0y_zg1o',
            //   pouet: 'http://www.pouet.net/prod.php?which=5923',
            //   github: 'https://github.com/the-lost-souls/II'
            // },
            // {
            //   image: 'assets/pgp.gif',
            //   title: '"pgp"',
            //   text: ['The Gathering 1997', '#7 pc 4k'],
            //   youtube: 'https://youtu.be/Fg-FixaV6ws',
            //   pouet: 'http://www.pouet.net/prod.php?which=15848',
            //   github: 'https://github.com/the-lost-souls/pgp'
            // },
            // {
            //   image: 'assets/mom02.png',
            //   title: '"Mind over Matter"',
            //   text: ['The Gathering 1996', '#8 pc demo'],
            //   youtube: 'https://youtu.be/UtopQ09WZ9c',
            //   pouet: 'http://www.pouet.net/prod.php?which=58683',
            //   github: 'https://github.com/the-lost-souls/mind-over-matter'
            // },
            // {
            //   image: 'assets/pese01.png',
            //   title: '"PESE"',
            //   text: ['The Gathering 1996', '#3 fast intro'],
            //   youtube: 'https://youtu.be/OlRxaUWLNgU',
            //   pouet: null,
            //   github: null
            // },
            // {
            //   image: 'assets/time01.png',
            //   title: '"Time"',
            //   text: ['Tonstad 1996'],
            //   youtube: 'https://youtu.be/AyIQb7SAhP0',
            //   pouet: 'http://www.pouet.net/prod.php?which=58684',
            //   github: 'https://github.com/the-lost-souls/time'
            // },
            // {
            //   image: 'assets/synthetic.png',
            //   title: '"Synthetic"',
            //   text: ['Tonstad 1995'],
            //   youtube: 'https://youtu.be/tJvQbS8wOok',
            //   pouet: null,
            //   github: 'https://github.com/the-lost-souls/synthetic'
            // },
            // {
            //   image: 'assets/sorcerer.png',
            //   title: '"Sorcerer"',
            //   text: ['1995', 'BBS Intro'],
            //   youtube: 'https://youtu.be/F_KWflqlF1g',
            //   pouet: null,
            //   github: 'https://github.com/the-lost-souls/sorcerer'
            // },
            // {
            //   image: 'assets/tib.png',
            //   title: '"Tiß"',
            //   text: ['Melhus Party 1994'],
            //   youtube: 'https://youtu.be/Qd8WPVmYhX8',
            //   pouet: null,
            //   github: 'https://github.com/the-lost-souls/TiB'
            // }
          ];

        const mobile: CarouselOptions = {
            center: 250,
            grow: 3,
            sectionHeight: 70,
            contentWidth: 60 * 2,
            padding: 5,
            blurRadius: 7,
            backgroundFadeRadius: 80,
            titleFontSize: '16pt', // with grow=3, this gives a mobile size of 16pt
            subtitleFontSize: '10pt',
            sections: content
        };

        const desktop: CarouselOptions = {
            center: 400,
            grow: 3,
            sectionHeight: 112,
            contentWidth: 100 * 2,
            padding: 6,
            blurRadius: 5,
            backgroundFadeRadius: 50,
            titleFontSize: '25pt',
            subtitleFontSize: '15pt',
            sections: content
        };

        return IsMobile.isMobile(navigator.userAgent) ? mobile : desktop;
    }

    public static flares(options: CarouselOptions): Flare[] {

      const desktop = [
        new Flare(
          { x: -options.contentWidth, y: 80 },
          'assets/flare5.jpg',
          options.padding,
          1.5),
        new Flare(
          { x: options.contentWidth, y: options.center + options.sectionHeight * options.grow * 0.5 },
          'assets/flare5.jpg',
          options.padding,
          1.2),
        new Flare(
          { x: -options.contentWidth / 2, y: options.center + options.sectionHeight * options.grow },
          'assets/flare5.jpg',
          options.padding,
          1)
      ];

      const mobile = [
        new Flare(
          { x: -options.contentWidth, y: 80 },
          'assets/flare5.jpg',
          options.padding,
          0.5),
        new Flare(
          { x: options.contentWidth, y: options.center + options.sectionHeight * options.grow * 0.5 },
          'assets/flare5.jpg',
          options.padding,
          0.9),
        new Flare(
          { x: -options.contentWidth / 2, y: options.center + options.sectionHeight * options.grow },
          'assets/flare5.jpg',
          options.padding,
          0.7)
      ];

      return IsMobile.isMobile(navigator.userAgent) ? mobile : desktop;
    }
}
