import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light border-top">
      <div className="container text-center">
        <div className="f-info-socials mb-2">
          <i className="fa-brands fa-square-facebook me-3"></i>
          <i className="fa-brands fa-square-instagram me-3"></i>
          <i className="fa-brands fa-linkedin"></i>
        </div>
        <div className="f-info-brand">&copy; Wonderlust Private Limited</div>
        <div className="f-info-links">
          <a href="/privacy" className="text-decoration-none text-dark me-3">Privacy</a>
          <a href="/terms" className="text-decoration-none text-dark">Terms</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;