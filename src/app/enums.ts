export  enum ElementIds {
  TimerDisplay = 'timer-display',
  BtnStart = 'btn-start',
  BtnPause = 'btn-pause',
  BtnUp = 'btn-up',
  BtnDown = 'btn-down',
  BtnReset = 'btn-reset',
  BtnSetTo = 'btn-set-to',
  InputSetTo = 'set-to-input',
  InputTickSpeed = 'tick-speed-input',
  InputCountDiff = 'count-diff-input'
};

export interface CounterConfig {
  initialSetTo?: number;
  initialTickSpeed?: number;
  initialCountDiff?: number;
}

export interface CountDownState {
 isTicking: boolean;
 count: number;
 countUp: boolean;
 tickSpeed: number;
 countDiff:number;
}

export type PartialCountDownState =
  { isTicking: boolean } |
  { count: number } |
  { countUp: boolean } |
  { tickSpeed: number } |
  { countDiff:number};

export enum ConterStateKeys {
 isTicking = 'isTicking',
 count = 'count',
 countUp = 'countUp',
 tickSpeed = 'tickSpeed',
 countDiff = 'countDiff'
}

export enum ActionNames {
  Start,
  Pause,
  Reset,
  SetTo,
  Down,
  Up,
  TickSpeed,
  CountDiff
}
