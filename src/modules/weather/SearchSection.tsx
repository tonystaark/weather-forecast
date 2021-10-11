import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import CustomButton from "../../components/CustomButton";
import SearchBox from "../../components/SearchBox";
import { getBasicWeather } from "../../apis/api";
import { currentDateToDt } from "../../utils/util";
import { fetchFromIndexedDB, searchAction } from "../../helpers/helper";
interface SearchSectionProps {
  setWeatherResult: React.Dispatch<React.SetStateAction<any>>;
  setHistoryResult: React.Dispatch<React.SetStateAction<any>>;
  cityName: string;
  setCityName: React.Dispatch<React.SetStateAction<any>>;
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<any>>;
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
openDBRequest.onsuccess = function () {
  db = openDBRequest.result;
};

const SearchSection = ({
  setWeatherResult,
  setHistoryResult,
  cityName,
  countryCode,
  setCityName,
  setCountryCode,
  setIsError,
}: SearchSectionProps) => {
  const clearAction = () => {
    setCityName("");
    setCountryCode("");
    setIsError(false);
  };

  return (
    <Row gutter={[48, 24]}>
      <Col xs={{ span: 20, offset: 1 }} lg={{ span: 8, offset: 0 }}>
        <SearchBox
          placeholder="Enter city's name"
          value={cityName}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCityName(e.target.value)
          }
        />
      </Col>
      <Col xs={{ span: 20, offset: 1 }} lg={{ span: 8, offset: 0 }}>
        <SearchBox
          placeholder="Enter country's Code"
          value={countryCode}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setCountryCode(e.target.value)
          }
        />
      </Col>
      <Col
        xs={{ span: 7, offset: 1 }}
        sm={{ span: 3, offset: 1 }}
        md={{ span: 3, offset: 1 }}
        lg={{ span: 1, offset: 1 }}
        xl={{ span: 1, offset: 1 }}
      >
        <CustomButton
          onClickAction={() =>
            searchAction(
              getBasicWeather,
              cityName,
              countryCode,
              db,
              setWeatherResult,
              fetchFromIndexedDB,
              setHistoryResult,
              setIsError
            )
          }
        >
          Search
        </CustomButton>
      </Col>
      <Col
        xs={{ span: 7, offset: 1 }}
        sm={{ span: 3, offset: 2 }}
        md={{ span: 3, offset: 2 }}
        lg={{ span: 1, offset: 2 }}
        xl={{ span: 1, offset: 1 }}
      >
        <CustomButton onClickAction={clearAction}>Clear</CustomButton>
      </Col>
    </Row>
  );
};

export default SearchSection;
