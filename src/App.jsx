import { useContext } from "react";
import { Header } from "./components/Header";
import { RoutesMain } from "./routes/RoutesMain.jsx";
import { AppContext } from "./providers/AppContext.jsx";
import { Loading } from "./components/Loading"; // Importe o componente Loading
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/index.scss';

function App() {
  const { isLoading } = useContext(AppContext); // Pega o estado de loading do contexto

  return (
    <>
        {/* Se isLoading for true, a tela de loading será exibida */}
        {isLoading && <Loading />}
        
        <Header/>
        <ToastContainer autoClose={3000} theme="colored" position="bottom-right" />
        <RoutesMain/>
    </>
  );
}

export default App;