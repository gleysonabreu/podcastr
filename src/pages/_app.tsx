import { Header } from '../components/Header'; 
import { Player } from '../components/Player';
import { PlayerContextProvider } from '../contexts/PlayerContext';
import Head from 'next/head';

import styles from '../styles/app.module.scss';
import '../styles/global.scss';

function MyApp({ Component, pageProps }) {
  return(
    <PlayerContextProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />          
      </Head>
      <div className={styles.wrapper}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>
        <Player />
      </div>
    </PlayerContextProvider>
  );
}

export default MyApp
