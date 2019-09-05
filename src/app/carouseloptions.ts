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
                {name: 'Rawhead', role: 'gfx, modeling'},
                {name: 'Kezoomer', role: 'music'},
                {name: 'Kezoomer\'s aunt', role: 'vocals'},
                {name: 'Cyberfish', role: 'code, gfx, modeling, animation'},
              ],
              links: [
                {id: 'youtube', url: 'https://www.youtube.com/watch?v=mHV_oIYZyEg'},
                {id: 'pouet', url: 'http://www.pouet.net/prod.php?which=5555'},
                {id: 'github', url: 'https://github.com/the-lost-souls/IV'},
                {id: 'download', url: 'https://files.scene.org/view/parties/2002/thegathering02/demo/iv_-_racer_by_tls.zip'},
              ]
            },
            {
              image: 'assets/anytime.jpg',
              title: 'Anytime',
              year: 2001,
              event: 'Norvegia',
              category: 'pc demo',
              ranked: 1,
              credits: [
                {name: 'Rawhead', role: 'gfx, modeling'},
                {name: 'Kezoomer', role: 'music'},
                {name: 'Cyberfish', role: 'code, gfx, modeling, animation'},
              ],
              links: [
                {id: 'youtube', url: 'https://www.youtube.com/watch?v=_ubBTbGcLv8'},
                {id: 'pouet', url: 'http://www.pouet.net/prod.php?which=4244'},
                {id: 'github', url: 'https://github.com/the-lost-souls/anytime'},
                {id: 'download', url: 'https://files.scene.org/view/parties/2001/norvegia01/demo/tls-anytime.zip'}
              ]
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
              links: [
                {id: 'youtube', url: 'https://youtu.be/rMkFe3xxZmA'},
                {id: 'pouet', url: 'http://www.pouet.net/prod.php?which=5919'},
                {id: 'github', url: 'https://github.com/the-lost-souls/III'},
                {id: 'download', url: 'https://files.scene.org/view/parties/1999/thegathering99/demo/iii__liv.zip'}
              ]
            },
            {
              image: 'assets/cucumber01.png',
              title: 'Cucumber Overdose',
              event: 'The Gathering',
              year: 1999,
              category: 'fast intro',
              ranked: 1,
              credits: [
                {name: 'Cyberfish', role: 'code, gfx, animation'},
                {name: 'Kezoomer', role: 'music, gfx, modeling'},
                {name: 'tChr', role: 'gfx'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/ClB6vvaWzMg'},
                {id: 'pouet', url: 'https://www.pouet.net/prod.php?which=81547'},
                {id: 'download', url: 'https://files.scene.org/view/parties/1999/thegathering99/wild/fast-intro/cucumber.zip'}
              ]
            },
            {
              image: 'assets/FYH.jpg',
              title: 'Follow your Heart',
              event: 'Aasheim Party',
              year: 1999,
              category: 'combined demo',
              ranked: 1,
              credits: [
                {name: 'Rawhead', role: 'gfx, modeling'},
                {name: 'Kezoomer', role: 'music'},
                {name: 'Cyberfish', role: 'code'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/AAPkby4EDQY'},
                {id: 'pouet', url: 'https://www.pouet.net/prod.php?which=81546'},
                {id: 'download', url: 'https://github.com/the-lost-souls/follow-your-heart/releases/download/final/tls_fyh.zip'}
              ]
            },
            {
              image: 'assets/II.jpg',
              title: 'II',
              event: 'The Gathering',
              year: 1998,
              category: 'pc demo',
              ranked: 5,
              credits: [
                {name: 'Rawhead', role: 'gfx, modeling, animation'},
                {name: 'Kezoomer', role: 'music, choreography'},
                {name: 'Cyberfish', role: 'code, animation'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/stSv0y_zg1o'},
                {id: 'pouet', url: 'http://www.pouet.net/prod.php?which=5923'},
                {id: 'github', url: 'https://github.com/the-lost-souls/II'},
                {id: 'download', url: 'https://files.scene.org/view/parties/1998/thegathering98/demo/tls_ii.zip'}
              ]
            },
            {
              image: 'assets/pgp.gif',
              title: 'pgp',
              event: 'The Gathering',
              year: 1997,
              category: '4k intro',
              ranked: 7,
              credits: [
                {name: 'Cyberfish', role: 'code, gfx'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/Fg-FixaV6ws'},
                {id: 'pouet', url: 'http://www.pouet.net/prod.php?which=15848'},
                {id: 'github', url: 'https://github.com/the-lost-souls/pgp'},
                {id: 'download', url: 'https://files.scene.org/view/mirrors/hornet/demos/1997/t/tls_pgp.zip'}
              ]
            },
            {
              image: 'assets/mom02.png',
              title: 'Mind over Matter',
              event: 'The Gathering',
              year: 1996,
              category: 'pc demo',
              ranked: 8,
              credits: [
                {name: 'Kezoomer', role: 'music'},
                {name: 'Cyberfish', role: 'code'},
                {name: 'Rawhead', role: 'gfx, modeling'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/UtopQ09WZ9c'},
                {id: 'pouet', url: 'http://www.pouet.net/prod.php?which=58683'},
                {id: 'github', url: 'https://github.com/the-lost-souls/mind-over-matter'},
                {id: 'download', url: 'https://files.scene.org/view/mirrors/hornet/demos/1996/t/tls_mom.zip'}
              ]
            },
            {
              image: 'assets/pese01.png',
              title: 'PESE',
              event: 'The Gathering',
              year: 1996,
              category: 'fast intro',
              ranked: 3,
              credits: [
                {name: 'Kezoomer', role: 'music'},
                {name: 'Cyberfish', role: 'code'},
                {name: 'Rawhead', role: 'gfx, modeling'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/OlRxaUWLNgU'},
              ]
            },
            {
              image: 'assets/time01.png',
              title: 'Time',
              event: 'Tonstad Party',
              year: 1996,
              category: undefined,
              ranked: undefined,
              credits: [
                {name: 'Kezoomer', role: 'music, gfx'},
                {name: 'Cyberfish', role: 'code, modeling'},
                {name: 'Rawhead', role: 'gfx, modeling'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/AyIQb7SAhP0'},
                {id: 'pouet', url: 'http://www.pouet.net/prod.php?which=58684'},
                {id: 'github', url: 'https://github.com/the-lost-souls/time'},
                {id: 'download', url: 'https://files.scene.org/view/parties/1996/tonstad96/demo/tls_time.zip'}
              ]
            },
            {
              image: 'assets/synthetic.png',
              title: 'Synthetic',
              event: 'Tonstad Party',
              year: 1995,
              category: undefined,
              ranked: undefined,
              credits: [
                {name: 'Kezoomer', role: 'music, modeling'},
                {name: 'Cyberfish', role: 'code, gfx'},
                {name: 'Rawhead', role: 'gfx, modeling'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/tJvQbS8wOok'},
                {id: 'github', url: 'https://github.com/the-lost-souls/synthetic'},
                {id: 'download', url: 'https://github.com/the-lost-souls/synthetic/releases/download/final/SYN_TLS.ZIP'}
              ]
            },
            {
              image: 'assets/sorcerer.png',
              title: 'Sorcerer',
              event: 'BBS Intro',
              year: 1995,
              category: undefined,
              ranked: undefined,
              credits: [
                {name: 'Kezoomer', role: 'modeling'},
                {name: 'Cyberfish', role: 'code, gfx'},
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/F_KWflqlF1g'},
                {id: 'github', url: 'https://github.com/the-lost-souls/sorcerer'},
                {id: 'download', url: 'https://github.com/the-lost-souls/sorcerer/releases/download/final/SORCERER.zip'}
              ]
            },
            {
              image: 'assets/tib.png',
              title: 'Tiß',
              event: 'Melhus Party',
              year: 1994,
              category: undefined,
              ranked: undefined,
              credits: [
                {name: 'Kezoomer', role: 'music, gfx'},
                {name: 'Cyberfish', role: 'code'},
                {name: 'Rawhead', role: 'code, gfx'},
                {name: 'MTB', role: 'code'},
                {name: 'Euronymous', role: 'gfx'}
              ],
              links: [
                {id: 'youtube', url: 'https://youtu.be/Qd8WPVmYhX8'},
                {id: 'github', url: 'https://github.com/the-lost-souls/TiB'},
                {id: 'download', url: 'https://github.com/the-lost-souls/TiB/releases/download/final/tls_Tiss.ZIP'}
              ]
            }
          ];

        const mobile: CarouselOptions = {
            center: 300,
            grow: 3,
            sectionHeight: 70,
            contentWidth: 60 * 2,
            padding: 5,
            blurRadius: 7,
            backgroundFadeRadius: 80,
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
            sections: content
        };

        return IsMobile.isMobile(navigator.userAgent) ? mobile : desktop;
    }

    public static flares(options: CarouselOptions): Flare[] {

      const desktop = [
        new Flare(
          { x: -options.contentWidth * 1.5, y: options.center - options.sectionHeight * options.grow * 0.5 },
          'assets/flare5.jpg',
          options.padding,
          1.5),
        new Flare(
          { x: options.contentWidth * 1.3, y: options.center + options.sectionHeight * options.grow * 0.5 },
          'assets/flare5.jpg',
          options.padding,
          0.7),
      ];

      const mobile = [
        // new Flare(
        //   { x: -options.contentWidth, y: 80 },
        //   'assets/flare5.jpg',
        //   options.padding,
        //   0.5),
        new Flare(
          { x: -options.contentWidth, y: options.center - options.sectionHeight * options.grow * 0.5 },
          'assets/flare5.jpg',
          options.padding,
          0.8),
        new Flare(
          { x: options.contentWidth * 1.3, y: options.center + options.sectionHeight * options.grow * 0.5 },
          'assets/flare5.jpg',
          options.padding,
          0.5),
          // new Flare(
          // { x: -options.contentWidth / 2, y: options.center + options.sectionHeight * options.grow },
          // 'assets/flare5.jpg',
          // options.padding,
          // 0.7)
      ];

      return IsMobile.isMobile(navigator.userAgent) ? mobile : desktop;
    }
}
