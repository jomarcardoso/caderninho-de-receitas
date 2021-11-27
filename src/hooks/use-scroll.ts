/* eslint-disable */
import { useEffect } from 'react';
import { scrollToEl } from 'ovos';
import useNavigation from './use-navigation';

// let timeout: NodeJS.Timeout;

let busyScroll = false;

document.addEventListener('touchstart', () => {
  busyScroll = true;
});
document.addEventListener('touchend', () => {
  busyScroll = false;
});

const useScroll = () => {
  const { navigation, goTo } = useNavigation();

  useEffect(() => {
    if (busyScroll) {
      return;
    }
    // console.log(navigation.stack);

    if (navigation.stack.length === 1) {
      scrollToEl({
        el: document.querySelector('#main-panel') as HTMLElement,
      });
      return;
    }
    if (navigation.stack.length > 1) {
      if (navigation.stack[1] === 'recipe-panel') {
        scrollToEl({
          el: document.querySelector('#recipe-panel') as HTMLElement,
        });
        return;
      }
      if (navigation.stack[1] === 'foods-panel') {
        scrollToEl({
          el: document.querySelector('#foods-panel') as HTMLElement,
        });
      }
    }
  }, [navigation.stack]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (typeof window === 'undefined') {
        return;
      }

      const { ScrollSpy, createScrollSpyItem } = await import('ovos');

      clearInterval(interval);

      ScrollSpy({
        method: 'EXACT',
        axis: 'x',
        elRelative: document.querySelector('#root-content') as HTMLElement,
        debounce: 100,
        list: [
          createScrollSpyItem({
            // callback: ({ active }) => active && setCurrentPage('FOODS'),
            callback: ({ active }) => {
              if (active) {
                // console.log('#foods-panel');
                goTo('#foods-panel');
              }
            },
            elContent: document.querySelector('#foods-panel') as HTMLElement,
            elMenu: document.querySelector('#foods-panel') as HTMLElement,
          }),
          createScrollSpyItem({
            // callback: ({ active }) => active && setCurrentPage('HOME'),
            callback: ({ active }) => {
              if (active) {
                // console.log('#main-panel');
                goTo('#main-panel');
              }
            },
            elContent: document.querySelector('#main-panel') as HTMLElement,
            elMenu: document.querySelector('#main-panel') as HTMLElement,
          }),
          createScrollSpyItem({
            // callback: ({ active }) => active && setCurrentPage('RECIPE'),
            callback: ({ active }) => {
              if (active) {
                // console.log('#recipe-panel');
                goTo('#recipe-panel');
              }
            },
            elContent: document.querySelector('#recipe-panel') as HTMLElement,
            elMenu: document.querySelector('#recipe-panel') as HTMLElement,
          }),
        ],
      });
    }, 1000);
  }, [goTo]);
};

export default useScroll;
