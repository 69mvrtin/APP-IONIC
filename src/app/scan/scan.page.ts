import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

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
      const status = await BarcodeScanner.checkPermission();
      if (status.granted !== true) {
        // Solicitar permisos de cámara si no están concedidos
        console.log('Permiso de cámara no concedido');
      }
    } catch (error) {
      console.error('Error checking camera permissions:', error);
    }
  }

  /**
   * Escanea un código QR usando la cámara trasera y muestra el resultado.
   */
  async scanQRCode() {
    console.log('Iniciando escaneo...');
    try {
      // Inicia el escaneo y abre la cámara
      const result = await BarcodeScanner.startScan({
        // No es necesario usar 'continuousScan'
        // El escáner escaneará un solo código QR por vez
      });
  
      // Verifica si se obtuvo un resultado
      if (result?.hasContent) {
        // Accede al contenido escaneado
        this.scannedCode = result.content || 'Código QR no válido';
        console.log('Código QR escaneado:', this.scannedCode);
      }
  
      // Detiene el escaneo después de obtener el resultado
      await BarcodeScanner.stopScan();
    } catch (error) {
      console.error('Error al escanear el QR:', error);
      await BarcodeScanner.stopScan(); // Asegura detener el escaneo en caso de error
    }
  }
  
}