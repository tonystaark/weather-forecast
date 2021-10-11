import React, { useState } from "react";
import { Layout, Row, Col } from "antd";
import { FormProvider } from "antd/lib/form/context";
import SectionHeader from "../../components/SectionHeader";
import SearchSection from "./SearchSection";
import ResultSection from "./ResultSection";
import SearchHistory from "./SearchHistory";

const { Content } = Layout;

const WeatherDashboard = () => {
  const [weatherResult, setWeatherResult] = useState<any>({});
  const [historyResult, setHistoryResult] = useState([]);
  const [cityName, setCityName] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isError, setIsError] = useState(false);

  return (
    <Layout>
      <Row>
        <Col span={24}>
          <SectionHeader title="Today's Weather" />
        </Col>
      </Row>
      <Layout>
        <Content>
          <Row>
            <Col xl={{ span: 16, offset: 0 }}>
              <SearchSection
                setWeatherResult={setWeatherResult}
                setHistoryResult={setHistoryResult}
                cityName={cityName}
                setCityName={setCityName}
                countryCode={countryCode}
                setCountryCode={setCountryCode}
                setIsError={setIsError}
              />
            </Col>
          </Row>
          <Row>
            <Col xl={{ span: 16, offset: 0 }}>
              <ResultSection
                key={weatherResult.dt}
                result={weatherResult}
                cityName={cityName}
                countryCode={countryCode}
                isError={isError}
              />
            </Col>
          </Row>
        </Content>
      </Layout>
      <Row>
        <Col span={24}>
          <SectionHeader title="Search History" />
        </Col>
      </Row>
      <Layout>
        <Content>
          <SearchHistory
            key={weatherResult.dt}
            historyResult={historyResult}
            setHistoryResult={setHistoryResult}
            cityName={cityName}
            setWeatherResult={setWeatherResult}
            setCityName={setCityName}
            countryCode={countryCode}
            setCountryCode={setCountryCode}
            setIsError={setIsError}
          />
        </Content>
      </Layout>
    </Layout>
  );
};

export default WeatherDashboard;
