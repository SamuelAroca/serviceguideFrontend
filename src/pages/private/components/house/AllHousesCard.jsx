import HouseCard from "./HouseCard";

const AllHousesCard = ({data}) => {

  return(
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
          <HouseCard key={index} data={c} />
        ))}
      </div>
    </div>
  )
};

export default AllHousesCard;