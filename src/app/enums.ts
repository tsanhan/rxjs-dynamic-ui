



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
