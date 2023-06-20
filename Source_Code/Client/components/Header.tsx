import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-blue-500 py-4">
      <nav className="container mx-auto flex items-center justify-between px-4">
        <h1 className="text-white font-bold text-2xl">
          Housing Prices Tracker
        </h1>
        <ul className="flex">
          <li>
            <Link className="text-white hover:text-gray-200 px-3 py-2" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-gray-200 px-3 py-2"
              href="/admin"
            >
              Admin
            </Link>
          </li>
          {/* <li>
            <Link
              className="text-white hover:text-gray-200 px-3 py-2"
              href="/houses"
            >
              Houses
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-gray-200 px-3 py-2"
              href="/region-statistics-has-cities"
            >
              Region Statistics Has Cities
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-gray-200 px-3 py-2"
              href="/cities"
            >
              Cities
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-gray-200 px-3 py-2"
              href="/region-statistics"
            >
              Region Statistics
            </Link>
          </li>
          <li>
            <Link
              className="text-white hover:text-gray-200 px-3 py-2"
              href="/zillow-estimates"
            >
              Zillow Estimates
            </Link>
          </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
