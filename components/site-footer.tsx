export function SiteFooter() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 px-6 mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">XP Store</h3>
          <p className="text-sm text-gray-400">Your one-stop gaming marketplace.</p>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-4">Shop</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">PlayStation</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Xbox</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Nintendo</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">PC Games</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li><a href="#" className="hover:text-primary transition-colors">Contact Us</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">FAQs</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-md font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4 text-xl">
            <a href="#" className="hover:text-primary transition-colors"><i className="ri-instagram-line"></i></a>
            <a href="#" className="hover:text-primary transition-colors"><i className="ri-facebook-line"></i></a>
            <a href="#" className="hover:text-primary transition-colors"><i className="ri-twitter-line"></i></a>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-10">
        © 2025 XP Store — All Rights Reserved.
      </p>
    </footer>
  );
}
