import { Page } from "@playwright/test";

export const config = {
  target: "http://localhost:3000",
  showAllPageMetrics: true,
  testIdAttribute: "product-list",
  http: {
    extendedMetrics: true,
  },
  phases: [
    { duration: 10, arrivalRate: 1, name: "warm-up" },
    // warm‑up
    // { duration: 60, arrivalRate: 10, name: "warm‑up" },
    // // ramp to peak
    // { duration: 120, arrivalRate: 100, rampTo: 500, name: "ramp‑up" },
    // // steady state (this is where you collect the charts you’ll show)
    // { duration: 300, arrivalRate: 500, name: "sustain" },
    // // optional cool‑down pause
    // { pause: 30 },
  ],
  engines: { playwright: { aggregateByName: true } },
  plugins: {},
}; // :contentReference[oaicite:0]{index=0}

export const scenarios = [
  { name: "SSR", engine: "playwright", weight: 1, testFunction: ssrFlow },
  // { name: "CSR", engine: "playwright", weight: 1, testFunction: csrFlow },
  // { name: "SSG", engine: "playwright", weight: 1, testFunction: ssgFlow },
  // { name: "ISR", engine: "playwright", weight: 1, testFunction: isrFlow },
];

async function ssrFlow(page, vuContext, events, test) {
  await exercise(page, "http://localhost:3000/ssr", vuContext, events, test);
}
async function csrFlow(page, vuContext, events, test) {
  await exercise(page, "http://localhost:4173/", vuContext, events, test);
}

async function ssgFlow(page, vuContext, events, test) {
  await exercise(page, "http://localhost:3000/ssg", vuContext, events, test);
}

async function isrFlow(page, vuContext, events, test) {
  await exercise(page, "http://localhost:3000/isr", vuContext, events, test);
}

async function exercise(page: Page, path: string, vuContext, events, test) {
  const { step } = test;
  const timings = {};
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

  await step("list-visible", async () => {
    await page.waitForSelector('[data-testid="products-list"]', { state: "visible" });
  });
}
