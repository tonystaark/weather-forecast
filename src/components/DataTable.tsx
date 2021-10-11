import { Table } from "antd";

interface DataTableColumn {
  title?: string;
  dataIndex: string;
  key: string;
  render?: (e: any) => React.ReactElement;
}

interface DataTableProps {
  columns: DataTableColumn[];
  dataSource: any[];
  showHeader?: boolean;
}
const DataTable = ({
  columns,
  dataSource,
  showHeader = false,
}: DataTableProps) => {
  return (
    <Table columns={columns} dataSource={dataSource} showHeader={showHeader} />
  );
};

DataTable.defaultProps = {
  title: "",
  subTitle: "",
  showHeader: false,
};

export default DataTable;
