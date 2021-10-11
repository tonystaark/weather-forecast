import dayjs from "dayjs";

export const checkIsEmptyObject = (obj: any): boolean => {
  return (
    obj &&
    Object.keys(obj).length === 0 &&
    Object.getPrototypeOf(obj) === Object.prototype
  );
};

export const dateInYearMonthDateDt = (dt: number) =>
  dayjs(dayjs.unix(dt)).format("YYYY-MM-DD hh:mm a");

export const currentDateToDt = () => dayjs(new Date()).format("hh:mm:ss a");

export const parseLocation = (location: string) => {
  return location.split(/[ ,]+/);
};
