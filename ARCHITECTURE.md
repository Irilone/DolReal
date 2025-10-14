# DolReal Gemini API Integration - Architecture

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                          Browser Environment                         │
│                                                                      │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                      index.html (UI Layer)                   │  │
│  │  - Swedish Language Interface                                │  │
│  │  - API Configuration Form                                    │  │
│  │  - Validation Controls                                       │  │
│  │  - Content Generation Testing                                │  │
│  │  - System Status Display                                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                               │                                     │
│                               ▼                                     │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │                  scripts.js (Controller)                     │  │
│  │  - Event Handlers                                            │  │
│  │  - UI State Management                                       │  │
│  │  - User Interaction Logic                                    │  │
│  └───────────┬─────────────────────────┬───────────────────────┘  │
│              │                         │                           │
│              ▼                         ▼                           │
│  ┌──────────────────────┐  ┌──────────────────────┐              │
│  │  utility.js          │  │  validation.js       │              │
│  │  ================     │  │  ==================  │              │
│  │  - Logging           │  │  - API Key Validation│              │
│  │  - Env Var Mgmt      │  │  - Environment Check │              │
│  │  - Error Messages    │  │  - Browser Check     │              │
│  │  - Notifications     │  │  - Connectivity Test │              │
│  │  - Sanitization      │  │  - Status Reporting  │              │
│  │  - Helper Functions  │  │  - Command Execution │              │
│  └──────────────────────┘  └──────────────────────┘              │
│              │                         │                           │
│              └──────────┬──────────────┘                           │
│                         ▼                                          │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │         gemini-api-module.js (API Client Layer)             │  │
│  │  =========================================================   │  │
│  │  - initialize()        : Setup with API key                 │  │
│  │  - testConnection()    : Verify API access                  │  │
│  │  - generateContent()   : Main content generation            │  │
│  │  - listModels()        : Get available models               │  │
│  │  - getStatus()         : Check module state                 │  │
│  │  - updateConfig()      : Modify configuration               │  │
│  │  - reset()             : Reset module state                 │  │
│  │                                                              │  │
│  │  Features:                                                   │  │
│  │  - Retry Logic (3 attempts with backoff)                    │  │
│  │  - Timeout Protection (30s default)                         │  │
│  │  - Error Handling                                            │  │
│  │  - Configuration Management                                  │  │
│  └──────────────────────┬──────────────────────────────────────┘  │
│                         │                                          │
│                         ▼                                          │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │              LocalStorage (Development)                      │  │
│  │  - ENV_GEMINI_API_KEY                                        │  │
│  │  - User preferences                                          │  │
│  │  - Configuration cache                                       │  │
│  └─────────────────────────────────────────────────────────────┘  │
│                                                                      │
└──────────────────────────┬───────────────────────────────────────────┘
                           │
                           │ HTTPS
                           │
                           ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    Google Gemini API                                 │
│  https://generativelanguage.googleapis.com/v1beta                   │
│                                                                      │
│  Endpoints:                                                          │
│  - /models?key={apiKey}              : List models                  │
│  - /models/{model}:generateContent   : Generate content             │
│                                                                      │
│  Configuration:                                                      │
│  - temperature: 0-1 (default 0.7)                                   │
│  - topK: 40                                                          │
│  - topP: 0.95                                                        │
│  - maxOutputTokens: 8192                                            │
└─────────────────────────────────────────────────────────────────────┘
```

## Data Flow

### Initialization Flow

```
User Opens Application
         │
         ▼
index.html loads
         │
         ├─→ style.css applied
         │
         ├─→ utility.js loaded
         │
         ├─→ validation.js loaded
         │
         ├─→ gemini-api-module.js loaded
         │
         └─→ scripts.js loaded
                  │
                  ▼
         DOMContentLoaded event
                  │
                  ├─→ Initialize UI
                  │
                  ├─→ Check for existing API key
                  │        │
                  │        ├─ Found → Auto-initialize GeminiAPI
                  │        │
                  │        └─ Not Found → Show config form
                  │
                  └─→ Display system status
```

### API Key Configuration Flow

```
User enters API key
         │
         ▼
Click "Spara API-nyckel"
         │
         ▼
handleSaveApiKey()
         │
         ├─→ Validate format (utility.js)
         │        │
         │        ├─ Invalid → Show error
         │        │
         │        └─ Valid → Continue
         │
         ├─→ Save to localStorage
         │
         └─→ Initialize GeminiAPI
                  │
                  ├─→ Test connection
                  │        │
                  │        ├─ Success → Enable features
                  │        │
                  │        └─ Fail → Show error
                  │
                  └─→ Update system status
```

### Content Generation Flow

```
User enters prompt
         │
         ▼
Click "Generera innehåll"
         │
         ▼
handleGenerateContent()
         │
         ├─→ Validate input
         │
         ├─→ Show loading state
         │
         └─→ GeminiAPI.generateContent()
                  │
                  ├─→ Build request payload
                  │
                  ├─→ fetchWithRetry()
                  │        │
                  │        ├─→ Attempt 1
                  │        │        │
                  │        │        ├─ Success → Return
                  │        │        │
                  │        │        └─ Fail → Retry
                  │        │
                  │        ├─→ Attempt 2 (after 1s)
                  │        │
                  │        └─→ Attempt 3 (after 2s)
                  │
                  ├─→ Parse response
                  │
                  └─→ Return result
                           │
                           ├─ Success → Display content
                           │
                           └─ Error → Show error message
```

### Validation Flow

```
User clicks "Validera allt"
         │
         ▼
handleValidation(CHECK_ALL)
         │
         ├─→ Show loading indicator
         │
         └─→ Validation.checkAll()
                  │
                  ├─→ checkGeminiAPI()
                  │        │
                  │        ├─→ Validate format
                  │        ├─→ Test connectivity
                  │        └─→ Return status
                  │
                  ├─→ checkEnvironment()
                  │        │
                  │        ├─→ Check GEMINI_API_KEY
                  │        ├─→ Check optional keys
                  │        └─→ Return status
                  │
                  ├─→ checkBrowser()
                  │        │
                  │        ├─→ Check Fetch API
                  │        ├─→ Check ES6 Modules
                  │        ├─→ Check LocalStorage
                  │        ├─→ Check HTTPS
                  │        └─→ Return status
                  │
                  └─→ Aggregate results
                           │
                           └─→ displayResults()
                                    │
                                    └─→ Show in UI
```

## Module Dependencies

```
scripts.js
    │
    ├─→ utility.js
    │      └─→ No dependencies
    │
    ├─→ validation.js
    │      └─→ utility.js
    │
    └─→ gemini-api-module.js
           ├─→ utility.js
           └─→ validation.js
```

## Security Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Security Layers                          │
│                                                              │
│  Layer 1: Input Validation                                  │
│  ├─ API key format checking (regex)                         │
│  ├─ Input sanitization (XSS prevention)                     │
│  └─ Parameter type validation                               │
│                                                              │
│  Layer 2: Storage Security                                  │
│  ├─ .env for server-side (not committed)                    │
│  ├─ localStorage for browser (dev only)                     │
│  ├─ window.ENV for SSR production                           │
│  └─ Password field masking in UI                            │
│                                                              │
│  Layer 3: Network Security                                  │
│  ├─ HTTPS enforcement (recommended)                         │
│  ├─ CORS considerations                                     │
│  ├─ Timeout protection                                      │
│  └─ Error message sanitization                              │
│                                                              │
│  Layer 4: Code Security                                     │
│  ├─ No hardcoded secrets                                    │
│  ├─ .gitignore protection                                   │
│  ├─ Module encapsulation (IIFE)                             │
│  └─ Read-only config exposure                               │
└─────────────────────────────────────────────────────────────┘
```

## Configuration Management

```
Development:
    .env file → process.env → scripts.js (Node.js)
    OR
    User input → localStorage → utility.js (Browser)

Production:
    Server-side:
        .env → process.env → SSR template → window.ENV
    
    Client-side:
        window.ENV → utility.js → GeminiAPI

Configuration Priority:
    1. window.ENV (highest - SSR production)
    2. localStorage (medium - browser dev)
    3. Default values (lowest - fallback)
```

## Error Handling Strategy

```
┌─────────────────────────────────────────────────────────────┐
│                   Error Handling Flow                        │
│                                                              │
│  API Request                                                 │
│       │                                                      │
│       ├─→ Network Error                                     │
│       │       ├─→ Retry (up to 3 times)                     │
│       │       ├─→ Log error                                 │
│       │       └─→ Return Swedish error message              │
│       │                                                      │
│       ├─→ Timeout                                           │
│       │       ├─→ Abort request                             │
│       │       ├─→ Log timeout                               │
│       │       └─→ Return timeout message                    │
│       │                                                      │
│       ├─→ API Error (4xx/5xx)                               │
│       │       ├─→ Parse error response                      │
│       │       ├─→ Map to Swedish message                    │
│       │       └─→ Display to user                           │
│       │                                                      │
│       └─→ Success                                           │
│               ├─→ Validate response                         │
│               ├─→ Extract content                           │
│               └─→ Return to caller                          │
│                                                              │
│  User Notification                                          │
│       ├─→ Success: Green notification                       │
│       ├─→ Error: Red notification                           │
│       ├─→ Warning: Orange notification                      │
│       └─→ Info: Blue notification                           │
└─────────────────────────────────────────────────────────────┘
```

## Agent Integration Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Agent Integration                         │
│                                                              │
│  Agent 1: Research Agent                                     │
│  ├─ Uses GeminiAPI.generateContent()                        │
│  ├─ Low temperature (0.2) for factual accuracy              │
│  └─ Long prompts for comprehensive research                 │
│                                                              │
│  Agent 2: Analysis Agent                                     │
│  ├─ Uses GeminiAPI.generateContent()                        │
│  ├─ Medium temperature (0.5) for balanced output            │
│  └─ Structured prompts for specific analysis                │
│                                                              │
│  Agent 3: Scheduling Agent                                   │
│  ├─ Uses GeminiAPI.generateContent()                        │
│  ├─ Low temperature (0.3) for consistency                   │
│  └─ Iterative calls for schedule optimization               │
│                                                              │
│  Agent 4: Reporting Agent                                    │
│  ├─ Uses GeminiAPI.generateContent()                        │
│  ├─ Medium temperature (0.5) for readable reports           │
│  └─ Multiple calls for different report sections            │
│                                                              │
│  Shared Configuration:                                       │
│  ├─ Single API key for all agents                           │
│  ├─ Shared validation system                                │
│  ├─ Common error handling                                   │
│  └─ Unified logging                                          │
└─────────────────────────────────────────────────────────────┘
```

## Performance Characteristics

```
Operation                    Time        Notes
─────────────────────────────────────────────────────────────
Module Load                  <500ms      Initial page load
API Initialization           1-2s        Includes connectivity test
API Key Validation          <100ms      Local regex check
Environment Check           <50ms       Local checks only
Browser Compatibility       <50ms       Feature detection
Full Validation             2-3s        Includes network test
Content Generation          2-10s       Depends on prompt
Network Retry               1s, 2s, 4s  Exponential backoff
Timeout                     30s         Configurable
UI Update                   <100ms      DOM manipulation
```

## Scalability Considerations

```
┌─────────────────────────────────────────────────────────────┐
│                  Scalability Design                          │
│                                                              │
│  Client-Side:                                                │
│  ├─ No state stored on server                               │
│  ├─ All processing in browser                               │
│  ├─ Stateless architecture                                  │
│  └─ No session management needed                            │
│                                                              │
│  API Layer:                                                  │
│  ├─ Direct connection to Gemini                             │
│  ├─ No middleware bottleneck                                │
│  ├─ Rate limiting by Google                                 │
│  └─ Scalable to millions of users                           │
│                                                              │
│  Production Enhancement:                                     │
│  ├─ Add backend proxy for key management                    │
│  ├─ Implement request queuing                               │
│  ├─ Add caching layer                                       │
│  └─ Use CDN for static assets                               │
└─────────────────────────────────────────────────────────────┘
```

## Deployment Architecture

```
Development:
    october/
    └─→ Local HTTP Server (Python/Node/PHP)
        └─→ http://localhost:8000

Staging:
    october/
    └─→ Nginx/Apache
        ├─→ SSL Certificate
        └─→ https://staging.dolreal.se

Production:
    october/
    └─→ CDN (CloudFlare/AWS CloudFront)
        ├─→ Static Assets
        └─→ https://dolreal.se
                 │
                 └─→ Backend Proxy (Optional)
                      ├─→ API Key Management
                      ├─→ Rate Limiting
                      ├─→ Usage Analytics
                      └─→ Caching
```

---

**Architecture Version**: 1.0.0  
**Last Updated**: 2025-10-14  
**Documentation Status**: Complete
