import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Usermain from './user-main'

export default function Home() {
  return (
    <div className={styles.container}>
      <Usermain/>
    </div>
  )
}
