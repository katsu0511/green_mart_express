declare const dateBrand: unique symbol;
declare const dateTimeBrand: unique symbol;

export type DateString = string & {
  readonly [dateBrand]: 'Date';
};

export type DateTimeString = string & {
  readonly [dateTimeBrand]: 'DateTime';
};
