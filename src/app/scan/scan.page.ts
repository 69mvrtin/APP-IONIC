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

  constructor(private platform: Platform) {}

  async ngOnInit() {
    if (this.platform.is('capacitor')) {
      await this.checkCameraPermissions();
    }
  }

  /**
   * Verifica y solicita permisos de cámara.
   */
  async checkCameraPermissions() {
    try {
      const status = await BarcodeScanner.checkPermissions();
      console.log('Permissions:', status);

      if (status.camera !== 'granted') {
        const result = await BarcodeScanner.requestPermissions();
        console.log('Permissions granted:', result);
      }
    } catch (error) {
      console.error('Error checking camera permissions:', error);
    }
  }

  /**
   * Escanea un código QR usando la cámara trasera.
   */
  async scanQRCode() {
    console.log('Iniciando escaneo...');
    try {
      // Inicia el escaneo de QR
      await BarcodeScanner.startScan({
        formats: [BarcodeFormat.QrCode], // Solo escanea códigos QR
        lensFacing: LensFacing.Back,     // Usa la cámara trasera
      });

      // Escuchar cuando se escanea un código
      BarcodeScanner.addListener('barcodeScanned', (barcode: any) => {
        console.log('Código QR escaneado:', barcode.displayValue);
        this.scannedCode = barcode.displayValue || 'No se pudo leer el código';
        BarcodeScanner.stopScan(); // Detiene el escaneo después de capturar un código
      });
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      BarcodeScanner.stopScan(); // Detener el escaneo en caso de error
    }
  }
}
