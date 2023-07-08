import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const PrevArrow = (props) => {
  const { className, onClick } = props;
  return <ArrowBackIosNewOutlinedIcon className={className} onClick={onClick} />;
};
export default PrevArrow;
