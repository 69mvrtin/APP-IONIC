import { Injectable } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  // Método para capturar una foto
  async capturePhoto(): Promise<string | null> {
    try {
      const photo = await Camera.getPhoto({
        quality: 100,
        allowEditing: true,
        resultType: CameraResultType.DataUrl,
      });
      return photo.dataUrl || null; // Retorna la URL de la foto
    } catch (error) {
      console.error('Error capturing photo:', error);
      return null;
    }
  }
}
