---
templateKey: blog-post
title: Zakładanie kont O365 za pomocą PowerAutomate
date: 2020-04-22T19:29:54.270Z
description: "W tym artykule przedstawiam, jak zautomatyzowałem tworzenie nowych
  kont w Office 365 wraz z odpowiednim ustawieniem licencji. "
featuredpost: false
featuredimage: /img/coffee-gear.png
tags:
  - power automate
  - flow
  - azure ad
---
W tym artykule przedstawiam, jak zautomatyzowałem tworzenie nowych kont w Office 365 wraz z odpowiednim ustawieniem licencji. Narzędzia używane to: 
* Forms
* PowerAutomate (poprzednio MS Flow) 
* Azure Functions 

Workflow (high-level) wygląda jak poniżej (wygenerowane za pomocą draw.io):

![onboarding-workflow.png]({{site.baseurl}}/images/posts/onboardingpl/onboarding-workflow.png)

## Flow

Kilka dobrych praktyk, które używam: 

* Jeśli nie edytuję wartości, tylko ustawiam ją jednokrotnie, nie używam zmiennej, tylko elementu `Compose` 
* Dla lepszej widoczności staram się wszystkie potrzebne wartości (zmienne i elementy `Compose`) trzymać na najwyższym poziomie 

### Początek Flowa
Na początku Flowa, pobieram dane z formularza a także ustawiam, czy flow już jest gotowy "na produkcję".

Wartość elementu typu `Compose` (nazwa: Environment) będę potem używał do wybrania osób, które powinny dostać prośbę o zatwierdzenie (jeśli wartość jest inna niż `prod` - wysyłam do siebie).

W następnych krokach używam `Compose` do wygenerowania imienia i nazwiska bez polskich znaków. Używam do tego następującej formuły: 

``` 
replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(replace(body('Pobierz_dane_z_odpowiedzi')?['ID_POLA_Z_IMIENIEM],'ą','a'),'ć','c'),'ę','e'),'ł','l'),'ń','n'),'ó','o'),'ś','s'),'ż','z'),'ź','z'),'Ą','A'),'Ć','C'),'Ę','E'),'Ł','L'),'Ń','N'),'Ó','O'),'Ś','S'),'Ż','Z'),'Ź','Z') 
``` 
Następnie definiuję zestaw słów, których będę używał do wygenerowania hasła i zapisuję do zmiennej `passwordWords` (ponieważ jest to array, nie da się użyć elementu `Compose`):

```
[
  "Tutaj",
  "Wrzucam",
  "Kilka",
  "Randomowych",
  "Słów"
]
``` 
Hasło generuję za pomocą funkcji concat (znów w elemencie `Compose`):
``` 
@{variables('passwordWords')[rand(0,sub(length(variables('passwordWords')),1))]}@{rand(1000,9999)}
```

### Przypisanie do odpowiednich osób do akceptacji

Wybór osób odpowiedzialnych za akceptację będzie się odbywał za pomocą elementu `Switch`. Do tego celu użyję zmiennej, którą muszę najpierw zainicjować.

> **NOTKA**: element `Initialize variable` jest konieczny na najwyższym poziomie (nie może być pod instrukcją typu `Condition`, `Switch` etc.). W innym wypadku otrzymamy taki błąd:
> ![init-variable-error.png]({{site.baseurl}}/images/posts/onboardingpl/init-variable-error.png)
> Nie możemy też użyć `Set variable` bez uprzedniej inicjalizacji (dla tego elementu musimy wybrać istniejącą zmienną z listy).

Elementy użyte w tej części są jak poniżej:
![set-approver-wokflow.png]({{site.baseurl}}/images/posts/onboardingpl/set-approver-wokflow.png)

Za pomocą elementu `Condition` sprawdzam, czy jestem w tym momencie w trakcie testów, czy flow działa "na produkcji". Dla testów ustawiam siebie, jako osobę otrzymującą prośbę o zatwierdzenie. "Na produkcji" wybieram osobę akceptującą (approvera) za pomocą bloku `Switch`:

![approverzy-case.png]({{site.baseurl}}/images/posts/onboardingpl/approverzy-case.png)

W tym bloku, dla każdej możliwej wartości z formularza mam osobny `Case` (zestaw instrukcji do wykonanie w przypadku kiedy sprawdza. W nim definiuję array wartości, które następnie, za pomocą bloku `Apply to each` dodaję do zmiennej `Approver`. Można to zrobić na kilka innych sposobów, ale wybrałem ten, jako *w miarę czytelny*.

### Sprawdzenie, czy adres istnieje

Kolejnym krokiem przed rozpoczęciem procesu akceptacji jest zainicjowanie zmiennej `Status` (którą potem będę ustawiał i używał do wysłania odpowiednich powiadomień).

Dalej sprawdzam, czy dany adres już istnieje.

> **NOTKA**: Jeśli będzie już znaleziony, zakładam, że osoba, która wypełniła formularz, po prostu o nim zapomniała. Ze względu na małą skalę, nie zakładam tutaj kolizji imienia i nazwiska, takie przypadki na razie będą obsługiwane ręcznie).

Szukanie adresu w organizacji robię za pomocą `Search for users (V2)` z konektora `Office 365 Users`. W polu `Search term` wpisuję wygenerowany wcześniej adres mailowy:

```
outputs('Wygenerowany_adres_email')
```
W zaawansowanych opcjach wybieram `Top: 1`. W razie błędnie wygenerowanego adresu, uchroni mnie to przed pobraniem wszystkich adresów z organizacji (np. kiedy jako `Search term` podam `@domena.pl`).W

W następnym kroku, blokiem `Condition` porównuję następujące wartości:

```
length(body('Sprawdź,_czy_adres_już_istnieje')?['value'])
# is equal to
int(0)
```
Tłumacząc to na język polski, sprawdzam, czy ilość obiektów znalezionych w poprzednim kroku jest równa 0. Patrząc na tą formułę, może się nam nasunąć kilka pytań:
1. Po co używamy `?['value']` zamiast po prostu sprawdzić `length(body('Sprawdź,_czy_adres_już_istnieje'))`?
2. Czemu porównujemy do `int(0)` zamiast po prostu `0`?

Krótka odpowiedź na pytanie 1 brzmi: "Bo inaczej nie zadziała". Długa odpowiedź - poniżej.
