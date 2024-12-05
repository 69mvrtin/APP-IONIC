import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

@Injectable({
  providedIn: 'root'
})
export class QrScannerService {
  private barcodeScannerSupported = false;

  constructor() {}

  async init(): Promise<void> {
    try {
      const result = await BarcodeScanner.isSupported();
      this.barcodeScannerSupported = result.supported;
    } catch (e) {
      console.error('Error al verificar soporte de escáner:', e);
    }
  }

  async scan(): Promise<string[]> {
    if (this.barcodeScannerSupported) {
      if (await this.requestPermissions()) {
        console.log('Iniciando escaneo, abriendo cámara...'); // Mensaje para verificar
        const { barcodes } = await BarcodeScanner.scan();
        return barcodes.map((barcode) => barcode.rawValue);
      } else {
        console.warn('Permisos de cámara denegados.');
        return [];
      }
    } else {
      console.error('Escáner no soportado.');
      return [];
    }
  }
  

  private async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }
}


