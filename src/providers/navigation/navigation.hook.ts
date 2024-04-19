import { useCallback, useContext, useEffect } from 'react';
import NavigationContext, { NavigationContextType } from './navigation.context';

interface UseNavigationReturn {
  goTo(newHash: string): void;
  goBack(): void;
  navigation: NavigationContextType;
}

const stepsByLevel = [['#main'], ['#foods', '#recipe'], ['#food-modal']];

let hash = '#main';

export const useNavigation = (): UseNavigationReturn => {
  const navigation = useContext(NavigationContext);

  const navigateBack = useCallback(() => {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => prevStack.slice(0, -1));
  }, [navigation]);

  function horizontalNavigate(newHash = '#main') {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => {
      return [...prevStack.slice(0, -1), newHash];
    });
  }

  function navigateAhead(newHash = '#main') {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => {
      return [...prevStack, newHash];
    });
  }

  function goBack() {
    if (window.location.hash === '#main') {
      return;
    }

    window.history.back();
  }

  function goTo(newHash = '#main') {
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
    if (window.location.hash === '#recipe') {
      window.history.pushState({}, '', '#main');

      setTimeout(() => {
        window.history.pushState({}, '', '#recipe');
      }, 100);

      hash = '#recipe';

      if (!navigation.setStack) {
        return;
      }

      navigation.setStack(['#main', '#recipe']);
    }

    if (window.location.hash === '#foods') {
      window.history.pushState({}, '', '#main');

      setTimeout(() => {
        window.history.pushState({}, '', '#foods');
      }, 100);

      hash = '#foods';

      if (!navigation.setStack) {
        return;
      }

      navigation.setStack(['#main', '#foods']);
    }
  }, []);

  return {
    goTo,
    goBack,
    navigation,
  };
};
