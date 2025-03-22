import { Link, useLocation } from "wouter";

const Navbar = () => {
  const [location] = useLocation();

  return (
    <header className="w-full py-4 px-4 md:px-8 glass z-10">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <img src="/images/logo.png" alt="YURALINK Logo" className="h-10" />
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link href="/" 
                className={`${location === "/" ? "text-white" : "text-zinc-400"} hover:text-white transition-colors`}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" 
                className={`${location === "/about" ? "text-white" : "text-zinc-400"} hover:text-white transition-colors`}>
                About
              </Link>
            </li>
            <li>
              <Link href="/company-form" 
                className={`${location === "/company-form" ? "text-white" : "text-zinc-400"} hover:text-white transition-colors`}>
                Companies
              </Link>
            </li>
            <li>
              <Link href="/influencer-form" 
                className={`${location === "/influencer-form" ? "text-white" : "text-zinc-400"} hover:text-white transition-colors`}>
                Influencers
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
