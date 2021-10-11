import { Route, Switch, Link, withRouter } from "react-router-dom";
import { Breadcrumb, Alert } from "antd";
import WeatherPage from "./pages/WeatherPage";
const ClimatePage = () => (
  <ul className="climate-list">
    <li>
      <Link to="/rainfall">Rainfall</Link>：
      <Link to="/rainfall/details">Rainfall Detail 1</Link>
    </li>
    <li>
      <Link to="/temperature">Temperature</Link>：
      <Link to="/temperature/details">Temperature Detail 1</Link>
    </li>
  </ul>
);

// const breadcrumbNameMap: Record<string, string> = {
//   "/apps": "Application List",
//   "/rainfall": "Rainfall",
//   "/temperature": "Temperature",
//   "/rainfall/details": "Rainfall Detail",
//   "/temperature/details": "Detail",
// };

const AppRoute = withRouter((props) => {
  const { location } = props;
  const pathSnippets = location.pathname.split("/").filter((i) => i);
  // const extraBreadcrumbItems = pathSnippets.map((_, index) => {
  //   const url = `/${pathSnippets.slice(0, index + 1).join("/")}`;
  //   return (
  //     <Breadcrumb.Item key={url}>
  //       <Link to={url}>{breadcrumbNameMap[url]}</Link>
  //     </Breadcrumb.Item>
  //   );
  // });

  return (
    <div className="demo">
      <div className="demo-nav">
        <Link to="/">Weather</Link>
        <Link to="/climate">Climate</Link>
      </div>
      <Switch>
        <Route path="#" component={ClimatePage} />
        <Route path="/" component={WeatherPage} />
      </Switch>
    </div>
  );
});

export default AppRoute;
