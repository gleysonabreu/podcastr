import { Dispatch, SetStateAction, useEffect, useState } from "react";

type Response<T> = [
  T,
  Dispatch<SetStateAction<T>>
]

function useThemeSwitcherState<T>(key: string, initialize: T): Response<T> {
  const isServer = typeof window === 'undefined';

  let html: HTMLHtmlElement;
  if (!isServer) {
    html = window.document.querySelector('html');
  }

  const [state, setState] = useState(() => {
    if (!isServer) {
      const storageValue = localStorage.getItem(key);

      if (storageValue) {
        return JSON.parse(storageValue);
      } else {
        return initialize;
      }
    }
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
    html.dataset.theme = state;
  }, [key, state]);

  return [state, setState]
}

export { useThemeSwitcherState };