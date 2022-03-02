import { useEffect } from 'react';
import { scrollToEl, ScrollSpy, createScrollSpyItem } from 'ovos';
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
    const elMainPanel = document.querySelector('#main-panel') as HTMLElement;

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
      if (navigation.stack[1] === '#recipe-panel') {
        scrollToEl({
          el: document.querySelector('#recipe-panel') as HTMLElement,
        });

        return;
      }

      if (navigation.stack[1] === '#foods-panel') {
        scrollToEl({
          el: document.querySelector('#foods-panel') as HTMLElement,
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

      ScrollSpy({
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
                  goTo('#foods-panel');
                }
              }
            },
            elContent: document.querySelector('#foods-panel') as HTMLElement,
            elMenu: document.querySelector('#foods-panel') as HTMLElement,
          }),
          createScrollSpyItem({
            callback: ({ active }) => {
              if (active) {
                if (
                  navigation.stack.length < 3 &&
                  window.location.hash !== '#food-modal'
                ) {
                  goTo('#main-panel');
                }
              }
            },
            elContent: document.querySelector('#main-panel') as HTMLElement,
            elMenu: document.querySelector('#main-panel') as HTMLElement,
          }),
          createScrollSpyItem({
            callback: ({ active }) => {
              if (active) {
                if (
                  navigation.stack.length < 3 &&
                  window.location.hash !== '#food-modal'
                ) {
                  goTo('#recipe-panel');
                }
              }
            },
            elContent: document.querySelector('#recipe-panel') as HTMLElement,
            elMenu: document.querySelector('#recipe-panel') as HTMLElement,
          }),
        ],
      });
    }, 1000);
  }, [goTo, navigation.stack.length]);
};

export default useScroll;
