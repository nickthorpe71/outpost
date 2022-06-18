import styles from '../styles/Home.module.css'
import {useSocket} from '../context/socket.context';

export default function Home() {
  const {socket} = useSocket();
  return <div>{socket.id}</div>
}
