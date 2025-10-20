# GetPayIn - Online Store

A React Native e-commerce application built with modern technologies and best practices.

## Features

-  Browse products and categories
-  Secure authentication with biometrics
-  Auto-lock security feature
-  Offline mode support
-  Modern UI/UX design
-  State management with Redux Toolkit
-  API integration with React Query

## Tech Stack

- **React Native** - Cross-platform mobile development
- **TypeScript** - Type-safe code
- **Redux Toolkit** - State management
- **React Query** - Server state management
- **React Navigation** - Navigation system

## Prerequisites

- Node.js >= 20
- For Android:
  - Android Studio
  - Android SDK
  - JDK 17+
  - NDK (version 27.0.12077973 or higher)
- For iOS:
  - macOS
  - Xcode
  - CocoaPods

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Eng-Sharaf/GetPayIn.git
cd GetPayIn
```

2. Install dependencies:
```bash
npm install
```

3. For iOS (macOS only):
```bash
cd ios && pod install && cd ..
```

## Running the App

### Android

1. Start Metro bundler:
```bash
npm start
```

2. Run on Android (in a new terminal):
```bash
npm run android
```

Or use:
```bash
npx react-native run-android
```

### iOS (macOS only)
```bash
npm run ios
```

## Building for Production

### Android APK
```bash
cd android
./gradlew assembleRelease
```

APK will be available at: `android/app/build/outputs/apk/release/app-release.apk`

## Platform Notes

### Android
- Fully functional and tested
- All features working (auto-lock, biometrics, offline mode, etc.)
- APK available for testing

### iOS
- Code is iOS-compatible
- Requires macOS for building and testing
- Can be built using:
  - Physical Mac with Xcode
  - EAS Build cloud service
  - GitHub Actions with macOS runner

## Development Trade-offs

**Development Environment:**
- Developed on Windows, focused on Android implementation first
- iOS version uses identical codebase and will work once built on macOS
- All React Native code is cross-platform compatible

## Project Structure
```
OnlineStore/
├── android/          # Android native code
├── ios/              # iOS native code
├── src/
│   ├── components/   # Reusable components
│   ├── screens/      # Screen components
│   ├── navigation/   # Navigation configuration
│   ├── store/        # Redux store
│   ├── services/     # API services
│   └── utils/        # Utility functions
├── App.tsx           # Root component
└── package.json      # Dependencies
```

## Troubleshooting

### Android Build Issues

1. **NDK Error**: Make sure NDK is properly installed via Android Studio SDK Manager
2. **Gradle Version**: This project requires Gradle 8.13+
3. **Clean Build**: Run `cd android && ./gradlew clean` if you encounter build issues

### Metro Bundler Issues

Clear cache and restart:
```bash
npx react-native start --reset-cache
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is private and proprietary.

## Contact

For questions or support, please contact the development team.
