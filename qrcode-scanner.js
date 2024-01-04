import { html, css, LitElement } from "https://unpkg.com/lit?module";
import { Html5QrcodeScanner } from "https://unpkg.com/html5-qrcode?module";

export class QRCodeScanner extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <style>
        #reader {
          width: 100%;
          max-width: 350px;
          height: 250px;
        }
      </style>
      <div id="reader"></div>
      <div>${this.decodedText}</div>
      <div>${this.errorMessage}</div>
    `;
  }

  firstUpdated() {
    const onScanSuccess = (decodedText, decodedResult) => {
      this.decodedText = decodedText;
    };

    const onScanFailure = (errorMessage, error) => {
      this.errorMessage = errorMessage;
    };

    const config = {
      fps: 10,
      qrbox: {
        width: 350,
        height: 250,
      },
    };

    const reader = this.shadowRoot.querySelector("#reader");
    const html5QrcodeScanner = new Html5QrcodeScanner(reader, config);

    html5QrcodeScanner.render(onScanSuccess, onScanFailure);
  }
}

customElements.define("qrcode-scanner", QRCodeScanner);
