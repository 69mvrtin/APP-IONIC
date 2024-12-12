import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';  // Importación correcta
import { Plugins } from '@capacitor/core';

const { Permissions } = Plugins;

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  segment = 'scan';
  scannedCode: string = '';
  locationErrorMessage: string = ''; // Si necesitas manejar un error de ubicación

  constructor(private platform: Platform) {}

  async ngOnInit() {
    if (this.platform.is('capacitor')) {
      await this.checkCameraPermissions();
    }
  }

  // Verificar permisos de la cámara
  async checkCameraPermissions() {
    try {
      const { status } = await Permissions['query']({ name: 'camera' });
      if (status !== 'granted') {
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

  // Función para escanear el código QR
  async qrcode(): Promise<void> {
    if (this.locationErrorMessage) {
      alert(this.locationErrorMessage);  // Mostrar mensaje de error si la ubicación no es válida
      return;
    }

    try {
      const result = await BarcodeScanner.startScan();  // Cambio: usar BarcodeScanner
      if (result?.hasContent) {
        this.scannedCode = result.content || 'Código QR no válido';
        console.log('Código QR escaneado:', this.scannedCode);
      } else {
        console.log('No se escaneó ningún código');
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
    }
  }


  // Método adicional si necesitas abrir la cámara directamente (opcional)
  async openCamera() {
    try {
      const result = await BarcodeScanner.startScan();  // Cambio: usar BarcodeScanner
      if (result?.hasContent) {
        this.scannedCode = result.content || 'Código QR no válido';
        console.log('Código QR escaneado:', this.scannedCode);
      }
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }
}
