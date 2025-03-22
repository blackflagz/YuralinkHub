import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="glass py-8 px-4 mt-20">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-xl font-bold text-white mb-4">YURALINK</h4>
            <p className="text-zinc-400">
              Connecting influencers and brands for authentic,
              impactful collaborations in the digital landscape.
            </p>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-zinc-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link href="/about" className="text-zinc-400 hover:text-white transition-colors">About</Link></li>
              <li><Link href="/company-form" className="text-zinc-400 hover:text-white transition-colors">For Companies</Link></li>
              <li><Link href="/influencer-form" className="text-zinc-400 hover:text-white transition-colors">For Influencers</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Contact Us</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>Email: info@yuralink.com</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Address: 123 Digital Way, Innovation City</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-zinc-800 mt-8 pt-8 text-center text-zinc-500">
          <p>&copy; {new Date().getFullYear()} YURALINK. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
