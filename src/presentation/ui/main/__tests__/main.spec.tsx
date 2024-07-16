import { renderHook, act } from '@testing-library/react-hooks';
import * as SplashScreen from 'expo-splash-screen';
import { useFonts } from '@expo-google-fonts/karla';
import { useMain } from '../hooks/main.hook';

// Mocking expo-splash-screen and useFonts
jest.mock('expo-splash-screen');
jest.mock('@expo-google-fonts/karla');

describe('useMain hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be load fonts and hide splash screen', async () => {
    const fontsLoaded = true;
    const fontError = false;

    // Mock the implementation of useFonts
    (useFonts as jest.Mock).mockReturnValue([fontsLoaded, fontError]);

    const { result } = renderHook(() => useMain({}));

    // Simulate the layout root view call
    await act(async () => {
      await result.current.onLayoutRootView();
    });

    expect(result.current.fontsLoaded).toBe(fontsLoaded);
    expect(result.current.fontError).toBe(fontError);
    expect(SplashScreen.hideAsync).toHaveBeenCalled();
  });

  it('should be handle font loading error', async () => {
    const fontsLoaded = false;
    const fontError = true;

    // Mock the implementation of useFonts
    (useFonts as jest.Mock).mockReturnValue([fontsLoaded, fontError]);

    const { result } = renderHook(() => useMain({}));

    // Simulate the layout root view call
    await act(async () => {
      await result.current.onLayoutRootView();
    });

    expect(result.current.fontsLoaded).toBe(fontsLoaded);
    expect(result.current.fontError).toBe(fontError);
    expect(SplashScreen.hideAsync).toHaveBeenCalled();
  });
});
