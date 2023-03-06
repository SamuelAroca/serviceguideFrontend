import styles from '../styled-sheets/Index.module.css';
import Login from './Login';
import Register from './Register';

const Index = () => {
  return (
    <div className={styles.main_container}>
      <header className={styles.header}></header>
      <div>
        <Login />
      </div>
    </div>
  )
};

export default Index;