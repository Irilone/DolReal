/**
 * Unit tests for DoL data helper functions
 * Tests the centralized data model and helper functions for the streaming hub
 */

import {
  dolNodes,
  dolProgram,
  dolGraphEdges,
  eventInfo,
  getNodeById,
  isNodeActiveOnDay,
  getProgramForDay,
  getProgramForNode,
  getActiveNodesForDay,
  getInactiveMessage,
  type DolNode,
  type ProgramItem,
  type GraphEdge,
  type StreamNode,
  type EventDay,
} from "./data";

describe("DoL Data Model", () => {
  describe("dolNodes", () => {
    it("should have exactly 4 nodes", () => {
      expect(dolNodes).toHaveLength(4);
    });

    it("should have all required node properties", () => {
      dolNodes.forEach((node) => {
        expect(node).toHaveProperty("id");
        expect(node).toHaveProperty("name");
        expect(node).toHaveProperty("nameKey");
        expect(node).toHaveProperty("youtubeId");
        expect(node).toHaveProperty("graphId");
        expect(node).toHaveProperty("activeDays");
        expect(node).toHaveProperty("color");
        expect(node).toHaveProperty("description");
      });
    });

    it("should have unique node IDs", () => {
      const ids = dolNodes.map((node) => node.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(dolNodes.length);
    });

    it("should have valid color hex codes", () => {
      const hexColorRegex = /^#[0-9A-F]{6}$/i;
      dolNodes.forEach((node) => {
        expect(node.color).toMatch(hexColorRegex);
      });
    });

    it("should have nodvast active on both days", () => {
      const nodvast = dolNodes.find((node) => node.id === "nodvast");
      expect(nodvast?.activeDays).toEqual([1, 2]);
    });

    it("should have other nodes active only on day 1", () => {
      const otherNodes = dolNodes.filter((node) => node.id !== "nodvast");
      otherNodes.forEach((node) => {
        expect(node.activeDays).toEqual([1]);
      });
    });
  });

  describe("dolProgram", () => {
    it("should have program items", () => {
      expect(dolProgram.length).toBeGreaterThan(0);
    });

    it("should have all required program properties", () => {
      dolProgram.forEach((item) => {
        expect(item).toHaveProperty("id");
        expect(item).toHaveProperty("time");
        expect(item).toHaveProperty("title");
        expect(item).toHaveProperty("titleKey");
        expect(item).toHaveProperty("node");
        expect(item).toHaveProperty("day");
        expect(item).toHaveProperty("duration");
      });
    });

    it("should have unique program item IDs", () => {
      const ids = dolProgram.map((item) => item.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(dolProgram.length);
    });

    it("should have valid time formats (HH:MM)", () => {
      const timeRegex = /^([0-1][0-9]|2[0-3]):[0-5][0-9]$/;
      dolProgram.forEach((item) => {
        expect(item.time).toMatch(timeRegex);
      });
    });

    it("should only have day 2 items for nodvast", () => {
      const day2Items = dolProgram.filter((item) => item.day === 2);
      day2Items.forEach((item) => {
        expect(item.node).toBe("nodvast");
      });
    });

    it("should have positive durations", () => {
      dolProgram.forEach((item) => {
        expect(item.duration).toBeGreaterThan(0);
      });
    });
  });

  describe("dolGraphEdges", () => {
    it("should have graph edges", () => {
      expect(dolGraphEdges.length).toBeGreaterThan(0);
    });

    it("should have all required edge properties", () => {
      dolGraphEdges.forEach((edge) => {
        expect(edge).toHaveProperty("from");
        expect(edge).toHaveProperty("to");
        expect(edge).toHaveProperty("label");
      });
    });

    it("should reference valid node IDs", () => {
      const validNodeIds = dolNodes.map((node) => node.id);
      dolGraphEdges.forEach((edge) => {
        expect(validNodeIds).toContain(edge.from);
        expect(validNodeIds).toContain(edge.to);
      });
    });
  });

  describe("eventInfo", () => {
    it("should have all required event properties", () => {
      expect(eventInfo).toHaveProperty("name");
      expect(eventInfo).toHaveProperty("nameKey");
      expect(eventInfo).toHaveProperty("dates");
      expect(eventInfo).toHaveProperty("datesKey");
      expect(eventInfo).toHaveProperty("day1");
      expect(eventInfo).toHaveProperty("day2");
      expect(eventInfo).toHaveProperty("venue");
      expect(eventInfo).toHaveProperty("description");
      expect(eventInfo).toHaveProperty("descriptionKey");
    });

    it("should have valid ISO date formats", () => {
      const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
      expect(eventInfo.day1).toMatch(isoDateRegex);
      expect(eventInfo.day2).toMatch(isoDateRegex);
    });
  });
});

describe("Helper Functions", () => {
  describe("getNodeById", () => {
    it("should return the correct node for valid ID", () => {
      const node = getNodeById("nodvast");
      expect(node).toBeDefined();
      expect(node?.id).toBe("nodvast");
      expect(node?.name).toBe("Nordväst");
    });

    it("should return undefined for invalid ID", () => {
      const node = getNodeById("invalid" as StreamNode);
      expect(node).toBeUndefined();
    });

    it("should return correct nodes for all valid IDs", () => {
      const validIds: StreamNode[] = ["nodvast", "nodsyd", "nodost", "nodmidd"];
      validIds.forEach((id) => {
        const node = getNodeById(id);
        expect(node).toBeDefined();
        expect(node?.id).toBe(id);
      });
    });
  });

  describe("isNodeActiveOnDay", () => {
    it("should return true for nodvast on day 1", () => {
      expect(isNodeActiveOnDay("nodvast", 1)).toBe(true);
    });

    it("should return true for nodvast on day 2", () => {
      expect(isNodeActiveOnDay("nodvast", 2)).toBe(true);
    });

    it("should return true for nodsyd on day 1", () => {
      expect(isNodeActiveOnDay("nodsyd", 1)).toBe(true);
    });

    it("should return false for nodsyd on day 2", () => {
      expect(isNodeActiveOnDay("nodsyd", 2)).toBe(false);
    });

    it("should return true for nodost on day 1", () => {
      expect(isNodeActiveOnDay("nodost", 1)).toBe(true);
    });

    it("should return false for nodost on day 2", () => {
      expect(isNodeActiveOnDay("nodost", 2)).toBe(false);
    });

    it("should return true for nodmidd on day 1", () => {
      expect(isNodeActiveOnDay("nodmidd", 1)).toBe(true);
    });

    it("should return false for nodmidd on day 2", () => {
      expect(isNodeActiveOnDay("nodmidd", 2)).toBe(false);
    });

    it("should return false for invalid node ID", () => {
      expect(isNodeActiveOnDay("invalid" as StreamNode, 1)).toBe(false);
    });
  });

  describe("getProgramForDay", () => {
    it("should return all day 1 program items", () => {
      const day1Program = getProgramForDay(1);
      expect(day1Program.length).toBeGreaterThan(0);
      day1Program.forEach((item) => {
        expect(item.day).toBe(1);
      });
    });

    it("should return all day 2 program items", () => {
      const day2Program = getProgramForDay(2);
      expect(day2Program.length).toBeGreaterThan(0);
      day2Program.forEach((item) => {
        expect(item.day).toBe(2);
      });
    });

    it("should return items for multiple nodes on day 1", () => {
      const day1Program = getProgramForDay(1);
      const uniqueNodes = new Set(day1Program.map((item) => item.node));
      expect(uniqueNodes.size).toBeGreaterThan(1);
    });

    it("should return only nodvast items on day 2", () => {
      const day2Program = getProgramForDay(2);
      const uniqueNodes = new Set(day2Program.map((item) => item.node));
      expect(uniqueNodes.size).toBe(1);
      expect(Array.from(uniqueNodes)[0]).toBe("nodvast");
    });
  });

  describe("getProgramForNode", () => {
    it("should return all items for nodvast across both days", () => {
      const nodvastProgram = getProgramForNode("nodvast");
      expect(nodvastProgram.length).toBeGreaterThan(0);
      nodvastProgram.forEach((item) => {
        expect(item.node).toBe("nodvast");
      });
    });

    it("should return day 1 items for nodsyd", () => {
      const nodsydProgram = getProgramForNode("nodsyd");
      expect(nodsydProgram.length).toBeGreaterThan(0);
      nodsydProgram.forEach((item) => {
        expect(item.node).toBe("nodsyd");
        expect(item.day).toBe(1);
      });
    });

    it("should filter by day when specified", () => {
      const nodvastDay1 = getProgramForNode("nodvast", 1);
      expect(nodvastDay1.length).toBeGreaterThan(0);
      nodvastDay1.forEach((item) => {
        expect(item.node).toBe("nodvast");
        expect(item.day).toBe(1);
      });
    });

    it("should return different counts for nodvast on different days", () => {
      const nodvastDay1 = getProgramForNode("nodvast", 1);
      const nodvastDay2 = getProgramForNode("nodvast", 2);
      const nodvastAll = getProgramForNode("nodvast");
      expect(nodvastAll.length).toBe(nodvastDay1.length + nodvastDay2.length);
    });

    it("should return empty array for invalid node", () => {
      const invalidProgram = getProgramForNode("invalid" as StreamNode);
      expect(invalidProgram).toEqual([]);
    });
  });

  describe("getActiveNodesForDay", () => {
    it("should return all 4 nodes for day 1", () => {
      const activeDay1 = getActiveNodesForDay(1);
      expect(activeDay1).toHaveLength(4);
      expect(activeDay1.map((n) => n.id).sort()).toEqual([
        "nodmidd",
        "nodost",
        "nodsyd",
        "nodvast",
      ]);
    });

    it("should return only nodvast for day 2", () => {
      const activeDay2 = getActiveNodesForDay(2);
      expect(activeDay2).toHaveLength(1);
      expect(activeDay2[0].id).toBe("nodvast");
    });

    it("should return DolNode objects with all properties", () => {
      const activeDay1 = getActiveNodesForDay(1);
      activeDay1.forEach((node) => {
        expect(node).toHaveProperty("id");
        expect(node).toHaveProperty("name");
        expect(node).toHaveProperty("youtubeId");
        expect(node).toHaveProperty("activeDays");
      });
    });
  });

  describe("getInactiveMessage", () => {
    it("should return 'inactive_day2' for nodsyd on day 2", () => {
      expect(getInactiveMessage("nodsyd", 2)).toBe("inactive_day2");
    });

    it("should return 'inactive_day2' for nodost on day 2", () => {
      expect(getInactiveMessage("nodost", 2)).toBe("inactive_day2");
    });

    it("should return 'inactive_day2' for nodmidd on day 2", () => {
      expect(getInactiveMessage("nodmidd", 2)).toBe("inactive_day2");
    });

    it("should return 'inactive_general' for nodvast on day 2", () => {
      expect(getInactiveMessage("nodvast", 2)).toBe("inactive_general");
    });

    it("should return 'inactive_general' for any node on day 1", () => {
      expect(getInactiveMessage("nodvast", 1)).toBe("inactive_general");
      expect(getInactiveMessage("nodsyd", 1)).toBe("inactive_general");
    });
  });
});
