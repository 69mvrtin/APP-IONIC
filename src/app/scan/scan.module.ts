import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ScanPage } from './scan.page';
import { ScanPageRoutingModule } from './scan-routing.module';
import { QrScannerService } from '../services/qr-scanner.service'; // Ajusta la ruta según tu estructura
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component'; // Ajusta la ruta según sea necesario

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanPageRoutingModule
  ],
  declarations: [ScanPage, BarcodeScanningModalComponent],
  providers: [QrScannerService] // Registra el servicio aquí
})
export class ScanPageModule {}