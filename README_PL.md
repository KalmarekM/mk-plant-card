# MK Plant Card & Alert Chip (Wersja Beta) 🌿

Witaj w systemie MK Plant Card! To proste, a zarazem potężne narzędzie, dzięki któremu Twoja domowa dżungla w Home Assistant będzie zawsze szczęśliwa i odpowiednio nawodniona.

## Co jest w środku?
- Inteligentna Karta Rośliny: Estetyczna karta wyświetlająca zdjęcie Twojej rośliny, dane o jej stanie (wilgotność gleby, temperatura, wilgotność powietrza) oraz przycisk szybkiego zapisu nawożenia.
- Odznaka Alertu (Chip): Mała ikona na górze Twojego pulpitu. Pozostaje dyskretna, gdy wszystko jest w porządku, ale zaczyna "pulsować" i wyświetla lokalizację rośliny, gdy ta potrzebuje wody lub ma za gorąco.
- Nawigacja jednym kliknięciem: Po prostu dotknij odznaki alertu, a pulpit płynnie przewinie się prosto do karty konkretnej rośliny.

## Jak zacząć?
Aby korzystać z systemu, musisz przygotować następujące dane:
1. Zdjęcie swojej rośliny (link lub lokalny plik).
2. Czujniki: wilgotności gleby, temperatury, wilgotności powietrza oraz czujnik poziomu baterii.
3. Nazwę rośliny oraz jej lokalizację (obszar) przypisaną w Home Assistant.
4. Encje progów (min/max): Są one pobierane bezpośrednio z integracji Plant Monitor.

## Tworzenie opisu rośliny
Aby na karcie wyświetlała się instrukcja pielęgnacji, należy stworzyć sensor typu template. 

Krok 1: Stwórz plik description_of_plants.yaml w folderze konfiguracji.
Krok 2: W pliku configuration.yaml dodaj wpis:
template: !include description_of_plants.yaml

Krok 3: W pliku description_of_plants.yaml dodaj opis swojej rośliny według wzoru:
```YAML
- sensor:
    # SENSOR DLA KALATEI
    - name: "Opis rośliny Kalatea Lancetowata"
      unique_id: opis_roslina_kalatea_lancetowata
      icon: mdi:leaf
      state: "Aktywna"
      attributes:
        instrukcja: >
          **Kalatea lancetowata** (*Calathea lancifolia*) to roślina o wyjątkowej urodzie.
          * **Światło**: Najlepiej czuje się w miejscach o świetle rozproszonym lub w półcieniu.
          * **Podlewanie**: Podłoże powinno być stale lekko wilgotne, woda miękka.
          * **Temperatura i Wilgotność**: Uwielbia ciepło (18–25°C) i wysoką wilgotność powietrza.
          * **Podłoże**: Preferuje ziemię żyzną, próchniczą i dobrze przepuszczalną.
          * **Nawożenie**: Wymaga regularnego zasilania raz na dwa tygodnie w okresie wzrostu.
```
## Pomocnik daty nawożenia
Wygodną funkcją karty jest zapisywanie ostatniej daty nawożenia. Nie musisz szukać ustawień w panelu Home Assistant – możesz utworzyć ten element bezpośrednio podczas edycji karty (w polu Helper), co pozwoli na szybkie odnotowanie wykonanej pielęgnacji.

## Integracja Plant Monitor
Karta jest wspierana przez integrację Plant Monitor. Dostarcza niezbędne wartości progowe min/max dla Twoich czujników.

Dowiedz się więcej o Plant Monitor tutaj:
https://github.com/Ocell/plant-monitor

## Obsługiwane języki
- Angielski 🇺🇸
- Polski 🇵🇱
(Język wybierany jest automatycznie na podstawie ustawień Home Assistant).

## Podziękowania
Ten projekt powstał przy kreatywnym i technicznym wsparciu **Glorii (Gemini)**, asystentki AI. Pomogła ona w zaprojektowaniu architektury kodu, logiki nawigacji (Shadow DOM) oraz dokumentacji projektu.

## Ważna uwaga
⚠️ Wersja Beta: Ciągle się rozwijamy! Niektóre funkcje są jeszcze dopracowywane, ale Twoje rośliny już teraz są z nami bezpieczniejsze.

---
*Owocnej uprawy!* 🌿