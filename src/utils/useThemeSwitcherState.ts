import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>
]

function useThemeSwitcherState<T>(key: string, initialize: T): Response<T> {
  const isServer = typeof window === 'undefined';
  const [state, setState] = useState(() => {
     if (!isServer) {
      const storageValue = localStorage.getItem(key);

        if (storageValue) {
          return JSON.parse(storageValue);
        } else {
          return initialize;
        }
     } else {
       return initialize;
     }
  });

  if (!isServer) {
    const html: HTMLHtmlElement = window.document.querySelector('html');

    useEffect(() => {
      localStorage.setItem(key, JSON.stringify(state));
      html.dataset.theme = state;
    }, [key, state]);
  }

  return [state, setState]
}

export { useThemeSwitcherState };