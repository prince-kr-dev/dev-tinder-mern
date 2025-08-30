import React from "react";

function Footer() {
  return (
    <footer className="bg-base-300 text-neutral-content p-3 mt-auto">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Left Side */}
        <aside className="flex items-center gap-3 text-center md:text-left">
          <p className="text-sm md:text-base">
            Copyright © {new Date().getFullYear()} - All rights reserved
          </p>
        </aside>

        {/* Right Side - Social Links */}
        <nav className="flex gap-6">
          {/* Twitter */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            Twitter
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            Instagram
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors"
          >
            LinkedIn
          </a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
