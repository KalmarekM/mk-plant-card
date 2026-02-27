# MK Plant Card & Alert Chip (Wersja Beta) 🌿

MK Plant Card to zestaw kart do Home Assistant, służących do monitorowania podstawowych i niezbędnych parametrów roślin. Skupia się na czytelnej prezentacji danych i szybkich powiadomieniach o zapotrzebowaniu na wodę.

## Co jest w środku?
- Inteligentna Karta Rośliny: Estetyczna karta wyświetlająca zdjęcie Twojej rośliny, dane o jej stanie (wilgotność gleby, temperatura, wilgotność powietrza) oraz przycisk szybkiego zapisu nawożenia.
- Odznaka Alertu (Chip): Mała ikona na górze Twojego pulpitu. Pozostaje dyskretna, gdy wszystko jest w porządku, ale zaczyna "pulsować" i wyświetla lokalizację rośliny, gdy ta potrzebuje wody lub ma za gorąco.
- Nawigacja jednym kliknięciem: Po prostu dotknij odznaki alertu, a pulpit płynnie przewinie się prosto do karty konkretnej rośliny.

## Jak zacząć?
Aby korzystać z systemu, musisz przygotować następujące dane:
1. Zdjęcie swojej rośliny (link lub lokalny plik)– zobacz: [Gdzie i jak umieścić zdjęcie rośliny?](#gdzie-i-jak-umieścić-zdjęcie-rośliny).
2. Czujniki: wilgotności gleby, temperatury, wilgotności powietrza oraz czujnik poziomu baterii.
3. Nazwę rośliny oraz jej lokalizację (obszar) przypisaną w Home Assistant.
4. Encje progów (min/max): Są one pobierane bezpośrednio z integracji Plant Monitor.

## Gdzie i jak umieścić zdjęcie rośliny?

Aby obrazek był widoczny na karcie, musisz go umieścić w zasobach lokalnych serwera:

1. **Folder fizyczny:** Pliki zdjęć wgraj do katalogu:  
   `\\x.x.x.x\config\www\images\plants\`
   
   *Wskazówka: Możesz również skorzystać ze zdjęć roślin utworzonych w tym katalogu automatycznie przez integrację **Plant Monitor**.*
2. **Adres URL:** Home Assistant mapuje folder `/www/` jako `/local/`. Twoje zdjęcia będą widoczne pod adresem:  
   `/local/images/plants/nazwa_pliku.jpg`
3. **Konfiguracja:** W ustawieniach karty, w polu **image**, wpisz powyższą ścieżkę (pamiętaj o zachowaniu wielkości liter w nazwie pliku).
4. 
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
## Pomocnik nawożenia
Karta pozwala nie tylko zapisywać datę ostatniego nawożenia, ale również o nim przypominać. 
1. **Zapisywanie**: Możesz utworzyć pomocnika (`input_datetime`) bezpośrednio w edytorze karty. 
2. **Interwał**: Ustaw co ile tygodni roślina powinna być nawożona.
3. **Inteligentne przypomnienie**: Jeśli od ostatniego nawożenia minie więcej czasu niż ustawiony interwał, przycisk "Zapisz nawożenie" zmieni kolor na czerwony, sygnalizując konieczność pielęgnacji.

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