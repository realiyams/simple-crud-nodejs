const footerTemplate = document.createElement('template');

footerTemplate.innerHTML = `
  <style>
    .footer {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      background-color: red;
      color: white;
      text-align: center;
    }
  </style>
  <div class="footer">
    <p>Footer</p>
  </div>
`;

class Footer extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    // const fontAwesome = document.querySelector('link[href*="font-awesome"]')
    const shadowRoot = this.attachShadow({ mode: 'closed' })

    // if (fontAwesome) {
    //   shadowRoot.appendChild(fontAwesome.cloneNode())
    // }

    shadowRoot.appendChild(footerTemplate.content)
  }
}

customElements.define('footer-component', Footer)