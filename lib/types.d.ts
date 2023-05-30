export type Config = {
  container: string;
  data: string[] | null;
  minLines: number;
  maxLines: number;
  item: string;
  itemClass: string;
  counter: string;
  counterClass: string;
  counterTemplate: string | ((count: number) => string);
  counterEnabled: boolean;
  updateEvery: number;
};
