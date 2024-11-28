import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component'; // Ajusta la ruta según sea necesario
import { LensFacing, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

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
    private platform: Platform // Inyectamos Platform
  ) {}

  async starscan() {
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

    if (data) {
      this.scannedCode = data?.barcode?.displayValue;
    }
  }

  ngOnInit(): void {
    if (this.platform.is('capacitor')) {
      BarcodeScanner.isSupported().then((supported) => {
        console.log('Scanner supported:', supported);
      });

      BarcodeScanner.checkPermissions().then((permissions) => {
        console.log('Permissions:', permissions);
      });
      BarcodeScanner.removeAllListeners();
    }
  }
}
