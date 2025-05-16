

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiMenu, FiX } from "react-icons/fi";
import logo from "../../assets/tn_logo.png";
import Style from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef();

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // ⛔ Close menu if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <header className={Style.navbar}>
      <div className={Style.logoSection}>
        <Image src={logo} alt="Univota Logo" width={50} height={50} />
        <h1>Univota</h1>
      </div>

      <button onClick={toggleMenu} className={Style.menuButton}>
        {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      <nav ref={navRef} className={`${Style.navMenu} ${menuOpen ? Style.active : ""}`}>
        <p><Link href="/">Home</Link></p>
        <p><Link href="/candidate-regisration">Candidate Registration</Link></p>
        <p><Link href="/allowed-voters">Voter Registration</Link></p>
        <p><Link href="/voterList">Voter List</Link></p>
        <p><Link href="/result">Results</Link></p>
      </nav>
    </header>
  );
};

export default Navbar;
