import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl">Expense Tracker</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/groups" className="text-white">
                Groups
              </Link>
            </li>
            <li>
              <Link to="/expenses" className="text-white">
                Expenses
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
