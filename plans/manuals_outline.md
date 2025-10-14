# Manuals Outline – DoL 2025 Documentation Set

## 1. Integrated System Guide (EN)
**Audience:** Production engineers configuring router, OBS, YouTube.  
**Length:** ~25 pages with diagrams.  
**Structure:**
1. Executive summary & contact tree  
2. Hardware inventory (router, PCs, capture, monitoring)  
3. Network setup  
   - WAN parameters, QoS scripts, VLAN layout, failover  
4. OBS workstation build  
   - Software install, plugin configuration, scene collection, automation scripts  
5. YouTube event operations  
   - Scheduling, key management, day-specific workflows  
6. InfraNodus & MCP integration  
7. Pre-event rehearsals & checklists  
8. Incident response & escalation  
9. Post-event archival

## 2. Node Operator Quick Start (EN)
**Audience:** On-site stream operators (1 per node).  
**Length:** 8–10 pages laminated booklet.  
**Structure:**
1. Roles & shift schedule  
2. Dashboard overview (language switcher, stream status indicators)  
3. Start-of-day checklist (login, audio tests, captions)  
4. Going live procedure (Day 1 vs Day 2)  
5. Monitoring tasks (every 15 min metrics, log entries)  
6. Handling alerts (audio drop, stream offline, InfraNodus fallback)  
7. Communication protocol with network & content teams  
8. End-of-day wrap-up notes form

## 3. DoL 2025 Webapp Guide (SE)
**Audience:** Public communications & support staff (Swedish).  
**Length:** 12 pages.  
**Structure:**
1. Introduktion & mål för webbappen  
2. Navigering (header, språkval, mörkt läge)  
3. Kunskapsgraf (hur modal fungerar, vad “Visa” betyder)  
4. Live-streams  
   - Kort översikt av varje nod  
   - Förklaring av “Ej aktiv idag” med dag 2-logik  
5. Programschema och hur det uppdateras  
6. Tillgänglighetsegenskaper (tangentbordsnavigation, textning)  
7. Vanliga frågor och felsökning  
8. Supportkontakt och feedbackkanaler  
9. Ordlista (svenska/engelska termer)

## Production Notes
- All manuals stored in `docs/manuals/`.  
- Use Markdown → PDF workflow (mdBook or Pandoc).  
- Include version footer referencing `research_bundle.json` hash and generated date.  
- Translation review: Swedish copy reviewed by communications team; technical sections stay bilingual where needed.
