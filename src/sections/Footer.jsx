import { socialImgs } from "../constant";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p>That’s my intro — looking forward to what’s next.</p>
        </div>
        <div className="socials">
          {socialImgs.map((img) => (
            <a key={img.url} className="icon" target="_blank" href={img.url}>
              <img src={img.imgPath} alt="social icon" />
            </a>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-center md:text-end">
            © {new Date().getFullYear()} Praveen Kumar M. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
