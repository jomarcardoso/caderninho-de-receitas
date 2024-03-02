import { useEffect } from 'react';
import { scrollToEl, scrollSpy, createScrollSpyItem } from 'ovos';
import useNavigation from './use-navigation';

// let timeout: NodeJS.Timeout;

let busyScroll = false;

const busyScrollInterval = setInterval(() => {
  if (typeof window === 'undefined') {
    return;
  }

  clearInterval(busyScrollInterval);

  document.addEventListener('touchstart', () => {
    busyScroll = true;
  });
  document.addEventListener('touchend', () => {
    busyScroll = false;
  });
}, 1000);

const useScroll = (): void => {
  const { navigation, goTo } = useNavigation();

  useEffect(() => {
    const elMainPanel = document.querySelector('#main') as HTMLElement;

    if (busyScroll) {
      return;
    }

    if (navigation.stack.length === 1) {
      if (!elMainPanel) {
        return;
      }

      scrollToEl({
        el: elMainPanel,
      });

      return;
    }

    if (navigation.stack.length === 2) {
      if (navigation.stack[1] === '#recipe') {
        scrollToEl({
          el: document.querySelector('#recipe') as HTMLElement,
        });

        return;
      }

      if (navigation.stack[1] === '#foods') {
        scrollToEl({
          el: document.querySelector('#foods') as HTMLElement,
        });
      }
    }
  }, [navigation.stack]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (typeof window === 'undefined') {
        return;
      }

      clearInterval(interval);

      scrollSpy({
        method: 'EXACT',
        axis: 'x',
        elRelative: document.querySelector('#root-content') as HTMLElement,
        debounce: 100,
        list: [
          createScrollSpyItem({
            callback: ({ active }) => {
              if (active) {
                if (
                  navigation.stack.length < 3 &&
                  window.location.hash !== '#food-modal'
                ) {
                  goTo('#foods');
                }
              }
            },
            elContent: document.querySelector('#foods') as HTMLElement,
            elMenu: document.querySelector('#foods') as HTMLElement,
          }),
          createScrollSpyItem({
            callback: ({ active }) => {
              if (active) {
                if (
                  navigation.stack.length < 3 &&
                  window.location.hash !== '#food-modal'
                ) {
                  goTo('#main');
                }
              }
            },
            elContent: document.querySelector('#main') as HTMLElement,
            elMenu: document.querySelector('#main') as HTMLElement,
          }),
          createScrollSpyItem({
            callback: ({ active }) => {
              if (active) {
                if (
                  navigation.stack.length < 3 &&
                  window.location.hash !== '#food-modal'
                ) {
                  goTo('#recipe');
                }
              }
            },
            elContent: document.querySelector('#recipe') as HTMLElement,
            elMenu: document.querySelector('#recipe') as HTMLElement,
          }),
        ],
      });
    }, 1000);
  }, [goTo, navigation.stack.length]);
};

export default useScroll;
