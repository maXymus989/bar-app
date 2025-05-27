import { useEffect, useState, useRef } from "react";
import { Slot } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { Audio } from "expo-av"; // Використовуємо Audio з expo-av напряму, оскільки useAudioPlayer може бути не настільки гнучким для черг

SplashScreen.preventAutoHideAsync();

// Список ваших музичних треків
const musicTracks = [
  require("../assets/music/jazz-1.mp3"),
  require("../assets/music/jazz-2.mp3"),
  require("../assets/music/jazz-3.mp3"),
  require("../assets/music/jazz-4.mp3"),
];

export default function RootLayout() {
  // Для керування Splash Screen
  useEffect(() => {
    const prepare = async () => {
      await SplashScreen.hideAsync();
    };
    prepare();
  }, []);

  // Стан для поточного відтворюваного треку
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  // Ref для зберігання об'єкта Sound
  const soundRef = useRef(null);

  useEffect(() => {
    let isMounted = true; // Прапорець для запобігання оновлення стану після розмонтування

    const playRandomTrack = async () => {
      // 1. Зупинити і вивантажити попередній звук, якщо він є
      if (soundRef.current) {
        await soundRef.current.unloadAsync();
        soundRef.current = null;
      }

      // 2. Вибрати випадковий індекс треку
      const randomIndex = Math.floor(Math.random() * musicTracks.length);
      // Переконайтеся, що не відтворюємо той самий трек двічі поспіль, якщо можливо
      // Хоча для випадкового порядку це не критично, але може покращити відчуття випадковості
      // if (musicTracks.length > 1 && randomIndex === currentTrackIndex) {
      //   randomIndex = (randomIndex + 1) % musicTracks.length;
      // }

      if (!isMounted) return; // Перевірка перед оновленням стану

      setCurrentTrackIndex(randomIndex);

      // 3. Завантажити новий звук
      const { sound } = await Audio.Sound.createAsync(
        musicTracks[randomIndex],
        { shouldPlay: true, isLooping: false } // isLooping: false, оскільки ми перемикаємо треки вручну
      );

      soundRef.current = sound;

      // 4. Додати слухача подій, щоб знати, коли трек закінчився
      sound.setOnPlaybackStatusUpdate(async (status) => {
        if (status.didJustFinish && !status.isLooping) {
          // Якщо трек закінчився, відтворити наступний випадковий трек
          if (isMounted) {
            playRandomTrack();
          }
        }
      });

      // 5. Почати відтворення
      await sound.playAsync();
    };

    playRandomTrack();

    // Функція очищення: зупинити відтворення та вивантажити звук при розмонтуванні компонента
    return () => {
      isMounted = false; // Встановлюємо прапорець, що компонент розмонтований
      if (soundRef.current) {
        soundRef.current.stopAsync();
        soundRef.current.unloadAsync();
        soundRef.current = null;
      }
    };
  }, []); // Пустий масив залежностей означає, що ефект запускається лише один раз при монтуванні

  return <Slot />;
}
