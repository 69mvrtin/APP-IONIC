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
      if (status.camera !== 'granted') {
        await BarcodeScanner.requestPermissions();
      }
    } catch (error) {
      console.error('Error checking camera permissions:', error);
    }
  }

  /**
   * Escanea un código QR usando la cámara trasera y escucha el evento de escaneo.
   * Abre la cámara a pantalla completa.
   */
  async scanQRCode() {
    console.log('Iniciando escaneo...');
    try {
      // Inicia el escaneo y abre la cámara a pantalla completa
      await BarcodeScanner.startScan({
        formats: [BarcodeFormat.QrCode], // Solo escanea códigos QR
        lensFacing: LensFacing.Back,      // Usa la cámara trasera
      });

      // Escucha el evento de escaneo
      BarcodeScanner.addListener('barcodeScanned', (event) => {
        if (event.barcode) {
          this.scannedCode = event.barcode.displayValue || 'Código QR no válido';
          console.log('Código QR escaneado:', this.scannedCode);

          // Detiene el escaneo después de un resultado exitoso
          BarcodeScanner.stopScan();

          // Aquí puedes agregar lógica para cerrar la vista del escáner y regresar
          // Si estás usando una navegación de Ionic, por ejemplo:
          // this.router.navigate(['/home']); // Navega a la página principal
        }
      });
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      await BarcodeScanner.stopScan(); // Asegura detener el escaneo en caso de error
    }
  }
}
