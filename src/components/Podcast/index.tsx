import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';

import styles from './styles.module.scss';

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

type PodcastProps = {
  episode: Episode;
  children: ReactNode;
}

function Podcast({ episode, children }: PodcastProps) {

  return(
    <li className={styles.podcast}>
      <Image 
        width={192}
        height={192}
        src={episode.thumbnail} 
        alt={episode.title}
        objectFit="cover"
      />

      <div className={styles.episodeDetails}>
          <Link href={`/episodes/${episode.id}`}>
            <a>
              {episode.title}
            </a>
          </Link>
          <p>{episode.members}</p>
          <span>{episode.publishedAt}</span>
          <span>{episode.durationAsString}</span>
        </div>

        {children}
  </li>
  );
}

export { Podcast };