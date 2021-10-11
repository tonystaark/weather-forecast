import { Alert } from "antd";
import DescriptionsGrid from "../../components/DescriptionsGrid";
import { convertBasicWeatherData } from "../../helpers/helper";
import { checkIsEmptyObject } from "../../utils/util";

interface ResultSectionProps {
  result: any;
  countryCode: string | undefined;
  cityName: string | undefined;
  isError: boolean;
}
const ResultSection = ({
  result,
  countryCode,
  cityName,
  isError,
}: ResultSectionProps) => {
  return (
    <div className="result-section">
      <>
        {checkIsEmptyObject(result) ? (
          <h3>Please search for the weather for your desired location</h3>
        ) : result.cod && result.message ? (
          <h3>{isError && <Alert message="No data found" type="error" />}</h3>
        ) : (
          <>
            <h4 className="place-font">
              {result.name}, {result.sys.country}
            </h4>
            <h1 className="big-font">{result.weather[0].main}</h1>
            <DescriptionsGrid
              key={result.dt}
              data={convertBasicWeatherData(result)}
            />
          </>
        )}
      </>
    </div>
  );
};

export default ResultSection;
