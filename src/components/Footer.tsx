export default function Footer() {
  return (
    <footer>
      <ul>
        <li><a href="https://elomagroup.com.au/about" target="_blank" rel="noopener">About</a></li>
        <li><a href="https://elomagroup.com.au/sustainability" target="_blank" rel="noopener">Sustainability</a></li>
        <li><a href="https://elomagroup.com.au/partners" target="_blank" rel="noopener">Partners</a></li>
        <li><a href="https://elomagroup.com.au/careers" target="_blank" rel="noopener">Careers</a></li>
        <li><a href="https://elomagroup.com.au/newsroom" target="_blank" rel="noopener">Newsroom</a></li>
        <li><a href="#contact">Contact</a></li>
      </ul>
      <p>ELOMA Group © <span id="yr">{new Date().getFullYear()}</span> · Australia</p>
    </footer>
  )
}
