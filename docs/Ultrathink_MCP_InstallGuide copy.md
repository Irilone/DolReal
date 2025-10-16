
# Ultrathink Setup: Full MCP Optimization

To optimize Claude Sonnet 4.5 CLI with Ultrathink, install and configure the following MCP servers with full integration:

---

## ✅ Primary MCP Servers

### 1. buildoracle
- **Purpose:** Deep bundler analysis, plugin graph mapping, SSR compatibility.
- **Prompt example:**
```json
"task": "Analyze build chain plugins and SSR compat for React 18 with Webpack and Vite."
```
- **CLI Command:**
```bash
claude --model sonnet-4.5 --ultrathink --mcp buildoracle --input build-analysis.json
```

---

### 2. perfmonk
- **Purpose:** Profiling build time, memory usage, HMR delay, cold starts.
- **Prompt example:**
```json
"task": "Benchmark hot reload speed and memory usage between Webpack and Vite using large monorepo."
```
- **CLI Example:**
```bash
vite build --debug
webpack --profile --json > stats.json
```

---

### 3. stackhistorian
- **Purpose:** Tracks bundler evolution, community shifts, and deprecation timelines.
- **Prompt example:**
```json
"task": "Trace Webpack and Vite adoption trends in production SSR contexts."
```

---

## ➕ Suggested Additional MCPs

### 4. joyloop
- **Purpose:** DX metrics and team ergonomics (HMR feedback, config fatigue, error surfacing).
- **Installation:** Auto-load with any DX prompt.
- **Prompt example:**
```json
"task": "Measure developer wait-time per HMR cycle and config complexity in Webpack vs Vite."
```

---

### 5. devsavant
- **Purpose:** Refactor-friendly code suggestions, simplifies transitions across large codebases.
- **Prompt:** "Show code-level implications of migrating from Webpack to Vite in monorepo."

---

### 6. metricslayer
- **Purpose:** Graphs build size, cache efficiency, lazy-load tree analysis.
- **Prompt:** "Show before/after metrics for tree shaking with Vite in production."

---

## 🧪 Full Example CLI Run
```bash
claude --model sonnet-4.5   --ultrathink   --mcp context7,desktopcommander,buildoracle,perfmonk,stackhistorian,joyloop,devsavant,metricslayer   --input hybrid_bundler_eval.json
```
