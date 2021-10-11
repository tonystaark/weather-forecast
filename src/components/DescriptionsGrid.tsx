import { Descriptions } from "antd";
import { DescriptionDataModel } from "../models/model";
interface DescriptionsGridProps {
  title: string;
  column: number;
  data?: DescriptionDataModel[];
}

const DescriptionsGrid = ({
  title,
  column = 1,
  data,
}: DescriptionsGridProps) => {
  return (
    <Descriptions column={column}>
      {data &&
        data.map((d, idx) => {
          if (d.label !== "title") {
            return (
              <Descriptions.Item key={idx} label={d.label}>
                {d.value}
              </Descriptions.Item>
            );
          }
        })}
    </Descriptions>
  );
};

DescriptionsGrid.defaultProps = {
  title: "",
  column: 1,
};

export default DescriptionsGrid;
