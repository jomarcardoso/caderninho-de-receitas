import { useContext } from 'react';
import NavigationContext from '../contexts/navigation-context';

const stepsByLevel = [
  ['main-panel'],
  ['foods-panel', 'recipe-panel'],
  ['food-modal'],
];

const useNavigation = () => {
  const navigation = useContext(NavigationContext);

  function goTo(path: string) {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => {
      const level = stepsByLevel.findIndex((steps) => steps.includes(path));
      const currentLevel = navigation.stack.length - 1;

      if (path === prevStack[prevStack.length - 1]) {
        return prevStack;
      }

      if (level === currentLevel) {
        return [...prevStack.slice(0, -1), path];
      }

      if (level < currentLevel) {
        return prevStack.slice(0, level + 1);
      }

      return [...prevStack, path];
    });
  }

  function goBack() {
    if (!navigation.setStack) {
      return;
    }

    navigation.setStack((prevStack) => prevStack.slice(0, -1));
  }

  return {
    goTo,
    goBack,
    navigation,
  };
};

export default useNavigation;
