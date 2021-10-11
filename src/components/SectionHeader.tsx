import { PageHeader, Divider } from "antd";

interface SectionHeaderProps {
  title: string;
  subTitle: string;
}
const SectionHeader = ({ title, subTitle = "" }: SectionHeaderProps) => {
  return (
    <PageHeader className="site-page-header" title={title} subTitle={subTitle}>
      <Divider plain></Divider>
    </PageHeader>
  );
};

SectionHeader.defaultProps = {
  title: "",
  subTitle: "",
};

export default SectionHeader;
