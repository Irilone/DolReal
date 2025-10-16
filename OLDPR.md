Skip to content
Navigation Menu
Irilone
DolReal

Type / to search

Code
Issues
2
Pull requests
Actions
Projects
Models
Wiki
Security
8
Insights
Settings
 Merged
Revert "Build DoL 2025 streaming hub"
#16
Irilone merged 2 commits into main from revert-12-codex/finish-website-setup-for-conference-streaming2025-10-1522-52-41  2 minutes ago
+303 −1,952 
 Conversation 25
 Commits 2
 Checks 13
 Files changed 15
Conversation
Irilone
Owner
Irilone commented 10 minutes ago • 
User description
Reverts #12

PR Type
Other

Description
Reverts previous PR that built DoL 2025 streaming hub infrastructure

Removes Italian language support from i18n configuration

Deletes comprehensive DoL node data, program schedules, and streaming configuration

Replaces full-featured DoL page with simplified placeholder implementation

Diagram Walkthrough

File Walkthrough
Summary by CodeRabbit
New Features
Redesigned Dol page with a simpler, interactive UI: knowledge-graph modal, main YouTube stream with selectable thumbnails, compact program, dark mode and language toggles.
Refactor
Streamlined layout and accessibility for faster navigation; simplified internal data handling with placeholder content where needed.
Localization
Removed Italian locale and pruned Dol-specific translations across languages; language selector now lists only available locales.
Documentation
Removed the legacy streaming setup guide.
@Irilone
Revert "Build DoL 2025 streaming hub"
cc0e9f6
@github-actionsGitHub Actions
Contributor
github-actions bot commented 9 minutes ago
🤖 Hi @Irilone, I've received your request, and I'm working on it now! You can track my progress in the logs for more details.

@Irilone Irilone assigned Copilot 9 minutes ago
@Irilone Irilone deleted a comment from coderabbitai bot 9 minutes ago
@gemini-code-assistGemini Code Assist
Contributor
gemini-code-assist bot commented 9 minutes ago
Summary of Changes
Hello @Irilone, I'm Gemini Code Assist1! I'm currently reviewing this pull request and will post my feedback shortly. In the meantime, here's a summary to help you and other reviewers quickly get up to speed!

This pull request fully reverts the implementation of the 'Dagar om Lagar 2025 streaming hub.' This rollback includes the removal of all associated code, documentation, and internationalization content, effectively returning the /dol page to a simplified, placeholder state. The changes streamline the codebase by eliminating features and dependencies no longer required for the streaming hub.

Highlights
Reversion of DoL 2025 Streaming Hub: This pull request completely rolls back the implementation of the 'Dagar om Lagar 2025 streaming hub', undoing all associated code and features.
Documentation Removal: The comprehensive setup guide for the streaming hub, including details on YouTube multi-stream, OBS, MCP, and InfraNodus integration, has been removed.
Simplified UI for DoL Page: The src/app/dol/page.tsx component has been reverted to a basic placeholder, removing dynamic content, knowledge graph integration, and detailed program schedules.
Dependency Clean-up: Numerous development dependencies related to TypeScript compilation and other utilities, such as ts-node and various @tsconfig packages, have been removed from package-lock.json.
Internationalization Scope Reduction: Italian (it) locale support and all specific 'DoL' related translation keys have been removed from the i18n configuration and locale files.
Using Gemini Code Assist
Footnotes
Review the Privacy Notices, Generative AI Prohibited Use Policy, Terms of Service, and learn how to configure Gemini Code Assist in GitHub here. Gemini can make mistakes, so double check it and use code with caution. ↩

@codiumai-pr-agent-free codiumai-pr-agent-free bot added the Review effort 2/5 label 9 minutes ago
@codiumai-pr-agent-freeCodiumAI PR-Agent (Free)
codiumai-pr-agent-free bot commented 9 minutes ago
PR Compliance Guide 🔍
Below is a summary of compliance checks for this PR:

Security Compliance
🟢	
No security concerns identified
Ticket Compliance
⚪	
🎫 No ticket provided
Codebase Duplication Compliance
⚪	
Codebase context is not defined
Custom Compliance
⚪	
No custom compliance provided
Compliance status legend
@qodo-merge-proQodo Merge Pro
qodo-merge-pro bot commented 9 minutes ago
PR Compliance Guide 🔍
Below is a summary of compliance checks for this PR:

Security Compliance
⚪	
Third-party iframe risk
Hardcoded external IDs
Client redirect safety
Ticket Compliance
⚪	
🎫 No ticket provided
Codebase Duplication Compliance
⚪	
Codebase context is not defined
Custom Compliance
⚪	
No custom compliance provided
Compliance status legend
github-advanced-security[bot]
github-advanced-security bot found potential problems 9 minutes ago
src/components/features/LanguageSwitcher.tsx
        window.location.href = newPath;
        const newLocale = e.target.value as Locale
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
        window.location.href = newPath
 Check warning
Code scanning
/ CodeQL

DOM text reinterpreted as HTML
Medium

 is reinterpreted as HTML without escaping meta-characters.
Show more details
Copilot Autofix
AI 9 minutes ago

The best way to fix this problem is to validate that the new locale selected (e.target.value) is one of the known and accepted locale codes before using it to replace part of the pathname and navigate. Specifically, if the value is not in languages, do not proceed with the navigation. This prevents any DOM manipulation or external injection from resulting in an unsafe redirect or path modification. You can achieve this by checking that newLocale is a key of the languages object, and falling back to the current locale (or aborting the change) if it is not.

File to change: src/components/features/LanguageSwitcher.tsx
Change needed: Update the onChange callback to validate e.target.value (now newLocale) against known locales before using it.
Required extra code: None, as all necessary context is present in the current function.
Suggested changeset 1

src/components/features/LanguageSwitcher.tsx
@@ -20,8 +20,10 @@
      value={currentLocale}
      onChange={(e) => {
        const newLocale = e.target.value as Locale
        const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
        window.location.href = newPath
        if (Object.prototype.hasOwnProperty.call(languages, newLocale)) {
          const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)
          window.location.href = newPath
        }
      }}
      className="px-3 py-2 rounded-md border bg-background"
      aria-label="Välj språk"
Copilot is powered by AI and may make mistakes. Always verify output.
@Irilone	Reply...
@qodo-merge-proQodo Merge Pro
qodo-merge-pro bot commented 8 minutes ago • 
PR Code Suggestions ✨
Latest suggestions up to d08bd11

Category	Suggestion                                                                                                                                   	Impact
Security	
Secure iframe implementation
Medium
Possible issue	
Add keyboard accessibility
Medium
 More
Previous suggestions
Suggestions up to commit cc0e9f6
@codiumai-pr-agent-freeCodiumAI PR-Agent (Free)
codiumai-pr-agent-free bot commented 8 minutes ago • 
PR Code Suggestions ✨
Explore these optional code suggestions:

Category	Suggestion                                                                                                                                   	Impact
General	
Improve modal dialog accessibility and behavior
Medium
Possible issue	
Prevent keyboard focus trapping in iframes
Medium
Handle potential out-of-bounds array access
Low
[Generating...]

gemini-code-assist[bot]
gemini-code-assist bot reviewed 8 minutes ago
Contributor
gemini-code-assist bot left a comment
Code Review
This pull request reverts the "Build DoL 2025 streaming hub" feature, removing a significant amount of code, configuration, and documentation. My review focuses on the new placeholder implementation for the DoL page and some code quality and maintainability issues that have emerged from the revert. I've identified a high-severity performance issue related to the use of iframes for thumbnails, suggested accessibility improvements for the new modal dialog, and recommended cleanup for leftover code. Additionally, I've pointed out opportunities to enhance maintainability by restoring documentation and improving code formatting for better readability.

src/app/dol/page.tsx
Comment on lines +161 to +166
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Stream ${i + 1}`}
                  allowFullScreen
                />
Contributor
@gemini-code-assist gemini-code-assist bot 8 minutes ago
high

The current implementation uses an <iframe> for each stream thumbnail in the selection grid. This is highly inefficient as it loads the entire YouTube player for each stream, causing significant performance degradation. A better approach is to use <img> tags with YouTube's auto-generated thumbnail URLs, as was done in the previous implementation.

Additionally, wrapping an <iframe> in a <button> is not semantically correct and can cause issues with accessibility for screen reader users.

Suggested change
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Stream ${i + 1}`}
                  allowFullScreen
                />
                <img
                  className="w-full h-full object-cover"
                  src={`https://img.youtube.com/vi/${id}/hqdefault.jpg`}
                  alt={`Thumbnail for Stream ${i + 1}`}
                />
@Irilone	Reply...
src/app/dol/page.tsx
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [graphEmbed, setGraphEmbed] = useState<string>("");

  const streams = ["dQw4w9WgXcQ", "kJQP7kiw5Fk", "5NV6Rdv1a3I", "3JZ_D3ELwOQ"];
Contributor
@gemini-code-assist gemini-code-assist bot 8 minutes ago
medium

The streams array contains a YouTube video ID for a "rickroll" as a placeholder. While this might be intended for internal testing, it's unprofessional and could be accidentally deployed to production. It's better to use neutral, relevant placeholder content.

Suggested change
  const streams = ["dQw4w9WgXcQ", "kJQP7kiw5Fk", "5NV6Rdv1a3I", "3JZ_D3ELwOQ"];
  const streams = ["your_placeholder_id_1", "your_placeholder_id_2", "your_placeholder_id_3", "your_placeholder_id_4"];
@Irilone	Reply...
src/app/dol/page.tsx
Comment on lines +101 to +107
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full relative">
            <h3 className="text-xl font-semibold mb-2">{activeNode}</h3>
Contributor
@gemini-code-assist gemini-code-assist bot 8 minutes ago
medium

The modal dialog has some accessibility issues:

Missing aria-labelledby: The dialog should be associated with its title for screen readers. Add an id to the h3 and reference it with aria-labelledby on the dialog container.
Focus Management: When a modal opens, focus should be moved to an element inside it (e.g., the "Close" button). When it closes, focus should return to the element that triggered it. Currently, there is no focus management logic. This is crucial for keyboard and screen reader users. Consider using a library or a custom hook to handle this.
Suggested change
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full relative">
            <h3 className="text-xl font-semibold mb-2">{activeNode}</h3>
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
          aria-labelledby="graph-modal-title"
        >
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full relative">
            <h3 id="graph-modal-title" className="text-xl font-semibold mb-2">{activeNode}</h3>
@Irilone	Reply...
src/components/features/LanguageSwitcher.tsx
  currentLocale: Locale;
}) {
  const pathname = usePathname();
export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
Contributor
@gemini-code-assist gemini-code-assist bot 8 minutes ago
medium

The JSDoc comment block explaining the purpose, parameters, and return value of the LanguageSwitcher component has been removed. This reduces code clarity and maintainability for future developers. Please consider re-adding the documentation.

/**
 * Renders a language selector that updates the URL to switch locales.
 *
 * @param currentLocale - The currently active locale code used to set the selected option
 * @returns The select element that navigates to the chosen locale by updating the pathname
 */
export default function LanguageSwitcher({ currentLocale }: { currentLocale: Locale }) {
@Irilone	Reply...
src/types/i18n.ts
Comment on lines 13 to 20
export const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  se: {
    code: "se",
    name: "Swedish",
    nativeName: "Svenska",
    direction: "ltr",
    flag: "🇸🇪",
  },
  en: {
    code: "en",
    name: "English",
    nativeName: "English",
    direction: "ltr",
    flag: "🇬🇧",
  },
  ar: {
    code: "ar",
    name: "Arabic",
    nativeName: "العربية",
    direction: "rtl",
    flag: "🇸🇦",
  },
  fa: {
    code: "fa",
    name: "Farsi",
    nativeName: "فارسی",
    direction: "rtl",
    flag: "🇮🇷",
  },
  zh: {
    code: "zh",
    name: "Chinese",
    nativeName: "中文",
    direction: "ltr",
    flag: "🇨🇳",
  },
  es: {
    code: "es",
    name: "Spanish",
    nativeName: "Español",
    direction: "ltr",
    flag: "🇪🇸",
  },
  it: {
    code: "it",
    name: "Italian",
    nativeName: "Italiano",
    direction: "ltr",
    flag: "🇮🇹",
  },
  se: { code: 'se', name: 'Swedish', nativeName: 'Svenska', direction: 'ltr', flag: '🇸🇪' },
  en: { code: 'en', name: 'English', nativeName: 'English', direction: 'ltr', flag: '🇬🇧' },
  ar: { code: 'ar', name: 'Arabic', nativeName: 'العربية', direction: 'rtl', flag: '🇸🇦' },
  fa: { code: 'fa', name: 'Farsi', nativeName: 'فارسی', direction: 'rtl', flag: '🇮🇷' },
  zh: { code: 'zh', name: 'Chinese', nativeName: '中文', direction: 'ltr', flag: '🇨🇳' },
  es: { code: 'es', name: 'Spanish', nativeName: 'Español', direction: 'ltr', flag: '🇪🇸' },
};
Contributor
@gemini-code-assist gemini-code-assist bot 8 minutes ago
medium

The LOCALE_CONFIGS object has been reformatted into single lines per locale. While functionally correct, this format is less readable and harder to maintain than the previous multi-line format, especially if more properties are added to LocaleConfig in the future. For better long-term maintainability, please consider reverting to the more readable multi-line format.

export const LOCALE_CONFIGS: Record<Locale, LocaleConfig> = {
  se: {
    code: 'se',
    name: 'Swedish',
    nativeName: 'Svenska',
    direction: 'ltr',
    flag: '🇸🇪',
  },
  en: {
    code: 'en',
    name: 'English',
    nativeName: 'English',
    direction: 'ltr',
    flag: '🇬🇧',
  },
  ar: {
    code: 'ar',
    name: 'Arabic',
    nativeName: 'العربية',
    direction: 'rtl',
    flag: '🇸🇦',
  },
  fa: {
    code: 'fa',
    name: 'Farsi',
    nativeName: 'فارسی',
    direction: 'rtl',
    flag: '🇮🇷',
  },
  zh: {
    code: 'zh',
    name: 'Chinese',
    nativeName: '中文',
    direction: 'ltr',
    flag: '🇨🇳',
  },
  es: {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    direction: 'ltr',
    flag: '🇪🇸',
  },
};
@Irilone	Reply...
@codiumai-pr-agent-free codiumai-pr-agent-free bot deleted a comment from qodo-merge-pro bot 8 minutes ago
chatgpt-codex-connector[bot]
chatgpt-codex-connector bot reviewed 7 minutes ago
chatgpt-codex-connector bot left a comment
💡 Codex Review
Here are some automated review suggestions for this pull request.

ℹ️ About Codex in GitHub
src/lib/dol/data.ts
Outdated
Comment on lines 1 to 2
import { EventDay } from '@/types/index';
import { StreamNode } from '@/types/stream';
@chatgpt-codex-connector chatgpt-codex-connector bot 7 minutes ago
P1 Badge Remove broken EventDay import from DoL data stub

The new stub at src/lib/dol/data.ts still imports EventDay from @/types/index, but that barrel now only exposes Locale, StreamNode, Stream, and StreamHealth. With the named export removed, TypeScript will fail to compile with “Module has no exported member 'EventDay'” even though the module is otherwise a placeholder. Either re‑export EventDay in the types index or drop the unused import so builds succeed.

Useful? React with 👍 / 👎.

@Irilone	Reply...
Irilone
Irilone commented 7 minutes ago
Owner
Author
Irilone left a comment
¨
@copilot implement

@Irilone
Owner
Author
Irilone commented 6 minutes ago
@codex fix this CI failure @claude

@claudeClaude
claude bot commented 6 minutes ago • 
Claude finished @Irilone's task —— View job

CI Failure Analysis & Fix
I've identified the root cause of the CI failure and fixed part of it. Here's the complete analysis:

Issues Found:
✅ FIXED - Broken TypeScript Import (src/lib/dol/data.ts:1)

Problem: Importing EventDay type that doesn't exist in @/types/index
Solution: Simplified the file to a proper placeholder stub
Status: Committed and pushed (commit d08bd11)
⚠️ REQUIRES MANUAL ACTION - Out of Sync package-lock.json

Problem: package.json includes these devDependencies:
@vitejs/plugin-react: ^5.0.4
vite: ^7.1.10
vite-tsconfig-paths: ^5.1.4
cssnano: ^7.1.1
But package-lock.json is completely missing all these packages and their transitive dependencies (100+ packages)
CI Error: npm ci fails with "Missing: @vitejs/plugin-react@5.0.4 from lock file" (and 100+ more)
Root Cause: This existed before this PR (verified at commit f710f40)
What You Need To Do:
The package-lock.json must be regenerated. Run this locally:

npm install --package-lock-only
git add package-lock.json
git commit -m "fix: regenerate package-lock.json to sync with package.json"
git push
This will add ~100+ missing package entries without installing anything.

Alternative: Remove Unused Vite Dependencies
If Vite isn't being used (Next.js is the primary framework based on CLAUDE.md), you could remove these lines from package.json devDependencies:

"@vitejs/plugin-react": "^5.0.4",
"vite": "^7.1.10",
"vite-tsconfig-paths": "^5.1.4",
"cssnano": "^7.1.1",
And also remove these scripts:

"dev:vite": "vite",
"build:vite": "vite build",
"preview:vite": "vite preview",
Then run npm install --package-lock-only.

Summary:
TypeScript error: ✅ Fixed and pushed
package-lock.json sync: ⏳ Awaiting your action (npm commands require approval in this environment)
Once you regenerate the lock file, the CI should pass.

--- | Branch: revert-12-codex/finish-website-setup-for-conference-streaming2025-10-1522-52-41

@coderabbitaicoderabbitai
Contributor
coderabbitai bot commented 5 minutes ago • 
Caution

Review failed
The pull request is closed.

Note

Other AI code review bot(s) detected
CodeRabbit has detected other AI code review bot(s) in this pull request and will avoid duplicating their findings in the review comments. This may lead to a less comprehensive review.

Walkthrough
Removed the streaming setup guide and the DoL data and translations. Rewrote the DoL page to a lean, dynamic UI with an embed modal, removed Italian locale and DoL translation blocks, updated language switcher and i18n types.

Changes
Cohort / File(s)	Summary
Docs removal
docs/manuals/streaming-setup-guide.md	Deleted the streaming setup guide documentation file.
DoL page rewrite
src/app/dol/page.tsx	Replaced the previous complex page with a simplified interactive UI; renamed default export to DagarOmLagar2025; added export const dynamic = "force-dynamic"; implemented lightweight state, graph embed modal, simple streams/program.
Language switcher update
src/components/features/LanguageSwitcher.tsx	Removed Italian from languages mapping; now renders options by iterating Object.entries(languages); minor formatting and render changes; onChange navigation logic retained.
i18n config pruning
src/i18n/config.ts	Removed Italian locale import and it entry from resources.
Locale files — remove DoL blocks
src/i18n/locales/ar.json, src/i18n/locales/en.json, src/i18n/locales/es.json, src/i18n/locales/fa.json, src/i18n/locales/se.json, src/i18n/locales/zh.json	Deleted top-level dol translation objects and all nested keys.
Locale file deletion
src/i18n/locales/it.json	Removed entire Italian locale file.
DoL data module removal
src/lib/dol/data.ts	Removed exported DoL types, constants, node/graph data, helpers, and related env scaffolding; replaced with minimal placeholder exports (dolNodes = [], dolStreams = []).
i18n types tightening
src/types/i18n.ts	Removed 'it' from Locale type; switched to single-quoted literals; retained Record<Locale, LocaleConfig> shape.
Shared types formatting and locale set
src/types/index.ts	Removed 'it' from Locale and switched literal quotes; Stream and StreamHealth punctuation stylistically adjusted without type changes.
Sequence Diagram(s)

Estimated code review effort
🎯 4 (Complex) | ⏱️ ~45 minutes

Possibly related PRs
Revert "Build DoL 2025 streaming hub" #16 — Revert that restores removed docs/locales/DoL data; directly touches the same files.
Build DoL 2025 streaming hub #12 — Related conflicting changes around DoL data, locales, and page structure; overlaps core edits.
Poem
A whisk of code, a hop through night,
We trimmed the trails for cleaner sight.
Guides and tongues we gently shed,
New nodes now whisper in lighter thread.
A bun, a hop — the stream ahead. 🐇✨

\n\n## Pre-merge checks and finishing touches\n
❌ Failed checks (1 warning)
\n
✅ Passed checks (2 passed)
\n\n
📜 Recent review details
Thanks for using CodeRabbit! It's free for OSS, and your support helps us grow. If you like it, consider giving us a shout-out.

❤️ Share
Comment @coderabbitai help to get the list of available commands and usage tips.

coderabbitai[bot]
coderabbitai bot reviewed 5 minutes ago
Contributor
coderabbitai bot left a comment
Actionable comments posted: 3

📜 Review details
src/app/dol/page.tsx
Comment on lines +29 to +30
  const toggleLanguage = () =>
    i18n.changeLanguage(i18n.language === "se" ? "en" : "se");
Contributor
@coderabbitai coderabbitai bot 5 minutes ago
⚠️ Potential issue | 🟠 Major

Restore full locale support in toggle

The new toggle only flips between se and en, leaving ar/fa/zh/es inaccessible, so those locales can no longer be selected from this page. Please source the available locales (e.g. from LOCALE_CONFIGS) and iterate over all six options again. As per coding guidelines

@Irilone	Reply...
src/app/dol/page.tsx
Comment on lines +43 to 205
        <h1 className="text-2xl font-bold tracking-wide">
          {t("title", { defaultValue: "Dagar om Lagar 2025" })}
        </h1>
        <nav className="flex gap-4" aria-label="Main Navigation">
          <a href="#streams" className="hover:underline focus:underline">
            Streams
          </a>
          <a href="#program" className="hover:underline focus:underline">
            Program
          </a>
          <a href="#kontakt" className="hover:underline focus:underline">
            Kontakt
          </a>
        </nav>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={toggleLanguage}>
            {i18n.language?.toUpperCase() || "SE"}
          </Button>
          <Button variant="secondary" size="sm" onClick={toggleDarkMode}>
            {darkMode ? "☀️" : "🌙"}
          </Button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-6 pb-16">
        <section className="py-12">
          <div className="glass-strong rounded-3xl border border-white/10 p-8 md:p-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div className="space-y-4 md:max-w-2xl">
                <span className="inline-flex rounded-full bg-white/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-white/80">
                  {t(
                    "dol.hero.tagline",
                    "Digital konferensplattform • 6–7 november 2025",
                  )}
                </span>
                <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                  {t(
                    "dol.hero.title",
                    "Fyra noder – ett sammanhållet rättssystem",
                  )}
                </h2>
                <p className="text-base text-white/70 md:text-lg">
                  {t(
                    "dol.hero.description",
                    "Växla mellan noderna Nodväst, Nodsyd, Nodöst och Nodmidd. Utforska programmet för varje dag och lås upp djupare insikter via kunskapsgrafen.",
                  )}
                </p>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setActiveNode("nodvast");
                      setActiveDay(1);
                    }}
                    className="rounded-full bg-gradient-to-r from-primary/70 to-secondary/70 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/30 transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {t("dol.hero.primaryCta", "Starta huvudströmmen")}
                  </button>
                  <a
                    href="#program"
                    className="rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white/80 transition hover:scale-105 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                  >
                    {t("dol.hero.secondaryCta", "Utforska programmet")}
                  </a>
                </div>
              </div>
              <div className="grid gap-4 text-sm text-white/70 md:w-80">
                <div className="glass rounded-2xl border border-white/10 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
                    {t("dol.streams.meta.location", "Plats")}
                  </h3>
                  <p className="text-base text-white">
                    {activeNodeData.location}
                  </p>
                </div>
                <div className="glass rounded-2xl border border-white/10 p-4">
                  <h3 className="text-sm font-semibold uppercase tracking-wide text-white/70">
                    {t("dol.streams.meta.theme", "Tema")}
                  </h3>
                  <p className="text-base text-white">{activeNodeData.theme}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="graph" className="py-8">
          <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">
                {t("dol.graph.title", "Kunskapsgraf – navigera noderna")}
              </h2>
              <p className="text-white/70">
                {t(
                  "dol.graph.subtitle",
                  "Klicka på en nod för att öppna motsvarande ström och program.",
                )}
              </p>
            </div>
            <div
              className="flex flex-wrap gap-3"
      <section
        id="graph"
        className="py-12 px-4 text-center"
        aria-labelledby="graph-title"
      >
        <h2 id="graph-title" className="text-xl font-semibold mb-4">
          Knowledge Graph Navigator
        </h2>
        <div className="mx-auto max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4">
          {nodes.map((node) => (
            <Card
              key={node.name}
              className="bg-white/5 backdrop-blur-sm border border-white/10"
              role="group"
              aria-label={t("dol.days.label", "Välj konferensdag")}
              aria-label={`Node ${node.name}`}
            >
              {DAY_OPTIONS.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setActiveDay(option.id)}
                  className={cn(
                    "rounded-full border px-5 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                    activeDay === option.id
                      ? "border-primary/80 bg-primary/20 text-white shadow-lg shadow-primary/20"
                      : "border-white/30 text-white/70 hover:scale-105 hover:text-white",
                  )}
                  aria-pressed={activeDay === option.id}
                >
                  {t(option.labelKey)}
                </button>
              ))}
              <CardContent className="p-4">
                <h3 className="font-bold text-lg">{node.name}</h3>
                <div className="flex justify-center gap-2 mt-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => openNode(node.name, node.graphId)}
                  >
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {activeNode && (
        <div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white text-black p-6 rounded-lg max-w-2xl w-full relative">
            <h3 className="text-xl font-semibold mb-2">{activeNode}</h3>
            <iframe
              src={graphEmbed}
              title="InfraNodus Graph"
              className="w-full h-80 border border-gray-200 rounded-md mb-4"
              aria-label="InfraNodus knowledge graph embed"
            />
            <div className="flex gap-3 justify-end">
              <Button
                onClick={() =>
                  setActiveStream(
                    nodes.findIndex((n) => n.name === activeNode) || 0,
                  )
                }
              >
                Open Stream
              </Button>
              <Button variant="outline" onClick={() => setActiveNode(null)}>
                Close
              </Button>
            </div>
          </div>
          <GraphNavigation
            nodes={graphNodes}
            links={GRAPH_LINKS}
            className="max-h-[600px] min-h-[420px]"
            onNodeClick={(node) => {
              if (
                node.id === "nodvast" ||
                node.id === "nodsyd" ||
                node.id === "nodost" ||
                node.id === "nodmidd"
              ) {
                setActiveNode(node.id as DolNodeKey);
              }
            }}
          />
        </section>

        <section id="streams" className="py-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("dol.streams.title", "Liveströmmar")}
            </h2>
            <p className="text-white/70">
              {t(
                "dol.streams.subtitle",
                "Karusellen nedan låter dig byta nod. Endast en ström spelas åt gången.",
              )}
            </p>
          </div>

          <Card className="glass-strong rounded-3xl border border-white/10">
            <CardContent className="space-y-8 p-6 md:p-10">
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-2xl">
                {activeStream?.active ? (
                  <iframe
                    key={`${activeNode}-${activeDay}`}
                    className="aspect-video w-full"
                    src={`https://www.youtube.com/embed/${activeStream.youtubeId}?rel=0`}
                    title={`${activeNodeData.name} livestream`}
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="flex aspect-video w-full flex-col items-center justify-center gap-4 bg-black/40 px-8 text-center text-white/80">
                    <p className="text-lg font-semibold">
                      {t(
                        "dol.streams.inactiveDay",
                        "Denna nod sänder inte live dag {{day}}.",
                        { day: activeDay },
                      )}
                    </p>
                    <p className="text-sm text-white/60">
                      {activeStream?.message}
                    </p>
                    <button
                      onClick={() => setActiveNode("nodvast")}
                      className="rounded-full bg-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60"
                    >
                      {t(
                        "dol.streams.switchToMain",
                        "Byt till huvudströmmens Nodväst",
                      )}
                    </button>
                  </div>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {nodeOrder.map((nodeKey) => {
                  const node = DOL_NODES[nodeKey];
                  const stream = node.streams[activeDay];
                  const isActive = nodeKey === activeNode;
                  return (
                    <button
                      key={node.key}
                      onClick={() => setActiveNode(node.key)}
                      className={cn(
                        "group relative overflow-hidden rounded-2xl border border-white/10 text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
                        isActive
                          ? "border-primary/70 shadow-lg shadow-primary/30"
                          : "hover:-translate-y-1 hover:border-primary/40",
                      )}
                      aria-pressed={isActive}
                    >
                      <div className="relative aspect-video w-full overflow-hidden">
                        {stream?.youtubeId ? (
                          <Image
                            src={buildThumbnailUrl(stream.youtubeId)}
                            alt={t(
                              "dol.streams.thumbnailLabel",
                              "{{node}} – växla ström",
                              { node: node.name },
                            )}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                            className={cn(
                              "object-cover transition",
                              isActive
                                ? "opacity-100"
                                : "opacity-90 group-hover:opacity-100",
                            )}
                            loading="lazy"
                          />
                        ) : (
                          <div className="flex aspect-video items-center justify-center bg-black/40 text-center text-xs font-semibold uppercase tracking-wide text-white/70">
                            {t(
                              "dol.streams.noThumbnail",
                              "Ingen miniatyr tillgänglig",
                            )}
                          </div>
                        )}
                        {!stream?.active && (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-center text-xs font-semibold uppercase tracking-wide text-white">
                            {t(
                              "dol.streams.inactiveDay",
                              "Denna nod sänder inte live dag {{day}}.",
                              { day: activeDay },
                            )}
                          </div>
                        )}
                        {isActive && (
                          <div
                            className="absolute inset-0 border-4 border-primary/70 mix-blend-screen"
                            aria-hidden="true"
                          />
                        )}
                      </div>
                      <div className="space-y-1 bg-black/40 px-4 py-4">
                        <p className="text-sm font-semibold uppercase tracking-wide text-white/70">
                          {t(`streams.${node.key}`, node.name)}
                        </p>
                        <p className="text-lg font-semibold text-white">
                          {node.name}
                        </p>
                        <p className="text-xs text-white/60">{node.location}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="program" className="py-12">
          <div className="mb-6">
            <h2 className="text-3xl font-bold tracking-tight">
              {t("dol.program.title", "Program för {{node}}", {
                node: t(`streams.${activeNode}`, activeNodeData.name),
              })}
            </h2>
            <p className="text-white/70">{activeNodeData.description}</p>
        </div>
      )}

      <section
        id="streams"
        className="py-12 bg-black/40"
        aria-labelledby="streams-title"
      >
        <h2
          id="streams-title"
          className="text-center text-xl font-semibold mb-6"
        >
          Live Streams
        </h2>
        <div className="max-w-5xl mx-auto">
          <div className="aspect-video mb-6 border border-white/10 rounded-xl overflow-hidden">
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${streams[activeStream]}`}
              title={`Active Stream ${activeStream + 1}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="space-y-4">
            {programItems.length === 0 ? (
              <p className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 text-center text-white/70">
                {t(
                  "dol.program.empty",
                  "Ingen session planerad för denna dag.",
                )}{" "}
                {activeStream?.message}
              </p>
            ) : (
              programItems.map((item, index) => (
                <article
                  key={`${item.time}-${item.title}-${index}`}
                  className="glass rounded-2xl border border-white/10 p-6 transition hover:border-primary/40 hover:bg-white/10"
                >
                  <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                    <div className="space-y-3">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                        <span className="font-mono">{item.time}</span>
                        <span
                          className="h-2 w-2 rounded-full bg-primary/70"
                          aria-hidden="true"
                        />
                        <span>
                          {t(`dol.program.format.${item.format}`, item.format)}
                        </span>
                      </span>
                      <h3 className="text-2xl font-semibold">{item.title}</h3>
                      <p className="max-w-3xl text-white/70">
                        {item.description}
                      </p>
                    </div>
                    <div className="space-y-3 text-sm text-white/70 md:text-right">
                      {item.speakers.length > 0 && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/50">
                            {t("dol.program.speakers", "Medverkande")}
                          </h4>
                          <ul className="mt-1 space-y-1 text-sm text-white/80">
                            {item.speakers.map((speaker) => (
                              <li key={speaker}>{speaker}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {item.focus && (
                        <div>
                          <h4 className="text-xs font-semibold uppercase tracking-wide text-white/50">
                            {t("dol.program.focus", "Fokus")}
                          </h4>
                          <p className="text-sm text-white/80">{item.focus}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </article>
              ))
            )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {streams.map((id, i) => (
              <button
                key={i}
                onClick={() => setActiveStream(i)}
                className={`aspect-video border border-white/20 rounded-lg overflow-hidden ${activeStream === i ? "ring-2 ring-blue-400" : ""}`}
                aria-label={`Switch to stream ${i + 1}`}
              >
                <iframe
                  className="w-full h-full"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`Stream ${i + 1}`}
                  allowFullScreen
                />
              </button>
            ))}
          </div>
        </section>
      </main>

      <footer className="glass-strong border-t border-white/10 py-10 text-center text-sm text-white/60">
        <p>
          {t(
            "dol.footer.info",
            "Officiell digital plattform för Dagar om Lagar 2025.",
          )}
        </p>
        <p className="mt-2">
          {t(
            "dol.footer.rights",
            "© 2025 Dagar om Lagar. Alla rättigheter förbehållna.",
          )}
        </div>
      </section>

      <section
        id="program"
        className="py-12 px-4"
        aria-labelledby="program-title"
      >
        <h2
          id="program-title"
          className="text-center text-xl font-semibold mb-6"
        >
          Program Schedule
        </h2>
        <div className="max-w-4xl mx-auto space-y-4">
          {[1, 2, 3].map((s) => (
            <Card key={s} className="bg-white/5 border border-white/10">
              <CardContent className="p-4">
                <h3 className="font-bold">Session {s}</h3>
                <p className="text-sm opacity-80">
                  Speaker {s} – Topic details pending.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer
        id="kontakt"
        className="py-8 text-center border-t border-white/10"
        aria-label="Footer"
      >
        <p className="opacity-70">
          © 2025 Dagar om Lagar – All Rights Reserved.
        </p>
Contributor
@coderabbitai coderabbitai bot 5 minutes ago
⚠️ Potential issue | 🟠 Major

Re-introduce Swedish i18n strings

Headings and button labels such as “Streams”, “Knowledge Graph Navigator”, “View”, “Live Streams”, “Program Schedule”, and “Contact: …” are now hard-coded English strings. Requirements call for all user-facing copy to be provided in Swedish via i18next, so these need to be moved back into the translation files with Swedish defaults. As per coding guidelines

🤖 Prompt for AI Agents
@Irilone	Reply...
src/app/dol/page.tsx
Comment on lines +116 to +119
                onClick={() =>
                  setActiveStream(
                    nodes.findIndex((n) => n.name === activeNode) || 0,
                  )
Contributor
@coderabbitai coderabbitai bot 5 minutes ago
⚠️ Potential issue | 🔴 Critical

Fix fallback index when opening stream

nodes.findIndex returns -1 when it can’t match the active node. Because -1 || 0 evaluates to -1, the modal can set activeStream to -1, producing an invalid embed URL. Guard the result explicitly before calling setActiveStream.

-                onClick={() =>
-                  setActiveStream(
-                    nodes.findIndex((n) => n.name === activeNode) || 0,
-                  )
-                }
+                onClick={() => {
+                  const idx = nodes.findIndex((n) => n.name === activeNode)
+                  setActiveStream(idx >= 0 ? idx : 0)
+                }}
📝 Committable suggestion
🤖 Prompt for AI Agents
@Irilone	Reply...
@claudeClaude
claude bot commented 5 minutes ago
Pull Request Review: Revert Build DoL 2025 streaming hub
Overview
This PR reverts PR #12, which built the DoL 2025 streaming hub infrastructure. The revert removes 1,944 lines and adds 301 lines.

Critical Issues Found
1. BLOCKER: Import Statement After Export
Location: src/app/dol/page.tsx:8

The export const dynamic statement appears BEFORE the imports. This will cause a syntax error and the page will fail to compile.

Fix: Move all imports to the top of the file before any exports.

2. MAJOR: Hardcoded YouTube Video IDs
Location: src/app/dol/page.tsx:20

The streams array contains placeholder YouTube video IDs (including a Rick Roll as the first video). These should come from environment variables as defined in CLAUDE.md.

Impact: The page will show incorrect videos instead of the actual DoL streams.

3. MAJOR: Hardcoded Graph IDs
Location: src/app/dol/page.tsx:22-27

Using placeholder graph IDs (graph1, graph2, etc.) that won't work with the actual InfraNodus integration.

4. CRITICAL: YouTube Autoplay Policy Violation
Location: src/app/dol/page.tsx:161-167

The thumbnail section embeds multiple YouTube iframes, which can trigger autoplay. Per CLAUDE.md: No autoplay - User gesture required (WCAG + policy compliance)

Impact: Violates both WCAG 2.2 AA requirements and YouTube ToS.

Fix: Use thumbnail images instead: https://img.youtube.com/vi/{id}/hqdefault.jpg

5. CRITICAL: Missing Accessibility Features (WCAG 2.2 AA)
No keyboard navigation for stream selection
Missing focus indicators
No skip links for screen readers
Modal doesn't trap focus or handle Escape key
No ARIA live regions for dynamic content updates
Impact: Fails WCAG 2.2 AA compliance, which is MANDATORY per CLAUDE.md.

6. MAJOR: Incomplete i18n Integration
Only toggles between Swedish and English, ignoring the other 4 supported languages. Navigation text is hardcoded instead of using translation keys.

7. MAJOR: Missing Day 2 Logic
The original implementation had special logic for Day 2 (Nov 7, 2025) where only Nodväst remains active. This critical business logic is completely absent.

Per CLAUDE.md: Day 2 behavior - Only Nodväst active, others disabled (UI unchanged)

8. MODERATE: Performance Issues
Loading 5 YouTube iframes simultaneously (1 main + 4 thumbnails)
No lazy loading or image optimization
Violates the LCP <2.5s target per CLAUDE.md
9. MODERATE: Broken Data Structure
Location: src/lib/dol/data.ts

Typos in variable names (NODS_YD_ID vs NODSYD_YOUTUBE_ID)
Missing NODVAST and NODOST IDs
No exports, making this file useless
Code Quality Issues
Inconsistent styling (template literals instead of cn() utility)
Dark mode not integrated with ThemeProvider
Emoji buttons without aria-labels
Incorrect file comment (says DoL.tsx but file is page.tsx)
Missing type safety (not using DolNodeKey, EventDay types)
Placeholder program data instead of real schedule
Positive Aspects
Cleaner i18n structure (removing Italian if not needed is fine)
Simplified LanguageSwitcher.tsx
Reduced overall complexity
More concise type definitions
Recommendations
Before Merge (REQUIRED):
Fix syntax error (imports before exports)
Replace hardcoded YouTube IDs with environment variables
Fix YouTube autoplay policy violation (use thumbnails)
Add proper ARIA labels and keyboard navigation
Implement modal accessibility (focus trap, Escape key)
Post-Merge:
Restore Day 2 business logic
Integrate actual program data
Connect real InfraNodus graph IDs
Add test coverage
Implement proper theme provider integration
Testing Checklist
 Page compiles without syntax errors
 All 6 languages work correctly
 Keyboard navigation works
 Screen reader announces content properly
 Videos don't autoplay
 Modal closes with Escape key
 Color contrast meets WCAG 2.2 AA
 Performance: LCP < 2.5s, CLS < 0.1
Overall Assessment
Status: NEEDS WORK - Cannot merge in current state

While this revert simplifies the codebase, it introduces critical bugs (syntax error), policy violations (YouTube autoplay), and removes essential functionality (Day 2 logic, real data).

Recommendation: Fix all critical issues before merging, OR reconsider whether a full revert is the right approach.

Review generated per CLAUDE.md guidelines: TypeScript strict mode, WCAG 2.2 AA compliance, Next.js 15 best practices.

@chatgpt-codex-connectorChatGPT Codex Connector
chatgpt-codex-connector bot commented 3 minutes ago
Summary

Removed the broken EventDay import from the DoL data stub so the module no longer references a non-exported type and can compile without that error. src/lib/dol/data.tsL1-L8
Testing

❌ npm run typecheck (fails because of existing Button prop typings, i18n initialization typing, and Vite module resolution issues unrelated to the removed import)
View task →

@github-actions
@Irilone
fix: remove broken EventDay import from DoL data stub 
d08bd11
@Irilone Irilone merged commit d08bd11 into main 2 minutes ago
3 of 8 checks passed
@Irilone Irilone 
deleted the revert-12-codex/finish-website-setup-for-conference-streaming2025-10-1522-52-41 branch 2 minutes ago
@codiumai-pr-agent-freeCodiumAI PR-Agent (Free)
codiumai-pr-agent-free bot commented now
Persistent suggestions updated to latest commit d08bd11

Merge info
Pull request successfully merged and closed
You're all set — the branch has been merged.

@Irilone


Add a comment
Comment
Qodo Merge Tools
Qodo Merge Tools
 
Add your comment here...
 
Remember, contributions to this repository should follow our GitHub Community Guidelines.
 ProTip! Add comments to specific lines under Files changed.
Reviewers
@coderabbitai
coderabbitai[bot]
@chatgpt-codex-connector
chatgpt-codex-connector[bot]
+1 more reviewer
@gemini-code-assist
gemini-code-assist[bot]

Assignees
Copilot code review
Copilot
Labels
Review effort 2/5
Qodo Merge filters
Show All
Projects
None yet
Milestone
No milestone
Development
Successfully merging this pull request may close these issues.

None yet

Loading
2 participants
@Irilone
@Copilot
Footer
© 2025 GitHub, Inc.
Footer navigation
Terms
Privacy
Security
Status
Community
Docs
Contact
Manage cookies
Do not share my personal information
codiumai-pr-agent-free bot commented Persistent suggestions updated to latest commit d08bd11
