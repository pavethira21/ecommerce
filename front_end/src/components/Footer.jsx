export default function Footer(){
  function handleScroll(){
    window.scrollTo({
      top: 0,
      behavior: "smooth"
      
  });
  }
    return (
      <>
       
        <footer className="footer">
        <button className="scroll-btn" onClick={handleScroll}>Back to Top</button>
        <p>&copy; {new Date().getFullYear()} InMyHonestOpinion. All rights reserved.</p>
        <div className="footer-links">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Contact Us</a>
        </div>
       </footer>
       </>
            
    )
}