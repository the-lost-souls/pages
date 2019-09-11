import { Component, OnInit, ViewChild, ViewContainerRef, SystemJsNgModuleLoader, Injector, NgModuleFactory } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.sass'],
  animations: [
    trigger('fadeIn', [
      state('void, false', style({
        opacity : 0
      })),
      state('true', style({
        opacity: 1,
      })),
      transition('* => true', [
        animate('1s')
      ]),
    ])
  ]
})
export class MasterComponent implements OnInit {

  @ViewChild('master', { read: ViewContainerRef, static: false })
  private _master: ViewContainerRef;

  public lazyChild: any;

  constructor(
    // This class is deprecated on Angular 8, not sure how to solve this in the future
    // tslint:disable-next-line: deprecation
    private _loader: SystemJsNgModuleLoader,
    private _injector: Injector) { }

  ngOnInit() {
    setTimeout(() => this.load('src/app/lazy/lazy.module#LazyModule'), 50);
  }

  private load(moduleId: string): void {
    this._loader.load(moduleId).then((moduleFactory: NgModuleFactory<any>) => {
      const moduleRef = moduleFactory.create(this._injector);
      const entryComponent = (moduleFactory.moduleType as any).entry;
      const compFactory = moduleRef.componentFactoryResolver.resolveComponentFactory(entryComponent);

      // Will be added as a _sibling_ of the container
      const componentRef = this._master.createComponent(compFactory);
      this.lazyChild = componentRef.instance;
    });
  }

}
