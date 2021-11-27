import { useContext, useEffect } from 'react';
import NavigationContext from '../contexts/navigation-context';

const stepsByLevel = [
  ['#main-panel'],
  ['#foods-panel', '#recipe-panel'],
  ['#food-modal'],
];

let hash = '#main-panel';

const useNavigation = () => {
  const navigation = useContext(NavigationContext);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function navigateBack() {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => prevStack.slice(0, -1));
  }

  function horizontalNavigate(newHash = '#main-panel') {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => {
      return [...prevStack.slice(0, -1), newHash];
    });
  }

  function navigateAhead(newHash = '#main-panel') {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => {
      return [...prevStack, newHash];
    });
  }

  function goBack() {
    window.history.back();
  }

  function goTo(newHash = '#main-panel') {
    if (hash === newHash) {
      return;
    }

    const newLevel = stepsByLevel.findIndex((steps) => steps.includes(newHash));
    const level = stepsByLevel.findIndex((steps) => steps.includes(hash));

    hash = newHash;

    if (level === newLevel) {
      window.history.replaceState({}, '', newHash);
      horizontalNavigate(newHash);

      // console.log('goTo', 'horizontalNavigate');

      return;
    }

    if (newLevel < level) {
      goBack();
      navigateBack();

      // console.log('goTo', 'navigateBack');

      return;
    }

    if (newLevel > level) {
      window.history.pushState({}, '', newHash);
      navigateAhead(newHash);
      // console.log('goTo', 'navigateAhead');
    }
  }

  useEffect(() => {
    window.onpopstate = () => {
      if (hash === window.location.hash) {
        return;
      }

      console.log(hash, window.location.hash);

      hash = window.location.hash;
      navigateBack();
    };
  }, [navigateBack]);

  return {
    goTo,
    goBack,
    navigation,
  };
};

export default useNavigation;
