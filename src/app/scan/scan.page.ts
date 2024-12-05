import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from '@capacitor/barcode-scanner';

// Define la interfaz ScanResult para el tipo de datos del resultado del escaneo
interface ScanResult {
  text: string; // El contenido del código escaneado
  // Puedes agregar más propiedades si es necesario, dependiendo del objeto que devuelva el escáner
}

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
})
export class ScanPage implements OnInit {
  segment: string = 'generar';
  qrText: string = '';
  materiaSeleccionada: string = '';
  username: string = '';
  result: string = '';
  scannedData: any;
  weatherData: any;
  horaActual: string = '';
  asignatura: string = '';
  seccion: string = '';
  sala: string = '';
  fecha: string = '';
  locationErrorMessage: string = '';
  scannedCode: string = '';

  constructor(private platform: Platform) {}

  async ngOnInit() {
    // Tu lógica de inicialización si es necesario
  }

  async qrcode(): Promise<void> {
    try {
      const result = await CapacitorBarcodeScanner.scanBarcode({
        hint: CapacitorBarcodeScannerTypeHint.ALL
      });

      // Imprimir el resultado para ver las propiedades disponibles
      console.log('Resultado del escaneo:', result);

      // Si el resultado es válido y tiene la propiedad "text", asignarlo
      if (result && 'text' in result) {
        const scanResult = result as ScanResult;  // Hacemos un cast a ScanResult
        this.scannedCode = scanResult.text; // Asigna el contenido del código QR
        console.log('Código QR escaneado:', this.scannedCode);
      } else {
        console.error('No se encontró la propiedad "text" en el resultado');
      }
    } catch (error) {
      console.error('Error al escanear el código QR:', error);
    }
  }
}
