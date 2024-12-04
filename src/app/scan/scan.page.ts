import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component'; // Ajusta la ruta según sea necesario
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Camera } from '@capacitor/camera'; // Importa la clase Camera
import { QrScannerService } from '../services/qr-scanner.service'; // Ajusta la ruta según tu proyecto

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  segment = 'scan';
  qrText = 'Confirma Tu Asistencia';
  scannedCode = '';

  constructor(
    private modalController: ModalController,
    private platform: Platform,
    private readonly qrScannerService: QrScannerService // Inyecta el servicio QrScannerService
  ) {}

  async ngOnInit() {
    // Verifica si la plataforma es Capacitor y solicita permisos de cámara
    if (this.platform.is('capacitor')) {
      try {
        const status = await Camera.requestPermissions();
        console.log('Camera permission status:', status);
      } catch (error) {
        console.error('Error requesting camera permission:', error);
      }

      BarcodeScanner.isSupported().then((supported) => {
        console.log('Scanner supported:', supported);
      });

      BarcodeScanner.checkPermissions().then((permissions) => {
        console.log('Permissions:', permissions);
      });
      BarcodeScanner.removeAllListeners();
    }
  }

  async starscan() {
    console.log('Iniciando escaneo...');
    const modal = await this.modalController.create({
      component: BarcodeScanningModalComponent,
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: [],
        LensFacing: LensFacing.Back,
      },
    });

    await modal.present();

    const { data } = await modal.onWillDismiss();
    
    if (data && data.barcode) {
      this.scannedCode = data.barcode.displayValue;
    }
  }

  async scanQRCode(): Promise<void> {
    const results = await this.qrScannerService.scan();
    if (results.length > 0) {
      console.log('Códigos QR escaneados:', results);
      // Aquí puedes agregar lógica adicional para manejar los resultados
    } else {
      console.warn('No se encontraron códigos QR.');
    }
  }
}