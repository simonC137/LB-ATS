import React from 'react';
import logo from '../assets/logo/logo-lifebonder.png';

const Footer = () => {
  return (
    <footer className="footer bg-orange-400 text-white p-10">
      <aside>
        <img className="w-10" src={logo} alt="company logo here" />
        <p className="text-2xl">LifeBonder.</p>
        <br />
        Lorem ipsum dolor sit amet.
      </aside>
      <nav>
        <h6 className="uppercase font-bold">Services</h6>
        <a className="link link-hover">Branding</a>
        <a className="link link-hover">Design</a>
        <a className="link link-hover">Marketing</a>
        <a className="link link-hover">Advertisement</a>
      </nav>
      <nav>
        <h6 className=" uppercase font-bold">Company</h6>
        <a className="link link-hover">About us</a>
        <a className="link link-hover">Find jobs</a>
        <a className="link link-hover">Blog</a>
        <a className="link link-hover">Contact</a>
      </nav>
      <nav>
        <h6 className="uppercase font-bold">Legal</h6>
        <a className="link link-hover">Terms of use</a>
        <a className="link link-hover">Privacy policy</a>
        <a className="link link-hover">Cookie policy</a>
      </nav>
    </footer>
  );
};

export default Footer;
