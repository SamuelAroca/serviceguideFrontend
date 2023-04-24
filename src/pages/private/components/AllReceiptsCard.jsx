import ReceiptCard from "./ReceiptCard";

const AllReceiptsCards = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        marginTop: "5rem",
      }}
    >
      <div>
        {data?.map((c, index) => (
          <ReceiptCard key={index} data={c} />
        ))}
      </div>
    </div>
  );
};

export default AllReceiptsCards;
