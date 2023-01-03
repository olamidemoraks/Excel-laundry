import React, { useEffect, useState } from "react";

const useItem = (reservation) => {
  const [filterReserve, setFilterReserve] = useState([]);
  const initialData = {
    tShirt: 0,
    trouser: 0,
    shirt: 0,
    suit: 0,
    sweater: 0,
    blouse: 0,
    jeans: 0,
    jacket: 0,
  };
  const removeZero = (item) =>
    Object.keys(item)
      .filter((x) => item[x] !== 0)
      .reduce((newObj, key) => {
        newObj[key] = item[key];
        return newObj;
      }, {});
  useEffect(() => {
    const extractObj = Object.keys(initialData).reduce((newObj, key) => {
      newObj[key] = reservation[key];
      return newObj;
    }, {});
    const filterObj = removeZero(extractObj);
    const filterArr = Object.entries(filterObj).map((item) => ({
      [item[0]]: item[1],
    }));
    setFilterReserve(filterArr);
  }, []);

  return { filterReserve };
};

export default useItem;
