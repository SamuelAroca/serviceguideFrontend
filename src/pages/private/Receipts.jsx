import ReceiptCard from './components/ReceiptCard'

const Receipts = () => {

  const receipts = [
    {
      name: 'Monda',
      date: '21/02/2023',
      consumo: '9kWh',
      tipo: 'Energía',
      price: '500.000',
    },
    {
      name: 'Monda numero 2',
      date: '21/02/2023',
      consumo: '9kWh',
      tipo: 'Energía',
      price: '500.000',
    }
  ]
  
  return (
    <>
      <h1></h1>
      <div style={{display: 'flex', gap: '1rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {
        receipts.map(c =>  <ReceiptCard data={c}/>)
      }
      </div>
    </>
  );
};

export default Receipts;
