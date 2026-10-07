import SocialLinks from './SocialLinks.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <p className="footer__name">JASMIN SAHU &copy; 2026</p>
        <SocialLinks className="social--footer" />
        <p className="footer__note">Built with curiosity &amp; code.</p>
      </div>
    </footer>
  )
}
