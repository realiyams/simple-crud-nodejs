const headerTemplate = document.createElement('template')

headerTemplate.innerHTML = `
  <style>
    .topnav {
      overflow: hidden;
      background-color: #333;
    }
    
    .topnav a {
      float: left;
      color: #f2f2f2;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
      font-size: 17px;
    }
    
    .topnav a:hover {
      background-color: #ddd;
      color: black;
    }
    
    .topnav a.active {
      background-color: #04AA6D;
      color: white;
    }
    
    .topnav-right {
      float: right;
    }
  </style>
  <div class="topnav">
    <a class="active" href="/">Dashboard</a>
    <div class="topnav-right">
      <a href="/history">History</a>
      <a href="/movies">Movies</a>
      <a href="/people">People</a>
      <a href="/about">About</a>
    </div>
  </div>
`;

class Header extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' })

    shadowRoot.appendChild(headerTemplate.content);
  }
}

customElements.define('header-component', Header)