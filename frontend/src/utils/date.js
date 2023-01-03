import moment from "moment";
const today = new Date();
const nextWeek = new Date(today.getTime());
const start = (idx) => {
  let main;

  let day = moment(main).format("ddd");
  let date;
  if (moment() + 1 <= moment().day(6)) {
    main = new Date(today.setDate(today.getDate() - today.getDay() + idx));
    day = moment(main).format("ddd");
    date = moment(main).format("Do");
  } else {
    main = new Date(
      nextWeek.setDate(
        nextWeek.getDate() + ((7 - nextWeek.getDay() + idx) % 7) || 7
      )
    );
    date = moment(main).format("Do");
    day = moment(main).format("ddd");
  }
  return { day, date, main };
};

export const dateSetting = [
  {
    id: 1,
    day: start(1).day,
    date: start(1).date,
    main: start(1).main.toISOString(),
  },
  {
    id: 2,
    day: start(2).day,
    date: start(2).date,
    main: start(2).main.toISOString(),
  },
  {
    id: 3,
    day: start(3).day,
    date: start(3).date,
    main: start(3).main.toISOString(),
  },
  {
    id: 4,
    day: start(4).day,
    date: start(4).date,
    main: start(4).main.toISOString(),
  },
  {
    id: 5,
    day: start(5).day,
    date: start(5).date,
    main: start(5).main.toISOString(),
  },
  {
    id: 6,
    day: start(6).day,
    date: start(6).date,
    main: start(6).main.toISOString(),
  },
];
export const timeSetting = [
  { name: "09:00am" },
  { name: "10:00am" },
  { name: "11:00am" },
  { name: "12:00pm" },
  { name: "01:00pm" },
  { name: "02:00pm" },
  { name: "03:00pm" },
  { name: "04:00pm" },
  { name: "05:00pm" },
];
