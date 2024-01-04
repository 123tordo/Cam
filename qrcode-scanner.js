import { html, css, LitElement } from "https://unpkg.com/lit?module";

export class QRCodeScanner extends LitElement {
  static styles = css`
    :host {
      display: block;
    }
  `;

  render() {
    return html`
      <style>
        #video {
          width: 100%;
          max-width: 350px;
          height: 250px;
        }
      </style>
      <video id="video" playsinline autoplay></video>
      <div>${this.decodedText}</div>
      <div>${this.errorMessage}</div>
    `;
  }

  firstUpdated() {
    const video = this.shadowRoot.querySelector("#video");

    const onSuccess = (stream) => {
      video.srcObject = stream;

      const track = stream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(track);

      const scanQRCode = async () => {
        const bitmap = await imageCapture.grabFrame();
        const code = jsQR(bitmap.data, bitmap.width, bitmap.height);

        if (code) {
          this.decodedText = code.data;
        }
      };

      setInterval(scanQRCode, 1000);
    };

    const onError = (error) => {
      this.errorMessage = `Error accessing camera: ${error}`;
    };

    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(onSuccess)
      .catch(onError);
  }
}

customElements.define("qrcode-scanner", QRCodeScanner);
