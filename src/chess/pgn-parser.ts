export interface IChessGameJSON {
  event: string;
  site: string;
  date: string;
  router: number;
  white: string;
  black: string;
  result: string;
  moves: IChessMove[];
}

export interface IChessMove {
  move: number;
  white: string;
  black: string;
}

export const pgnToJson = () => {

}