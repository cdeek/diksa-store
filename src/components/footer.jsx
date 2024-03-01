import { Link } from 'react-router-dom';

export default function Footer() {
  let showYear = new Date().getFullYear();
  return (
    <footer className="relative bottom-0 mt-4 bg-gray-800 p-1 text-center text-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <h3 className="text-xl text-gray-400 font-semibold mb-2">Diksa</h3>
            <ul className="list-none grid grid-cols-4">
              <li><Link to="/Linkbout">About Us</Link></li>
              <li><Link to="/contact_us">Contact Us</Link></li>
              <li><Link to="/terms_of_services">Terms of Services</Link></li>
              <li><Link to="/FAQ">FAQ</Link></li>
            </ul>
          </div>
          <hr />
          <div>
            <h3 className="text-lg text-gray-400 font-semibold mb-2">Products</h3>
            <ul className="list-none grid grid-cols-4">
              <li><Link to="/privacy">Privacy</Link></li>
              <li><Link to="/sell">Sell on Diksa</Link></li>
              <li><Link to="/report">Report a Product</Link></li>
              <li><a>Custom Orders</Link></li>
            </ul>
          </div>
          <hr />
          <div>
            <h3 className="text-lg text-gray-400 font-semibold mb-2">Connect</h3>
            <ul className="list-none grid grid-cols-4">
              <li>Facebook</li>
              <li>Twitter</li>
              <li>Instagram</li>
              <li>LinkedIn</li>
            </ul>
          </div>
          <hr />
          <div>
            <p>Subscribe to our newsletter for updates and exclusive offers.</p>
            <br />
            <Link to="/" className="bg-red-700 p-2 rounded-md">Subscribe</Link>
          </div>
          <div className="mt-4 bg-gray-900 p-2">
            <p>&copy; 2024-{showYear} Diksa lnc. All rights reserved.</p>
          </div>
        </div>
    </footer>
  );
}