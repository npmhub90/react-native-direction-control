import { NativeModules } from 'react-native';

const { NativeOrientationControl } = NativeModules;

export default class OrientationControl {
  static getOrientation(): Promise<string> {
    return NativeOrientationControl.getOrientation();
  }

  static lockToPortrait(): Promise<void> {
    return NativeOrientationControl.lockToPortrait();
  }

  static lockToLandscape(): Promise<void> {
    return NativeOrientationControl.lockToLandscape();
  }

  static unlockAllOrientations(): Promise<void> {
    return NativeOrientationControl.unlockAllOrientations();
  }
}
