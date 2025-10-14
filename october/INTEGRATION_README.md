# Gemini API Integration - DolReal Swedish Health Bus Schedule System

## Översikt (Overview)

Detta är en browser-baserad implementation av Gemini API-integration för DolReal Swedish Health Bus Schedule System. Systemet stöder alla fyra agenter med säker API-nyckelhantering och validering.

This is a browser-based implementation of Gemini API integration for the DolReal Swedish Health Bus Schedule System. The system supports all four agents with secure API key management and validation.

## Funktioner (Features)

- ✅ **Säker API-nyckelhantering** - Lagras lokalt, aldrig i kod
- ✅ **Validering** - Automatisk validering av API-nycklar och systemkrav
- ✅ **4 Agenter** - Stöd för alla fyra systemagenter
- ✅ **Svenska UI** - Fullständigt svenskt användargränssnitt
- ✅ **ES6+ Moduler** - Modern JavaScript med modulmönster
- ✅ **Felhantering** - Omfattande felhantering med återförsök
- ✅ **Tillgänglighet** - WCAG-kompatibel design

## Projektstruktur (Project Structure)

```
october/
├── index.html                      # Huvudsida
├── scripts.js                      # Applikationsinitierare
├── style.css                       # Stilmallar
├── INTEGRATION_README.md           # Denna fil
└── modules/
    ├── gemini-api-module.js        # Gemini API-klient
    ├── utility.js                  # Delade hjälpfunktioner
    └── validation.js               # Validering och system checks
```

## Installation

### Steg 1: Skaffa API-nyckel

1. Gå till [Google AI Studio](https://aistudio.google.com/apikey)
2. Logga in med ditt Google-konto
3. Klicka på "Create API Key"
4. Kopiera din API-nyckel (börjar med `AIza`)

### Steg 2: Konfigurera miljö

Skapa en `.env` fil i projektets root (redan i `.gitignore`):

```bash
GEMINI_API_KEY=AIzaSyDP3wr_5BsxXDIOxvx0X1vIjBDnVgH8yhE
```

**OBS:** Commita ALDRIG `.env` filen till git!

### Steg 3: Kör applikationen

#### Alternativ A: Lokal webbserver (Rekommenderad)

```bash
# Med Python
python3 -m http.server 8000

# Med Node.js
npx http-server -p 8000

# Med PHP
php -S localhost:8000
```

Öppna sedan: `http://localhost:8000/october/`

#### Alternativ B: Direkt i webbläsare

Öppna `october/index.html` direkt i webbläsaren. **OBS:** Vissa funktioner kan vara begränsade p.g.a. CORS.

## Användning (Usage)

### Konfigurera API-nyckel via UI

1. Öppna applikationen i webbläsaren
2. Ange din API-nyckel i fältet "Gemini API-nyckel"
3. Klicka på "Spara API-nyckel"
4. Systemet validerar och initierar automatiskt

### Validera systemet

```javascript
// Validera Gemini API
await Validation.checkGeminiAPI();

// Validera miljö
Validation.checkEnvironment();

// Validera webbläsare
Validation.checkBrowser();

// Validera allt
await Validation.checkAll();
```

### Generera innehåll

```javascript
import { GeminiAPI } from './modules/gemini-api-module.js';

// Initiera API
await GeminiAPI.initialize({ 
  apiKey: 'din-api-nyckel' 
});

// Generera innehåll
const result = await GeminiAPI.generateContent(
  'Beskriv Sveriges hälsovårdssystem i 100 ord',
  {
    model: 'gemini-2.5-pro',
    temperature: 0.7,
    maxOutputTokens: 8192
  }
);

if (result.success) {
  console.log(result.text);
}
```

## API-referens

### GeminiAPI Module

#### `initialize(options)`
Initierar Gemini API-modulen.

**Parametrar:**
- `options.apiKey` (string, optional): API-nyckel

**Returnerar:** `Promise<Object>`

```javascript
const result = await GeminiAPI.initialize({
  apiKey: 'AIza...'
});
```

#### `generateContent(prompt, options)`
Genererar innehåll med Gemini API.

**Parametrar:**
- `prompt` (string): Textprompt att skicka
- `options.model` (string): Modell att använda
- `options.temperature` (number): Temperatur (0-1)
- `options.maxOutputTokens` (number): Max tokens

**Returnerar:** `Promise<Object>`

```javascript
const result = await GeminiAPI.generateContent(
  'Hej världen',
  { temperature: 0.5 }
);
```

#### `testConnection()`
Testar anslutningen till Gemini API.

**Returnerar:** `Promise<Object>`

#### `listModels()`
Listar tillgängliga modeller.

**Returnerar:** `Promise<Object>`

#### `getStatus()`
Hämtar nuvarande modulstatus.

**Returnerar:** `Object`

### Validation Module

#### `checkGeminiAPI()`
Validerar Gemini API-konfiguration.

**Returnerar:** `Promise<Object>`

#### `checkEnvironment()`
Kontrollerar miljökonfiguration.

**Returnerar:** `Object`

#### `checkBrowser()`
Kontrollerar webbläsarkompatibilitet.

**Returnerar:** `Object`

#### `checkAll()`
Kör alla valideringar.

**Returnerar:** `Promise<Object>`

### Utility Module

#### `log.info(message, ...args)`
Loggar informationsmeddelande.

#### `log.error(message, ...args)`
Loggar felmeddelande.

#### `log.success(message, ...args)`
Loggar framgångsmeddelande.

#### `getEnvVar(key)`
Hämtar miljövariabel.

#### `setEnvVar(key, value)`
Sätter miljövariabel (localStorage).

#### `showNotification(message, type)`
Visar notifikation för användaren.

## Säkerhet (Security)

### API-nyckelhantering

**✅ Gör:**
- Lagra API-nycklar i `.env` filer (aldrig i git)
- Använd miljövariabler för produktion
- Maskera API-nycklar i UI (typ="password")
- Använd HTTPS för produktion

**❌ Gör INTE:**
- Hårdkoda API-nycklar i källkoden
- Commita `.env` filer till git
- Dela API-nycklar i plaintext
- Använd samma nyckel för dev och prod

### Rekommendationer för produktion

1. **Backend Proxy**: Implementera ett backend API som hanterar Gemini-anrop
2. **Rate Limiting**: Begränsa antalet API-anrop per användare
3. **Autentisering**: Kräv användarautentisering för API-åtkomst
4. **Monitoring**: Övervaka API-användning och kostnader
5. **Error Handling**: Logga fel säkert utan att exponera känslig data

## Felsökning (Troubleshooting)

### API-nyckeln fungerar inte

**Problem:** "Ogiltig API-nyckel" eller "API-fel"

**Lösning:**
1. Kontrollera att nyckeln börjar med `AIza`
2. Verifiera att nyckeln är korrekt kopierad (inga mellanslag)
3. Kontrollera att API-nyckeln har aktiverats i Google Cloud Console
4. Säkerställ att "Generative Language API" är aktiverad

### CORS-fel

**Problem:** "Access to fetch has been blocked by CORS policy"

**Lösning:**
1. Använd en lokal webbserver (se Installation)
2. Använd HTTPS för produktion
3. Implementera ett backend proxy för API-anrop

### LocalStorage inte tillgängligt

**Problem:** "LocalStorage inte tillgänglig"

**Lösning:**
1. Kontrollera webbläsarinställningar
2. Säkerställ att cookies/localStorage är aktiverat
3. Testa i inkognito-läge
4. Använd en annan webbläsare

### Timeout-fel

**Problem:** "Förfrågan tog för lång tid"

**Lösning:**
1. Kontrollera internetanslutningen
2. Öka timeout i konfigurationen
3. Använd kortare prompts
4. Kontrollera Gemini API-status

## Validering och tester

### Manuell validering

Klicka på "Validera allt" i UI för att köra alla kontroller:

- ✓ Gemini API-konfiguration
- ✓ Miljökonfiguration
- ✓ Webbläsarkompatibilitet
- ✓ Nätverksanslutning

### Kommandoradsvalidering

```bash
# Kontrollera API-nyckel i .env
grep GEMINI_API_KEY .env

# Testa med curl
curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY"
```

## Versionshistorik

### v1.0.0 (2025-10-14)
- ✅ Initial release
- ✅ Gemini API-integration
- ✅ Säker nyckelhantering
- ✅ Validering och felhantering
- ✅ Svenska UI-texter
- ✅ ES6+ moduler
- ✅ Komplett dokumentation

## Licens

MIT License - Se LICENSE-filen för detaljer

## Support

För problem eller frågor:
1. Kontrollera denna README
2. Se Felsökning-sektionen
3. Kontrollera [Gemini API-dokumentation](https://ai.google.dev/docs)
4. Öppna ett issue på GitHub

## Bidrag (Contributing)

Bidrag välkomnas! Vänligen:
1. Forka projektet
2. Skapa en feature branch
3. Commita dina ändringar
4. Öppna en Pull Request

---

**DolReal Swedish Health Bus Schedule System**  
Gemini API Integration v1.0.0  
© 2025 - Med svensk kvalitet ������
