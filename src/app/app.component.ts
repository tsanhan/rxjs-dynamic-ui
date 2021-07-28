import { fromEvent, interval, merge, NEVER, Observable } from 'rxjs';
import { map, mapTo, scan, shareReplay, startWith, switchMap, withLatestFrom } from 'rxjs/operators';

import { Component, Directive, ElementRef, Input, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { ActionNames } from './enums';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChild('TimerDisplay', { static: true }) TimerDisplay: ElementRef;
  @ViewChild('BtnStart', { static: true }) BtnStart: ElementRef;
  @ViewChild('BtnPause', { static: true }) BtnPause: ElementRef;
  @ViewChild('BtnSetTo', { static: true }) BtnSetTo: ElementRef;
  @ViewChild('InputSetTo', { static: true }) InputSetTo: ElementRef;
  @ViewChild('BtnReset', { static: true }) BtnReset: ElementRef;
  @ViewChild('BtnUp', { static: true }) BtnUp: ElementRef;
  @ViewChild('BtnDown', { static: true }) BtnDown: ElementRef;
  @ViewChild('InputTickSpeed', { static: true }) InputTickSpeed: ElementRef;
  @ViewChild('InputCountDiff', { static: true }) InputCountDiff: ElementRef;


  @ViewChild('digitTemplate', { static: true, read: TemplateRef }) digitTemplate: TemplateRef<any>;
  @ViewChild('countDiv', { static: true, read: TemplateRef }) countDiv: TemplateRef<any>;
  @ViewChild('myContainer', { static: true, read: ViewContainerRef }) myContainer: ViewContainerRef;

  public btnStart$: Observable<ActionNames>;
  public btnPause$: Observable<ActionNames>;
  public btnUp$: Observable<ActionNames>;
  public btnDown$: Observable<ActionNames>;
  public btnReset$: Observable<ActionNames>;
  public btnSetTo$: Observable<number>;

  public inputTickSpeed$: Observable<number>;
  public inputCountDiff$: Observable<number>;
  public inputSetTo$: Observable<number>;


  public initialSetTo: number = 10;
  public initialTickSpeed: number = 200;
  public initialCountDiff: number = 1;


  constructor() {
  }
  ngOnInit(): void {

    this.btnStart$ = this.getCommandObservableByElem(this.BtnStart.nativeElement, 'click', ActionNames.Start);
    this.btnPause$ = this.getCommandObservableByElem(this.BtnPause.nativeElement, 'click', ActionNames.Pause);
    this.btnReset$ = this.getCommandObservableByElem(this.BtnReset.nativeElement, 'click', ActionNames.Reset);
    this.btnUp$ = this.getCommandObservableByElem(this.BtnUp.nativeElement, 'click', ActionNames.Up);
    this.btnDown$ = this.getCommandObservableByElem(this.BtnDown.nativeElement, 'click', ActionNames.Down);

    this.inputSetTo$ = this.getValueObservable(this.InputSetTo.nativeElement, 'input').pipe(startWith(this.initialSetTo));
    this.inputTickSpeed$ = this.getValueObservable(this.InputTickSpeed.nativeElement, 'input').pipe(startWith(this.initialTickSpeed));
    this.inputCountDiff$ = this.getValueObservable(this.InputCountDiff.nativeElement, 'input').pipe(startWith(this.initialCountDiff));

    this.btnSetTo$ = this.getCommandObservableByElem(this.BtnSetTo.nativeElement, 'click', ActionNames.SetTo)
      .pipe(withLatestFrom(this.inputSetTo$, (_, i$) => i$));

    merge(
      // for the isTicking value
      this.btnStart$.pipe(mapTo(true)),
      this.btnPause$.pipe(mapTo(false)),
    ).pipe(
      // 1. Start, pause the counter. Then restart the counter with 0 (+)

      // ok so if 'start' clicked returning an interval, else returning 'NEVER'
      // (a never imitting/competing observable)
      switchMap(isTicking => isTicking ? interval(this.initialTickSpeed) : NEVER),


    ).subscribe(num => {
      this.renderCounterValue(num);
    });

  }

  private getCommandObservableByElem(elemId: HTMLElement, eventName: string, command: ActionNames): Observable<ActionNames> {
    return fromEvent(elemId, eventName).pipe(mapTo(command));
  }

  getValueObservable(elem: HTMLElement, eventName: string): Observable<number> {
    return fromEvent(elem, eventName)
      .pipe(
        map(v => (v.target as any).value),
        map(v => parseInt(v, 10)),
        shareReplay(1)
      );
  }

  public renderCounterValue(count: number) {
    this.myContainer.clear();
    count.toString()
      .split('')
      .forEach(($implicit, i, { length }) => {
        this.myContainer.createEmbeddedView(this.digitTemplate, { $implicit });
        if (i < (length - 1)) {
          this.myContainer.createEmbeddedView(this.countDiv);
        }
      })


  }
}


