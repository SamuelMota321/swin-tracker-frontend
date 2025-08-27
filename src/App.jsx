import { Header } from "./components/Header"
import { RoutesMain } from "./routes/RoutesMain.jsx"
import './styles/index.scss'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
        <Header/>
        <ToastContainer autoClose={3000} theme="colored" />
        <RoutesMain/>
    </>
  )
}

export default App