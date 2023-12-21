import Link from 'next/link';

const links = [
  { href: '/', text: 'Home' },
  { href: '/book', text: 'Books' },
  { href: '/author', text: 'Author' },
];

const Nav = () => (
  <nav className="bg-gray-100 p-4">
    <ul className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
      {links.map((link, index) => (
        <li key={index}>
          <Link
            href={link.href}
            className="text-blue-600 hover:text-blue-800 transition duration-300"
          >
            {link.text}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Nav;
