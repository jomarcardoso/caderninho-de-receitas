import { CiCircleChevRight } from 'react-icons/ci';
import { type FC, type HTMLProps, type ReactNode, useMemo } from 'react';
import './list-item.scss';
import { generateClasses } from 'services/dom/classes';
import Link, { LinkProps } from 'next/link';

interface Props {
  isAction?: boolean;
  isActive?: boolean;
  icon?: ReactNode;
  noGutters?: boolean;
  noBorder?: boolean;
}

export type ListItemProps = Props &
  HTMLProps<HTMLLIElement> &
  HTMLProps<HTMLButtonElement> &
  LinkProps;

export const ListItem: FC<ListItemProps> = ({
  children,
  isAction = false,
  isActive = false,
  icon = '',
  className = '',
  noGutters = false,
  noBorder = false,
  ...props
}) => {
  const { onClick } = props;

  const classes = generateClasses({
    'list-item': true,
    [className]: className,
    '-icon': !!icon,
    '-active': isActive,
    '-no-gutters': noGutters,
    '-no-border': noBorder,
  });

  const content = useMemo(
    () => (
      <>
        {icon && <div className="list-item__image">{icon}</div>}
        <div className="list-item__content">{children}</div>
        {isAction && (
          <CiCircleChevRight className="list-item__icon" />
        )}
      </>
    ),
    [children, icon, isAction],
  );

  if (onClick) {
    return (
      <button className={classes} {...props}>
        {content}
      </button>
    );
  }

  if (props.href) {
    return (
      <Link className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <li className={classes} {...props}>
      {content}
    </li>
  );
};

