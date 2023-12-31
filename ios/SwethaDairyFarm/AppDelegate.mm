#import "AppDelegate.h"
#import <Firebase.h> //firebase push notification
#import "Orientation.h" //add this line for orientation
#import <React/RCTBundleURLProvider.h>
#import "RNSplashScreen.h" //add this line for splash screen


@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure]; // add for firsebase push notification
  self.moduleName = @"SwethaDairyFarm";
  // You can add your custom initial props in the dictionary below.
  // They will be passed down to the ViewController used by React Native.
  self.initialProps = @{};
//  [RNSplashScreen show]; //add this line for splash screen
//  return [super application:application didFinishLaunchingWithOptions:launchOptions];
  BOOL ret = [super application:application didFinishLaunchingWithOptions:launchOptions]; if (ret == YES) { [RNSplashScreen show];  } return ret;
  
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}//add this line for Orientation

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index"];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}

@end
