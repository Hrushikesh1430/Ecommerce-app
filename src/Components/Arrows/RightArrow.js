import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

const RightArrow = (props) => {
  const { className, onClick } = props;
  return <ArrowForwardIosOutlinedIcon className={className} onClick={onClick} />;
};
export default RightArrow;
