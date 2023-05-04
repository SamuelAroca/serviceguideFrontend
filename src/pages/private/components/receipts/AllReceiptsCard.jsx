import ReceiptCard from "./ReceiptCard";
import { Link } from "react-router-dom";

const AllReceiptsCards = ({ data, getReceipts }) => {
  return (
    <div>
      <div>
        {data?.map((c, index) => (
          <ReceiptCard key={index} data={c} getReceipts={getReceipts} />
        ))}
      </div>
    </div>
  );
};

export default AllReceiptsCards;
