var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var load_tests_exports = {};
__export(load_tests_exports, {
  config: () => config,
  scenarios: () => scenarios
});
module.exports = __toCommonJS(load_tests_exports);
var baseUrl = "http://ec2-18-205-160-71.compute-1.amazonaws.com:3000";
var config = {
  target: baseUrl,
  showAllPageMetrics: true,
  testIdAttribute: "product-list",
  http: {
    extendedMetrics: true
  },
  phases: [
    // { duration: 10, arrivalRate: 1, name: "warm‑up" },
    { duration: 60, arrivalRate: 10, name: "warm\u2011up" },
    { duration: 120, arrivalRate: 100, rampTo: 500, name: "ramp\u2011up" },
    { duration: 300, arrivalRate: 500, name: "sustain" }
  ],
  engines: { playwright: { aggregateByName: true } },
  plugins: {}
};
var scenarios = [
  { name: "SSR", engine: "playwright", weight: 1, testFunction: ssrFlow }
  // { name: "CSR", engine: "playwright", weight: 1, testFunction: csrFlow },
  // { name: "SSG", engine: "playwright", weight: 1, testFunction: ssgFlow },
  // { name: "ISR", engine: "playwright", weight: 1, testFunction: isrFlow },
];
async function ssrFlow(page, vuContext, events, test) {
  await exercise(page, `${baseUrl}/ssr`, vuContext, events, test);
}
async function exercise(page, path, vuContext, events, test) {
  const { step } = test;
  const timings = {};
  console.log("path", path);
  await page.goto(path, { waitUntil: "load" });
  await step("collect-perf-metrics", async () => {
    const perf = await page.evaluate(() => {
      const nav = performance.getEntriesByType(
        "navigation"
      )[0];
      return {
        ttfb: nav.responseStart - nav.requestStart,
        fcp: performance.getEntriesByName("first-contentful-paint")[0]?.startTime || 0,
        lcp: performance.getEntriesByType("largest-contentful-paint")[0]?.startTime || 0,
        domContentLoaded: nav.domContentLoadedEventStart - nav.startTime,
        loadEvent: nav.loadEventEnd - nav.startTime
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
  await step("close-browser", async () => {
    try {
      await page?.close?.();
    } catch (error) {
      console.error("Error closing browser", error);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiQHBsYXl3cmlnaHQvdGVzdFwiO1xuXG5jb25zdCBiYXNlVXJsID0gXCJodHRwOi8vZWMyLTE4LTIwNS0xNjAtNzEuY29tcHV0ZS0xLmFtYXpvbmF3cy5jb206MzAwMFwiO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICB0YXJnZXQ6IGJhc2VVcmwsXG4gIHNob3dBbGxQYWdlTWV0cmljczogdHJ1ZSxcbiAgdGVzdElkQXR0cmlidXRlOiBcInByb2R1Y3QtbGlzdFwiLFxuICBodHRwOiB7XG4gICAgZXh0ZW5kZWRNZXRyaWNzOiB0cnVlLFxuICB9LFxuICBwaGFzZXM6IFtcbiAgICAvLyB7IGR1cmF0aW9uOiAxMCwgYXJyaXZhbFJhdGU6IDEsIG5hbWU6IFwid2FybVx1MjAxMXVwXCIgfSxcbiAgICB7IGR1cmF0aW9uOiA2MCwgYXJyaXZhbFJhdGU6IDEwLCBuYW1lOiBcIndhcm1cdTIwMTF1cFwiIH0sXG4gICAgeyBkdXJhdGlvbjogMTIwLCBhcnJpdmFsUmF0ZTogMTAwLCByYW1wVG86IDUwMCwgbmFtZTogXCJyYW1wXHUyMDExdXBcIiB9LFxuICAgIHsgZHVyYXRpb246IDMwMCwgYXJyaXZhbFJhdGU6IDUwMCwgbmFtZTogXCJzdXN0YWluXCIgfSxcbiAgXSxcbiAgZW5naW5lczogeyBwbGF5d3JpZ2h0OiB7IGFnZ3JlZ2F0ZUJ5TmFtZTogdHJ1ZSB9IH0sXG4gIHBsdWdpbnM6IHt9LFxufTsgLy8gOmNvbnRlbnRSZWZlcmVuY2Vbb2FpY2l0ZTowXXtpbmRleD0wfVxuXG5leHBvcnQgY29uc3Qgc2NlbmFyaW9zID0gW1xuICB7IG5hbWU6IFwiU1NSXCIsIGVuZ2luZTogXCJwbGF5d3JpZ2h0XCIsIHdlaWdodDogMSwgdGVzdEZ1bmN0aW9uOiBzc3JGbG93IH0sXG4gIC8vIHsgbmFtZTogXCJDU1JcIiwgZW5naW5lOiBcInBsYXl3cmlnaHRcIiwgd2VpZ2h0OiAxLCB0ZXN0RnVuY3Rpb246IGNzckZsb3cgfSxcbiAgLy8geyBuYW1lOiBcIlNTR1wiLCBlbmdpbmU6IFwicGxheXdyaWdodFwiLCB3ZWlnaHQ6IDEsIHRlc3RGdW5jdGlvbjogc3NnRmxvdyB9LFxuICAvLyB7IG5hbWU6IFwiSVNSXCIsIGVuZ2luZTogXCJwbGF5d3JpZ2h0XCIsIHdlaWdodDogMSwgdGVzdEZ1bmN0aW9uOiBpc3JGbG93IH0sXG5dO1xuXG5hc3luYyBmdW5jdGlvbiBzc3JGbG93KHBhZ2UsIHZ1Q29udGV4dCwgZXZlbnRzLCB0ZXN0KSB7XG4gIGF3YWl0IGV4ZXJjaXNlKHBhZ2UsIGAke2Jhc2VVcmx9L3NzcmAsIHZ1Q29udGV4dCwgZXZlbnRzLCB0ZXN0KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNzckZsb3cocGFnZSwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpIHtcbiAgYXdhaXQgZXhlcmNpc2UocGFnZSwgYCR7YmFzZVVybH0vYCwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzc2dGbG93KHBhZ2UsIHZ1Q29udGV4dCwgZXZlbnRzLCB0ZXN0KSB7XG4gIGF3YWl0IGV4ZXJjaXNlKHBhZ2UsIGAke2Jhc2VVcmx9L3NzZ2AsIHZ1Q29udGV4dCwgZXZlbnRzLCB0ZXN0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaXNyRmxvdyhwYWdlLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCkge1xuICBhd2FpdCBleGVyY2lzZShwYWdlLCBgJHtiYXNlVXJsfS9pc3JgLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGV4ZXJjaXNlKHBhZ2U6IFBhZ2UsIHBhdGg6IHN0cmluZywgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpIHtcbiAgY29uc3QgeyBzdGVwIH0gPSB0ZXN0O1xuICBjb25zdCB0aW1pbmdzID0ge307XG4gIGNvbnNvbGUubG9nKFwicGF0aFwiLCBwYXRoKTtcbiAgYXdhaXQgcGFnZS5nb3RvKHBhdGgsIHsgd2FpdFVudGlsOiBcImxvYWRcIiB9KTtcblxuICBhd2FpdCBzdGVwKFwiY29sbGVjdC1wZXJmLW1ldHJpY3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHBlcmYgPSBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgIGNvbnN0IG5hdiA9IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXG4gICAgICAgIFwibmF2aWdhdGlvblwiXG4gICAgICApWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZztcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHRmYjogbmF2LnJlc3BvbnNlU3RhcnQgLSBuYXYucmVxdWVzdFN0YXJ0LFxuICAgICAgICBmY3A6IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeU5hbWUoXCJmaXJzdC1jb250ZW50ZnVsLXBhaW50XCIpWzBdPy5zdGFydFRpbWUgfHwgMCxcbiAgICAgICAgbGNwOiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibGFyZ2VzdC1jb250ZW50ZnVsLXBhaW50XCIpWzBdPy5zdGFydFRpbWUgfHwgMCxcbiAgICAgICAgZG9tQ29udGVudExvYWRlZDogbmF2LmRvbUNvbnRlbnRMb2FkZWRFdmVudFN0YXJ0IC0gbmF2LnN0YXJ0VGltZSxcbiAgICAgICAgbG9hZEV2ZW50OiBuYXYubG9hZEV2ZW50RW5kIC0gbmF2LnN0YXJ0VGltZSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgT2JqZWN0LmFzc2lnbih0aW1pbmdzLCBwZXJmKTtcbiAgICBldmVudHMuZW1pdChcImhpc3RvZ3JhbVwiLCBcInR0ZmJcIiwgcGVyZi50dGZiKTtcbiAgICBldmVudHMuZW1pdChcImhpc3RvZ3JhbVwiLCBcImZjcFwiLCBwZXJmLmZjcCk7XG4gICAgZXZlbnRzLmVtaXQoXCJoaXN0b2dyYW1cIiwgXCJsY3BcIiwgcGVyZi5sY3ApO1xuICAgIHZ1Q29udGV4dC52YXJzLnRpbWluZ3MgPSB0aW1pbmdzO1xuICB9KTtcblxuICBhd2FpdCBzdGVwKFwibGlzdC12aXNpYmxlXCIsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwicHJvZHVjdHMtbGlzdFwiXScsIHsgc3RhdGU6IFwidmlzaWJsZVwiIH0pO1xuICB9KTtcblxuICBhd2FpdCBzdGVwKFwiY2xvc2UtYnJvd3NlclwiLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHBhZ2U/LmNsb3NlPy4oKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc29sZS5lcnJvcihcIkVycm9yIGNsb3NpbmcgYnJvd3NlclwiLCBlcnJvcik7XG4gICAgfVxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQSxJQUFNLFVBQVU7QUFFVCxJQUFNLFNBQVM7QUFBQSxFQUNwQixRQUFRO0FBQUEsRUFDUixvQkFBb0I7QUFBQSxFQUNwQixpQkFBaUI7QUFBQSxFQUNqQixNQUFNO0FBQUEsSUFDSixpQkFBaUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsUUFBUTtBQUFBO0FBQUEsSUFFTixFQUFFLFVBQVUsSUFBSSxhQUFhLElBQUksTUFBTSxlQUFVO0FBQUEsSUFDakQsRUFBRSxVQUFVLEtBQUssYUFBYSxLQUFLLFFBQVEsS0FBSyxNQUFNLGVBQVU7QUFBQSxJQUNoRSxFQUFFLFVBQVUsS0FBSyxhQUFhLEtBQUssTUFBTSxVQUFVO0FBQUEsRUFDckQ7QUFBQSxFQUNBLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEtBQUssRUFBRTtBQUFBLEVBQ2pELFNBQVMsQ0FBQztBQUNaO0FBRU8sSUFBTSxZQUFZO0FBQUEsRUFDdkIsRUFBRSxNQUFNLE9BQU8sUUFBUSxjQUFjLFFBQVEsR0FBRyxjQUFjLFFBQVE7QUFBQTtBQUFBO0FBQUE7QUFJeEU7QUFFQSxlQUFlLFFBQVEsTUFBTSxXQUFXLFFBQVEsTUFBTTtBQUNwRCxRQUFNLFNBQVMsTUFBTSxHQUFHLE9BQU8sUUFBUSxXQUFXLFFBQVEsSUFBSTtBQUNoRTtBQWFBLGVBQWUsU0FBUyxNQUFZLE1BQWMsV0FBVyxRQUFRLE1BQU07QUFDekUsUUFBTSxFQUFFLEtBQUssSUFBSTtBQUNqQixRQUFNLFVBQVUsQ0FBQztBQUNqQixVQUFRLElBQUksUUFBUSxJQUFJO0FBQ3hCLFFBQU0sS0FBSyxLQUFLLE1BQU0sRUFBRSxXQUFXLE9BQU8sQ0FBQztBQUUzQyxRQUFNLEtBQUssd0JBQXdCLFlBQVk7QUFDN0MsVUFBTSxPQUFPLE1BQU0sS0FBSyxTQUFTLE1BQU07QUFDckMsWUFBTSxNQUFNLFlBQVk7QUFBQSxRQUN0QjtBQUFBLE1BQ0YsRUFBRSxDQUFDO0FBRUgsYUFBTztBQUFBLFFBQ0wsTUFBTSxJQUFJLGdCQUFnQixJQUFJO0FBQUEsUUFDOUIsS0FBSyxZQUFZLGlCQUFpQix3QkFBd0IsRUFBRSxDQUFDLEdBQUcsYUFBYTtBQUFBLFFBQzdFLEtBQUssWUFBWSxpQkFBaUIsMEJBQTBCLEVBQUUsQ0FBQyxHQUFHLGFBQWE7QUFBQSxRQUMvRSxrQkFBa0IsSUFBSSw2QkFBNkIsSUFBSTtBQUFBLFFBQ3ZELFdBQVcsSUFBSSxlQUFlLElBQUk7QUFBQSxNQUNwQztBQUFBLElBQ0YsQ0FBQztBQUNELFdBQU8sT0FBTyxTQUFTLElBQUk7QUFDM0IsV0FBTyxLQUFLLGFBQWEsUUFBUSxLQUFLLElBQUk7QUFDMUMsV0FBTyxLQUFLLGFBQWEsT0FBTyxLQUFLLEdBQUc7QUFDeEMsV0FBTyxLQUFLLGFBQWEsT0FBTyxLQUFLLEdBQUc7QUFDeEMsY0FBVSxLQUFLLFVBQVU7QUFBQSxFQUMzQixDQUFDO0FBRUQsUUFBTSxLQUFLLGdCQUFnQixZQUFZO0FBQ3JDLFVBQU0sS0FBSyxnQkFBZ0IsaUNBQWlDLEVBQUUsT0FBTyxVQUFVLENBQUM7QUFBQSxFQUNsRixDQUFDO0FBRUQsUUFBTSxLQUFLLGlCQUFpQixZQUFZO0FBQ3RDLFFBQUk7QUFDRixZQUFNLE1BQU0sUUFBUTtBQUFBLElBQ3RCLFNBQVMsT0FBTztBQUNkLGNBQVEsTUFBTSx5QkFBeUIsS0FBSztBQUFBLElBQzlDO0FBQUEsRUFDRixDQUFDO0FBQ0g7IiwKICAibmFtZXMiOiBbXQp9Cg==
