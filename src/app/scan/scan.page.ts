import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';
import { Plugins } from '@capacitor/core';

const { Permissions } = Plugins;

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
      // Accede correctamente al método 'query' usando notación de corchetes
      const { status } = await Permissions['query']({ name: 'camera' });

      if (status !== 'granted') {
        console.log('Permiso de cámara no concedido');
        // Accede correctamente al método 'request' usando notación de corchetes
        const { granted } = await Permissions['request']({ name: 'camera' });
        if (granted) {
          console.log('Permiso de cámara concedido');
        } else {
          console.error('Permiso de cámara denegado');
        }
      } else {
        console.log('Permiso de cámara ya concedido');
      }
    } catch (error) {
      console.error('Error al verificar los permisos:', error);
    }
  }

  /**
   * Inicia el escaneo y abre la cámara para escanear códigos QR.
   */
  async scanQRCode() {
    console.log('Iniciando escaneo...');
    try {
      // Inicia el escaneo y abre la cámara
      const result = await BarcodeScanner.startScan();

      // Verifica si se obtuvo un resultado
      if (result?.hasContent) {
        // Accede al contenido escaneado
        this.scannedCode = result.content || 'Código QR no válido';
        console.log('Código QR escaneado:', this.scannedCode);
      } else {
        console.log('No se escaneó ningún código');
      }

      // Detiene el escaneo después de obtener el resultado
      await BarcodeScanner.stopScan();
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      await BarcodeScanner.stopScan(); // Detiene el escaneo en caso de error
    }
  }
}
