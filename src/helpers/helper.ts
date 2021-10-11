import { DescriptionDataModel, indexedDbModel } from "../models/model";
import { dateInYearMonthDateDt, currentDateToDt } from "../utils/util";

export const convertBasicWeatherData = (
  inputData: any
): DescriptionDataModel[] => {
  let recordList: DescriptionDataModel[] = [];
  if (inputData.weather[0].main) {
    recordList.push({ label: "title", value: inputData.weather[0].main });
  }
  if (inputData.weather[0].description) {
    recordList.push({
      label: "Description",
      value: inputData.weather[0].description,
    });
  }
  if (inputData.main.temp_min && inputData.main.temp_max) {
    recordList.push({
      label: "Temperature",
      value: `${inputData.main.temp_min} ~ ${inputData.main.temp_max}`,
    });
  }
  if (inputData.main.humidity) {
    recordList.push({ label: "Humidity", value: inputData.main.humidity });
  }
  if (inputData.dt) {
    recordList.push({
      label: "Time",
      value: dateInYearMonthDateDt(inputData.dt),
    });
  }
  return recordList;
};

export const fetchFromIndexedDB = (db: any, setHistoryResult: any) => {
  let res: indexedDbModel[] = [];
  const transaction = db && db!.transaction("searchHistory", "readwrite");
  const store = transaction.objectStore("searchHistory");
  const index = store.index("dateTime");
  const cursorRequest = index.openCursor(null, "prev");
  cursorRequest.onsuccess = function (e: any | never) {
    let cursor: any | never = e.target.result;
    if (cursor) {
      res.push(cursor.value);
      cursor.continue();
    } else {
      setHistoryResult(res);
      return;
    }
  };
  return;
};

export const searchAction = async (
  getBasicWeather: any,
  cityName: string,
  countryCode: string,
  db: any,
  setWeatherResult: (res: any) => void,
  fetchFromIndexedDB: (
    db: any,
    setHistoryResult: React.Dispatch<React.SetStateAction<any>>
  ) => void,
  setHistoryResult: React.Dispatch<React.SetStateAction<any>>,
  setIsError: React.Dispatch<React.SetStateAction<any>>
): Promise<void> => {
  let result: any;
  try {
    result = await getBasicWeather(cityName, countryCode);
  } catch (err: any) {
    if (err && err.response) {
      setWeatherResult(err.response.data);
      setIsError(true);
    }
  }

  if (result) {
    setWeatherResult(result.data);
    let transaction = db && db!.transaction("searchHistory", "readwrite");
    let store = transaction.objectStore("searchHistory");
    store.put({
      cityName,
      countryCode,
      dateTime: currentDateToDt(),
    });
    fetchFromIndexedDB(db, setHistoryResult);
  }
};
