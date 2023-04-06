import ReceiptCard from './components/ReceiptCard';
import SideNav from './SideNav';

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
    <div style={{display: 'flex', flexDirection:'column', alignItems: "flex-end", marginRight:'10rem'}}>
      <SideNav />
      <h1></h1>
      <div style={{display: 'flex', gap: '2rem', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      {
        receipts.map((c, index) =>  <ReceiptCard key={index} data={c}/>)
      }
      </div>
    </div>
  );
};

export default Receipts;
