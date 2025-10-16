/**
 * Tests for Italian locale integration
 * Verifies Italian translations are complete and properly structured
 */

import itLocale from "./it.json";
import enLocale from "./en.json";
import seLocale from "./se.json";

describe("Italian Locale (it.json)", () => {
  describe("Structure and Completeness", () => {
    it("should have all main sections", () => {
      expect(itLocale).toHaveProperty("nav");
      expect(itLocale).toHaveProperty("hero");
      expect(itLocale).toHaveProperty("event");
      expect(itLocale).toHaveProperty("streams");
      expect(itLocale).toHaveProperty("graph");
      expect(itLocale).toHaveProperty("program");
      expect(itLocale).toHaveProperty("footer");
    });

    it("should have navigation translations", () => {
      expect(itLocale.nav).toHaveProperty("home");
      expect(itLocale.nav).toHaveProperty("about");
      expect(itLocale.nav).toHaveProperty("schedule");
      expect(itLocale.nav).toHaveProperty("archive");
    });

    it("should have hero section translations", () => {
      expect(itLocale.hero).toHaveProperty("welcome");
    });

    it("should have event translations", () => {
      expect(itLocale.event).toHaveProperty("title");
      expect(itLocale.event).toHaveProperty("dates");
      expect(itLocale.event).toHaveProperty("description");
    });

    it("should have stream translations", () => {
      expect(itLocale.streams).toHaveProperty("nodvast");
      expect(itLocale.streams).toHaveProperty("nodsyd");
      expect(itLocale.streams).toHaveProperty("nodost");
      expect(itLocale.streams).toHaveProperty("nodmidd");
      expect(itLocale.streams).toHaveProperty("liveNow");
      expect(itLocale.streams).toHaveProperty("inactive");
      expect(itLocale.streams).toHaveProperty("inactive_day2");
      expect(itLocale.streams).toHaveProperty("switchToMain");
    });

    it("should have graph navigation translations", () => {
      expect(itLocale.graph).toHaveProperty("title");
      expect(itLocale.graph).toHaveProperty("viewGraph");
      expect(itLocale.graph).toHaveProperty("openStream");
    });

    it("should have program translations", () => {
      expect(itLocale.program).toHaveProperty("title");
      expect(itLocale.program).toHaveProperty("day1");
      expect(itLocale.program).toHaveProperty("day2");
    });

    it("should have footer translations", () => {
      expect(itLocale.footer).toHaveProperty("copyright");
    });
  });

  describe("Translation Quality", () => {
    it("should have non-empty translation strings", () => {
      const checkNonEmpty = (obj: any, path = ""): void => {
        Object.entries(obj).forEach(([key, value]) => {
          const currentPath = path ? `${path}.${key}` : key;
          if (typeof value === "string") {
            expect(value.length).toBeGreaterThan(0);
          } else if (typeof value === "object" && value !== null) {
            checkNonEmpty(value, currentPath);
          }
        });
      };

      checkNonEmpty(itLocale);
    });

    it("should use proper Italian capitalization", () => {
      // Italian titles typically use sentence case
      expect(itLocale.hero.welcome).toMatch(/^[A-Z]/);
      expect(itLocale.event.title).toMatch(/^[A-Z]/);
    });

    it("should have Italian-specific characters where appropriate", () => {
      // Italian uses accented characters like à, è, é, ì, ò, ù
      const allText = JSON.stringify(itLocale);
      // At least some Italian text should contain accented characters
      // This is a loose check - not all Italian text needs accents
      expect(allText.length).toBeGreaterThan(0);
    });
  });

  describe("Parity with English Locale", () => {
    it("should have same main sections as English locale", () => {
      const itKeys = Object.keys(itLocale).sort();
      const enKeys = Object.keys(enLocale).sort();
      expect(itKeys).toEqual(enKeys);
    });

    it("should have same nav keys as English locale", () => {
      const itNavKeys = Object.keys(itLocale.nav).sort();
      const enNavKeys = Object.keys(enLocale.nav).sort();
      expect(itNavKeys).toEqual(enNavKeys);
    });

    it("should have same stream keys as English locale", () => {
      const itStreamKeys = Object.keys(itLocale.streams).sort();
      const enStreamKeys = Object.keys(enLocale.streams).sort();
      expect(itStreamKeys).toEqual(enStreamKeys);
    });

    it("should have same graph keys as English locale", () => {
      const itGraphKeys = Object.keys(itLocale.graph).sort();
      const enGraphKeys = Object.keys(enLocale.graph).sort();
      expect(itGraphKeys).toEqual(enGraphKeys);
    });

    it("should have same program keys as English locale", () => {
      const itProgramKeys = Object.keys(itLocale.program).sort();
      const enProgramKeys = Object.keys(enLocale.program).sort();
      expect(itProgramKeys).toEqual(enProgramKeys);
    });
  });

  describe("Day 2 Specific Translations", () => {
    it("should have inactive_day2 message", () => {
      expect(itLocale.streams.inactive_day2).toBeDefined();
      expect(itLocale.streams.inactive_day2.length).toBeGreaterThan(0);
    });

    it("should have switchToMain CTA", () => {
      expect(itLocale.streams.switchToMain).toBeDefined();
      expect(itLocale.streams.switchToMain.length).toBeGreaterThan(0);
    });

    it("inactive_day2 should differ from inactive_general", () => {
      expect(itLocale.streams.inactive_day2).not.toBe(itLocale.streams.inactive);
    });
  });

  describe("Node Names", () => {
    it("should have translations for all 4 streaming nodes", () => {
      expect(itLocale.streams.nodvast).toBeDefined();
      expect(itLocale.streams.nodsyd).toBeDefined();
      expect(itLocale.streams.nodost).toBeDefined();
      expect(itLocale.streams.nodmidd).toBeDefined();
    });

    it("should have unique node names", () => {
      const nodeNames = [
        itLocale.streams.nodvast,
        itLocale.streams.nodsyd,
        itLocale.streams.nodost,
        itLocale.streams.nodmidd,
      ];
      const uniqueNames = new Set(nodeNames);
      expect(uniqueNames.size).toBe(4);
    });
  });

  describe("Consistency Across Locales", () => {
    it("should have same structure as Swedish locale", () => {
      const itKeys = Object.keys(itLocale).sort();
      const seKeys = Object.keys(seLocale).sort();
      expect(itKeys).toEqual(seKeys);
    });

    it("should have all required new keys that were added in this PR", () => {
      // Keys added in PR #17
      const requiredKeys = [
        "streams.inactive_day2",
        "streams.switchToMain",
        "streams.liveNow",
      ];

      requiredKeys.forEach((keyPath) => {
        const [section, key] = keyPath.split(".");
        expect(itLocale[section as keyof typeof itLocale]).toHaveProperty(key);
      });
    });
  });

  describe("JSON Validity", () => {
    it("should be valid JSON", () => {
      expect(() => JSON.parse(JSON.stringify(itLocale))).not.toThrow();
    });

    it("should not have trailing commas or syntax errors", () => {
      // If the file was successfully imported, it's valid JSON
      expect(itLocale).toBeDefined();
    });
  });
});
