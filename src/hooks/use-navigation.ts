import { useCallback, useContext, useEffect } from 'react';
import NavigationContext, {
  NavigationContextType,
} from '../contexts/navigation-context';

interface UseNavigationReturn {
  goTo(newHash: string): void;
  goBack(): void;
  navigation: NavigationContextType;
}

const stepsByLevel = [
  ['#main-panel'],
  ['#foods-panel', '#recipe-panel'],
  ['#food-modal'],
];

let hash = '#main-panel';

const useNavigation = (): UseNavigationReturn => {
  const navigation = useContext(NavigationContext);

  const navigateBack = useCallback(() => {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => prevStack.slice(0, -1));
  }, [navigation]);

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
    if (window.location.hash === '#main-panel') {
      return;
    }

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

      return;
    }

    if (newLevel < level) {
      goBack();
      navigateBack();

      return;
    }

    if (newLevel > level) {
      window.history.pushState({}, '', newHash);
      navigateAhead(newHash);
    }
  }

  useEffect(() => {
    window.addEventListener('popstate', () => {
      if (hash === window.location.hash) {
        return;
      }

      hash = window.location.hash;
      navigateBack();
    });
  }, [navigateBack]);

  useEffect(() => {
    if (window.location.hash === '#recipe-panel') {
      window.history.pushState({}, '', '#main-panel');

      setTimeout(() => {
        window.history.pushState({}, '', '#recipe-panel');
      }, 100);

      hash = '#recipe-panel';

      if (!navigation.setStack) {
        return;
      }

      navigation.setStack(['#main-panel', '#recipe-panel']);
    }

    if (window.location.hash === '#foods-panel') {
      window.history.pushState({}, '', '#main-panel');

      setTimeout(() => {
        window.history.pushState({}, '', '#foods-panel');
      }, 100);

      hash = '#foods-panel';

      if (!navigation.setStack) {
        return;
      }

      navigation.setStack(['#main-panel', '#foods-panel']);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    goTo,
    goBack,
    navigation,
  };
};

export default useNavigation;
