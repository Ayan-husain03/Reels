import { Link } from "react-router";

const FooterLinks = ({ leftText, leftLink, leftTo, rightText, rightTo }) => (
  <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 pt-4">
    <Link to={leftTo} className="hover:text-orange-500">
      {leftText}
    </Link>
    {rightText && (
      <Link to={rightTo} className="hover:text-orange-500">
        {rightText}
      </Link>
    )}
  </div>
);

export { FooterLinks };
