import { Input } from "antd";

interface SearchBoxProps {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
const SearchBox = ({
  placeholder = "",
  value = "",
  onChange,
}: SearchBoxProps) => {
  return <Input placeholder={placeholder} value={value} onChange={onChange} />;
};

SearchBox.defaultProps = {
  placeholder: "",
  value: "",
};

export default SearchBox;
