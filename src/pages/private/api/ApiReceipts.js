import axios from "axios";

const saveReceipts = async (receiptData) => {
  let url = "http://localhost:8080/api/receipts/add";

  try {
    const response = await axios({
      url: url,
      method: "POST",
      data: receiptData,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
};
