import { NativeModules, DeviceEventEmitter, EmitterSubscription } from 'react-native';

const { RNDeviceOrientation } = NativeModules;

interface OrientationEvent {
  orientation: string;
}

interface SpecificOrientationEvent {
  specificOrientation: string;
}

class OrientationManager {
  private static instance: OrientationManager;
  private listeners: Record<string, EmitterSubscription> = {};

  private constructor() {}

  static getInstance(): OrientationManager {
    if (!this.instance) {
      this.instance = new OrientationManager();
    }
    return this.instance;
  }

  async getOrientation(): Promise<string> {
    return RNDeviceOrientation.getOrientation();
  }

  async getSpecificOrientation(): Promise<string> {
    return RNDeviceOrientation.getSpecificOrientation();
  }

  lockToPortrait(): void {
    RNDeviceOrientation.lockToPortrait();
  }

  lockToLandscape(): void {
    RNDeviceOrientation.lockToLandscape();
  }

  unlockAllOrientations(): void {
    RNDeviceOrientation.unlockAllOrientations();
  }

  addOrientationListener(callback: (orientation: string) => void): void {
    const subscription = DeviceEventEmitter.addListener('orientationDidChange', (event: OrientationEvent) => {
      callback(event.orientation);
    });
    this.listeners[callback.name] = subscription;
  }

  removeOrientationListener(callback: (orientation: string) => void): void {
    const subscription = this.listeners[callback.name];
    if (subscription) {
      subscription.remove();
      delete this.listeners[callback.name];
    }
  }

  addSpecificOrientationListener(callback: (specificOrientation: string) => void): void {
    const subscription = DeviceEventEmitter.addListener('specificOrientationDidChange', (event: SpecificOrientationEvent) => {
      callback(event.specificOrientation);
    });
    this.listeners[callback.name] = subscription;
  }

  removeSpecificOrientationListener(callback: (specificOrientation: string) => void): void {
    const subscription = this.listeners[callback.name];
    if (subscription) {
      subscription.remove();
      delete this.listeners[callback.name];
    }
  }

  getInitialOrientation(): string | undefined {
    return RNDeviceOrientation.initialOrientation;
  }
}

export const Orientation = OrientationManager.getInstance();
