import React, { useState } from "react";
import DataTable from "../../components/DataTable";
import {
  indexedDbModel,
  formattedSearchHistoryModel,
} from "../../models/model";
import { fetchFromIndexedDB, searchAction } from "../../helpers/helper";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";
import { parseLocation } from "../../utils/util";
import { getBasicWeather } from "../../apis/api";

interface SearchHistoryProps {
  historyResult: any[];
  setHistoryResult: React.Dispatch<React.SetStateAction<any>>;
  cityName: string;
  setCityName: React.Dispatch<React.SetStateAction<any>>;
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<any>>;
  setWeatherResult: React.Dispatch<React.SetStateAction<any>>;
  setIsError: React.Dispatch<React.SetStateAction<any>>;
}
if (!window.indexedDB) {
  console.log(
    "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available."
  );
}

const openDBRequest = window.indexedDB.open("searchWeatherHistory");
let db: any;
openDBRequest.onupgradeneeded = function () {
  db = openDBRequest.result;
  const objStore = db.createObjectStore("searchHistory", {
    keyPath: "dateTime",
  });
  objStore.createIndex("dateTime", "dateTime", { unique: true });
};

const SearchHistory = ({
  historyResult,
  setHistoryResult,
  cityName,
  countryCode,
  setWeatherResult,
  setCityName,
  setCountryCode,
  setIsError,
}: SearchHistoryProps) => {
  openDBRequest.onsuccess = function () {
    fetchFromIndexedDB(openDBRequest.result, setHistoryResult);
  };

  const deleteFromIndexedDB = (dt: string) => {
    const request = openDBRequest.result
      .transaction("searchHistory", "readwrite")
      .objectStore("searchHistory")
      .delete(dt);
    request.onsuccess = function (e: any) {
      alert(`deleted record on ${dt}`);
      fetchFromIndexedDB(openDBRequest.result, setHistoryResult);
    };
  };

  const searchFromHistory = (e: any): void => {
    const parsed: string[] = parseLocation(e);
    setCityName(parsed[1]);
    setCountryCode(parsed[2]);
    searchAction(
      getBasicWeather,
      parsed[1],
      parsed[2],
      openDBRequest.result,
      setWeatherResult,
      fetchFromIndexedDB,
      setHistoryResult,
      setIsError
    );
  };
  const columns = [
    { dataIndex: "location", key: "location" },
    { dataIndex: "dateTime", key: "dateTime" },
    {
      dataIndex: "",
      key: "action",
      render: (e: formattedSearchHistoryModel) => {
        return (
          <>
            <SearchOutlined
              className="search-button"
              onClick={() => searchFromHistory(e.location)}
            />
            <DeleteOutlined onClick={() => deleteFromIndexedDB(e.dateTime)} />
          </>
        );
      },
    },
  ];

  const renderData = () => {
    let formatted: formattedSearchHistoryModel[] = [];
    if (historyResult.length > 0) {
      historyResult.map((r: indexedDbModel, idx) => {
        formatted.push({
          key: idx + 1,
          location: `${idx + 1}.  ${r.cityName}, ${r.countryCode}`,
          dateTime: r.dateTime,
        });
      });
    }
    return formatted;
  };

  return <DataTable columns={columns} dataSource={renderData()} />;
};

export default SearchHistory;
