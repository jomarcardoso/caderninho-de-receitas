import { useEffect } from 'react';
import { scrollToEl, scrollSpy, createScrollSpyItem } from 'ovos';
import { useNavigation } from '../providers';

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

export const useScroll = (): void => {
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

      const foodsPanel = document.querySelector('#foods') as HTMLElement;
      const mainPanel = document.querySelector('#main') as HTMLElement;
      const recipePanel = document.querySelector('#recipe') as HTMLElement;

      foodsPanel.setAttribute('aria-hidden', 'true');
      mainPanel.setAttribute('aria-hidden', 'true');
      recipePanel.setAttribute('aria-hidden', 'true');

      scrollSpy({
        method: 'EXACT',
        axis: 'x',
        elRelative: document.querySelector('#root-content') as HTMLElement,
        debounce: 100,
        list: [
          createScrollSpyItem({
            callback: ({ active }) => {
              if (active) {
                foodsPanel.removeAttribute('aria-hidden');

                if (
                  navigation.stack.length < 3 &&
                  window.location.hash !== '#food-modal'
                ) {
                  goTo('#foods');
                }
              } else {
                foodsPanel.setAttribute('aria-hidden', 'true');
              }
            },
            elContent: foodsPanel,
            elMenu: foodsPanel,
          }),
          createScrollSpyItem({
            callback: ({ active }) => {
              if (active) {
                mainPanel.removeAttribute('aria-hidden');

                if (
                  navigation.stack.length < 3 &&
                  window.location.hash !== '#food-modal'
                ) {
                  goTo('#main');
                }
              } else {
                mainPanel.setAttribute('aria-hidden', 'true');
              }
            },
            elContent: mainPanel,
            elMenu: mainPanel,
          }),
          createScrollSpyItem({
            callback: ({ active }) => {
              if (active) {
                recipePanel.removeAttribute('aria-hidden');

                if (
                  navigation.stack.length < 3 &&
                  window.location.hash !== '#food-modal'
                ) {
                  goTo('#recipe');
                }
              } else {
                recipePanel.setAttribute('aria-hidden', 'true');
              }
            },
            elContent: recipePanel,
            elMenu: recipePanel,
          }),
        ],
      });
    }, 1000);
  }, [goTo, navigation.stack.length]);
};
