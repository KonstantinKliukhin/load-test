import { Page } from "@playwright/test";
import * as http from "http";

http.globalAgent.maxSockets = Infinity;
const baseUrl = "http://localhost:9000";

export const config = {
  target: baseUrl,
  showAllPageMetrics: true,
  testIdAttribute: "product-list",
  http: {
    extendedMetrics: true,
  },
  phases: [
    // { duration: 10, arrivalRate: 1, name: "warm‑up" },
    { duration: 60, arrivalRate: 3, name: "warm‑up" },
    { duration: 120, arrivalRate: 3, rampTo: 8, name: "ramp‑up" },
    { duration: 300, arrivalRate: 8, name: "sustain" },
  ],
  engines: {
    playwright: {
      aggregateByName: true,
      maxConcurrentContexts: 2,
      launchOptions: {
        args: ["--disable-gpu", "--no-sandbox", "--disable-dev-shm-usage"],
      },
    },
  },
  plugins: {},
}; // :contentReference[oaicite:0]{index=0}

export const scenarios = [
  { name: "SSR", engine: "playwright", weight: 1, testFunction: ssrFlow },
  // { name: "CSR", engine: "playwright", weight: 1, testFunction: csrFlow },
  // { name: "SSG", engine: "playwright", weight: 1, testFunction: ssgFlow },
  // { name: "ISR", engine: "playwright", weight: 1, testFunction: isrFlow },
];

async function ssrFlow(page, vuContext, events, test) {
  await exercise(page, `${baseUrl}/ssr`, vuContext, events, test);
}
async function csrFlow(page, vuContext, events, test) {
  await exercise(page, `${baseUrl}/`, vuContext, events, test);
}

async function ssgFlow(page, vuContext, events, test) {
  await exercise(page, `${baseUrl}/ssg`, vuContext, events, test);
}

async function isrFlow(page, vuContext, events, test) {
  await exercise(page, `${baseUrl}/isr`, vuContext, events, test);
}

async function exercise(page: Page, path: string, vuContext, events, test) {
  const { step } = test;
  const timings = {};
  console.log("path", path);
  await page.goto(path, { waitUntil: "load" });

  await step("collect-perf-metrics", async () => {
    const perf = await page.evaluate(() => {
      const nav = performance.getEntriesByType(
        "navigation"
      )[0] as PerformanceNavigationTiming;

      return {
        ttfb: nav.responseStart - nav.requestStart,
        fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
        lcp: performance.getEntriesByType("largest-contentful-paint")[0]?.startTime || 0,
        domContentLoaded: nav.domContentLoadedEventStart - nav.startTime,
        loadEvent: nav.loadEventEnd - nav.startTime,
      };
    });
    Object.assign(timings, perf);
    events.emit("histogram", "ttfb", perf.ttfb);
    events.emit("histogram", "fcp", perf.fcp);
    events.emit("histogram", "lcp", perf.lcp);
    vuContext.vars.timings = timings;
  });
}
