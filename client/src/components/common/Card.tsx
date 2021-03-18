import React from "react";
import clsx from "clsx";

// core components
import useCardStyle from "../../assets/tsx/cardStyle";

interface CardProps {
  className?: any;
  plain?: boolean;
  carousel?: boolean;
  children: any;
  [key: string]: any;
}

const Card = (props: CardProps) => {
  const classes = useCardStyle();
  const { className, children, plain, carousel, ...rest } = props;
  const cardClasses = clsx({
    [classes.card]: true,
    [classes.cardPlain]: plain,
    [classes.cardCarousel]: carousel,
    [className]: className !== undefined,
  });
  return (
    <div className={cardClasses} {...rest}>
      {children}
    </div>
  );
};

export default Card;
