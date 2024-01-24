// RNDeviceOrientation.h

#import <React/RCTBridgeModule.h>

@interface RNDeviceOrientation : NSObject <RCTBridgeModule>

- (void)getOrientation:(RCTResponseSenderBlock)callback;
- (void)lockToPortrait;
- (void)lockToLandscape;
- (void)unlockAllOrientations;

@end
