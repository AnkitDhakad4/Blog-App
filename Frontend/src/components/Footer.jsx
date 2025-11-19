import { FaLinkedin, FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import Container from "./container";

export default function Footer() {
  return (
    <Container>
        <footer className="relative w-full mt-10 rounded-3xl ring-1  bg-[#1e1e1e] py-4 text-gray-400">
      <div className="max-w-6xl mx-auto px-6 flex flex-col items-center gap-4">

        {/* Logo */}
        <div className="text-xl font-semibold tracking-wide text-gray-200">
          Logo
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-2xl">
          <a
            href="https://linkedin.com"
            target="_blank"
            className="hover:text-blue-400 transition-all hover:scale-110"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://github.com"
            target="_blank"
            className="hover:text-white transition-all hover:scale-110"
          >
            <FaGithub />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            className="hover:text-pink-500 transition-all hover:scale-110"
          >
            <FaInstagram />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            className="hover:text-sky-400 transition-all hover:scale-110"
          >
            <FaTwitter />
          </a>
        </div>

        {/* Copyright */}
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} • 
          <a
            href="https://drive.google.com/file/d/1QeLXljxDF873qf4nbaAUX_pmIE1Ypg8N/view?usp=sharing"
            target="_blank"
            className="ml-1 text-gray-300 hover:text-white transition hover:underline"
          >
            Ankit Dhakad
          </a>
        </p>
      </div>
    </footer>
    </Container>
  );
}


