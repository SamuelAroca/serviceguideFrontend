import ReceiptCard from "./ReceiptCard";
import { Link } from "react-router-dom";

const AllReceiptsCards = ({ data, getInformation }) => {
  return (
    <div>
      <div>
        {data?.map((c, index) => (
          <ReceiptCard key={index} data={c} getInformation={getInformation} />
        ))}
      </div>
    </div>
  );
};

export default AllReceiptsCards;
