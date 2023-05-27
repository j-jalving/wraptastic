export type Config = {
  container: string;
  data: string[] | null;
  lines: number;
  inline: boolean;
  item: string;
  itemClass: string;
  counter: string;
  counterClass: string;
  counterTemplate: string | ((count: number) => string);
  counterEnabled: boolean;
};
