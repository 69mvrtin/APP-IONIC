import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner, BarcodeFormat, LensFacing } from '@capacitor-mlkit/barcode-scanning';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  segment = 'scan';
  scannedCode = '';
  private videoElement!: HTMLVideoElement;
  private videoStream!: MediaStream;

  constructor(private platform: Platform) {}

  async ngOnInit() {
    if (this.platform.is('capacitor')) {
      await this.checkCameraPermissions();
    }
  }

  async checkCameraPermissions() {
    try {
      const status = await BarcodeScanner.checkPermissions();
      if (status.camera !== 'granted') {
        await BarcodeScanner.requestPermissions();
      }
    } catch (error) {
      console.error('Error checking camera permissions:', error);
    }
  }

  /**
   * Inicia el escaneo en tiempo real con vista previa.
   */
  async scanQRCode() {
    console.log('Iniciando escaneo...');
    this.videoElement = document.getElementById('previewVideo') as HTMLVideoElement;

    try {
      // Obtén el stream de la cámara
      this.videoStream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'environment' }, // Cámara trasera
      });
      this.videoElement.srcObject = this.videoStream;

      // Inicia el escaneo
      await BarcodeScanner.startScan({
        formats: [BarcodeFormat.QrCode], // Solo QR
        lensFacing: LensFacing.Back,      // Usar la cámara trasera
      });

      // Escucha el evento de escaneo (escaneo continuo)
      BarcodeScanner.addListener('barcodeScanned', (event: any) => {
        if (event.barcode) {
          this.scannedCode = event.barcode.displayValue || 'Código QR no válido';
          console.log('Código QR escaneado:', this.scannedCode);

          // Detener escaneo si ya se escaneó un código
          this.stopScan();
        }
      });
    } catch (error) {
      console.error('Error al iniciar el escaneo:', error);
      this.stopScan(); // Detener el escaneo en caso de error
    }
  }

  /**
   * Detener el escaneo y cerrar la cámara.
   */
  stopScan() {
    if (this.videoStream) {
      const tracks = this.videoStream.getTracks();
      tracks.forEach((track) => track.stop());
    }

    if (this.videoElement) {
      this.videoElement.srcObject = null;
    }

    // Detener el escaneo en MLKit
    BarcodeScanner.stopScan();
  }
}
