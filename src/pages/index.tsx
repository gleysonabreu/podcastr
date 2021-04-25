import { GetStaticProps } from 'next';
import { api } from '../services/api';

import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

import { convertDurationToTimeString } from '../utils/convertDurationToTimeString';
import { usePlayer } from '../contexts/PlayerContext';

import styles from './home.module.scss';
import { Podcast } from '../components/Podcast';

type Episode = {
  id: string;
  title: string;
  thumbnail: string;
  members: string;
  publishedAt: string;
  duration: number;
  durationAsString: string;
  url: string;
}

type HomeProps = {
  allEpisodes: Episode[];
  latestEpisodes: Episode[];
};

export default function Home({ allEpisodes, latestEpisodes }: HomeProps) {

  const episodeList = [...latestEpisodes, ...allEpisodes];

  const { playList } = usePlayer();
  
  return (
    <div className={styles.homepage}>

      <Head>
        <title>Home | Podcastr</title>
      </Head>

      <section className={styles.latestEpisodes}>
          <h2>Últimos lançamentos</h2>

          <ul>
            {latestEpisodes.map((episode, index) => (
              <Podcast key={episode.id} episode={episode}>
                <button type='button' onClick={() => playList(episodeList, index)}>
                  <img src="/play-green.svg" alt="Tocar episódio"/>
                </button>
              </Podcast>    
            ))}
          </ul>
      </section>  

      <section className={styles.latestEpisodes}>
        <h2>Todos episódios</h2>

        <ul>
            {allEpisodes.map((episode, index) => (
              <Podcast episode={episode} key={episode.id}>
                <button type='button' onClick={() => playList(episodeList, index + latestEpisodes.length)}>
                  <img src="/play-green.svg" alt="Tocar episódio"/>
                </button>
              </Podcast>
            ))}
          </ul>
      </section>  
    </div>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await api.get('/episodes', {
    params: {
      _limit: 12,
      _sort: 'published_at',
      _order: 'desc',
    },
  });

  const episodes = data.map(episode => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', {
        locale: ptBR,
      }),
      duration: Number(episode.file.duration),
      durationAsString: convertDurationToTimeString(Number(episode.file.duration)),
      url: episode.file.url,
    }
  });

  const latestEpisodes = episodes.slice(0, 2);
  const allEpisodes = episodes.slice(2, episodes.length);

  return {
    props: {
      allEpisodes,
      latestEpisodes,
    },
    revalidate: 60 * 60 * 8,
  }
}
