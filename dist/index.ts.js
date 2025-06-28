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
var config = {
  target: "http://localhost:3000",
  showAllPageMetrics: true,
  testIdAttribute: "product-list",
  http: {
    extendedMetrics: true
  },
  phases: [
    { duration: 10, arrivalRate: 1, name: "warm-up" }
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
  plugins: {}
};
var scenarios = [
  { name: "SSR", engine: "playwright", weight: 1, testFunction: ssrFlow }
  // { name: "CSR", engine: "playwright", weight: 1, testFunction: csrFlow },
  // { name: "SSG", engine: "playwright", weight: 1, testFunction: ssgFlow },
  // { name: "ISR", engine: "playwright", weight: 1, testFunction: isrFlow },
];
async function ssrFlow(page, vuContext, events, test) {
  await exercise(page, "http://localhost:3000/ssr", vuContext, events, test);
}
async function exercise(page, path, vuContext, events, test) {
  const { step } = test;
  const timings = {};
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
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  config,
  scenarios
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImltcG9ydCB7IFBhZ2UgfSBmcm9tIFwiQHBsYXl3cmlnaHQvdGVzdFwiO1xuXG5leHBvcnQgY29uc3QgY29uZmlnID0ge1xuICB0YXJnZXQ6IFwiaHR0cDovL2xvY2FsaG9zdDozMDAwXCIsXG4gIHNob3dBbGxQYWdlTWV0cmljczogdHJ1ZSxcbiAgdGVzdElkQXR0cmlidXRlOiBcInByb2R1Y3QtbGlzdFwiLFxuICBodHRwOiB7XG4gICAgZXh0ZW5kZWRNZXRyaWNzOiB0cnVlLFxuICB9LFxuICBwaGFzZXM6IFtcbiAgICB7IGR1cmF0aW9uOiAxMCwgYXJyaXZhbFJhdGU6IDEsIG5hbWU6IFwid2FybS11cFwiIH0sXG4gICAgLy8gd2FybVx1MjAxMXVwXG4gICAgLy8geyBkdXJhdGlvbjogNjAsIGFycml2YWxSYXRlOiAxMCwgbmFtZTogXCJ3YXJtXHUyMDExdXBcIiB9LFxuICAgIC8vIC8vIHJhbXAgdG8gcGVha1xuICAgIC8vIHsgZHVyYXRpb246IDEyMCwgYXJyaXZhbFJhdGU6IDEwMCwgcmFtcFRvOiA1MDAsIG5hbWU6IFwicmFtcFx1MjAxMXVwXCIgfSxcbiAgICAvLyAvLyBzdGVhZHkgc3RhdGUgKHRoaXMgaXMgd2hlcmUgeW91IGNvbGxlY3QgdGhlIGNoYXJ0cyB5b3VcdTIwMTlsbCBzaG93KVxuICAgIC8vIHsgZHVyYXRpb246IDMwMCwgYXJyaXZhbFJhdGU6IDUwMCwgbmFtZTogXCJzdXN0YWluXCIgfSxcbiAgICAvLyAvLyBvcHRpb25hbCBjb29sXHUyMDExZG93biBwYXVzZVxuICAgIC8vIHsgcGF1c2U6IDMwIH0sXG4gIF0sXG4gIGVuZ2luZXM6IHsgcGxheXdyaWdodDogeyBhZ2dyZWdhdGVCeU5hbWU6IHRydWUgfSB9LFxuICBwbHVnaW5zOiB7fSxcbn07IC8vIDpjb250ZW50UmVmZXJlbmNlW29haWNpdGU6MF17aW5kZXg9MH1cblxuZXhwb3J0IGNvbnN0IHNjZW5hcmlvcyA9IFtcbiAgeyBuYW1lOiBcIlNTUlwiLCBlbmdpbmU6IFwicGxheXdyaWdodFwiLCB3ZWlnaHQ6IDEsIHRlc3RGdW5jdGlvbjogc3NyRmxvdyB9LFxuICAvLyB7IG5hbWU6IFwiQ1NSXCIsIGVuZ2luZTogXCJwbGF5d3JpZ2h0XCIsIHdlaWdodDogMSwgdGVzdEZ1bmN0aW9uOiBjc3JGbG93IH0sXG4gIC8vIHsgbmFtZTogXCJTU0dcIiwgZW5naW5lOiBcInBsYXl3cmlnaHRcIiwgd2VpZ2h0OiAxLCB0ZXN0RnVuY3Rpb246IHNzZ0Zsb3cgfSxcbiAgLy8geyBuYW1lOiBcIklTUlwiLCBlbmdpbmU6IFwicGxheXdyaWdodFwiLCB3ZWlnaHQ6IDEsIHRlc3RGdW5jdGlvbjogaXNyRmxvdyB9LFxuXTtcblxuYXN5bmMgZnVuY3Rpb24gc3NyRmxvdyhwYWdlLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCkge1xuICBhd2FpdCBleGVyY2lzZShwYWdlLCBcImh0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9zc3JcIiwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpO1xufVxuYXN5bmMgZnVuY3Rpb24gY3NyRmxvdyhwYWdlLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCkge1xuICBhd2FpdCBleGVyY2lzZShwYWdlLCBcImh0dHA6Ly9sb2NhbGhvc3Q6NDE3My9cIiwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzc2dGbG93KHBhZ2UsIHZ1Q29udGV4dCwgZXZlbnRzLCB0ZXN0KSB7XG4gIGF3YWl0IGV4ZXJjaXNlKHBhZ2UsIFwiaHR0cDovL2xvY2FsaG9zdDozMDAwL3NzZ1wiLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGlzckZsb3cocGFnZSwgdnVDb250ZXh0LCBldmVudHMsIHRlc3QpIHtcbiAgYXdhaXQgZXhlcmNpc2UocGFnZSwgXCJodHRwOi8vbG9jYWxob3N0OjMwMDAvaXNyXCIsIHZ1Q29udGV4dCwgZXZlbnRzLCB0ZXN0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZXhlcmNpc2UocGFnZTogUGFnZSwgcGF0aDogc3RyaW5nLCB2dUNvbnRleHQsIGV2ZW50cywgdGVzdCkge1xuICBjb25zdCB7IHN0ZXAgfSA9IHRlc3Q7XG4gIGNvbnN0IHRpbWluZ3MgPSB7fTtcbiAgYXdhaXQgcGFnZS5nb3RvKHBhdGgsIHsgd2FpdFVudGlsOiBcImxvYWRcIiB9KTtcblxuICBhd2FpdCBzdGVwKFwiY29sbGVjdC1wZXJmLW1ldHJpY3NcIiwgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHBlcmYgPSBhd2FpdCBwYWdlLmV2YWx1YXRlKCgpID0+IHtcbiAgICAgIGNvbnN0IG5hdiA9IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeVR5cGUoXG4gICAgICAgIFwibmF2aWdhdGlvblwiXG4gICAgICApWzBdIGFzIFBlcmZvcm1hbmNlTmF2aWdhdGlvblRpbWluZztcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdHRmYjogbmF2LnJlc3BvbnNlU3RhcnQgLSBuYXYucmVxdWVzdFN0YXJ0LFxuICAgICAgICBmY3A6IHBlcmZvcm1hbmNlLmdldEVudHJpZXNCeU5hbWUoXCJmaXJzdC1jb250ZW50ZnVsLXBhaW50XCIpWzBdPy5zdGFydFRpbWUgfHwgMCxcbiAgICAgICAgbGNwOiBwZXJmb3JtYW5jZS5nZXRFbnRyaWVzQnlUeXBlKFwibGFyZ2VzdC1jb250ZW50ZnVsLXBhaW50XCIpWzBdPy5zdGFydFRpbWUgfHwgMCxcbiAgICAgICAgZG9tQ29udGVudExvYWRlZDogbmF2LmRvbUNvbnRlbnRMb2FkZWRFdmVudFN0YXJ0IC0gbmF2LnN0YXJ0VGltZSxcbiAgICAgICAgbG9hZEV2ZW50OiBuYXYubG9hZEV2ZW50RW5kIC0gbmF2LnN0YXJ0VGltZSxcbiAgICAgIH07XG4gICAgfSk7XG4gICAgT2JqZWN0LmFzc2lnbih0aW1pbmdzLCBwZXJmKTtcbiAgICBldmVudHMuZW1pdChcImhpc3RvZ3JhbVwiLCBcInR0ZmJcIiwgcGVyZi50dGZiKTtcbiAgICBldmVudHMuZW1pdChcImhpc3RvZ3JhbVwiLCBcImZjcFwiLCBwZXJmLmZjcCk7XG4gICAgZXZlbnRzLmVtaXQoXCJoaXN0b2dyYW1cIiwgXCJsY3BcIiwgcGVyZi5sY3ApO1xuICAgIHZ1Q29udGV4dC52YXJzLnRpbWluZ3MgPSB0aW1pbmdzO1xuICB9KTtcblxuICBhd2FpdCBzdGVwKFwibGlzdC12aXNpYmxlXCIsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCBwYWdlLndhaXRGb3JTZWxlY3RvcignW2RhdGEtdGVzdGlkPVwicHJvZHVjdHMtbGlzdFwiXScsIHsgc3RhdGU6IFwidmlzaWJsZVwiIH0pO1xuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFFTyxJQUFNLFNBQVM7QUFBQSxFQUNwQixRQUFRO0FBQUEsRUFDUixvQkFBb0I7QUFBQSxFQUNwQixpQkFBaUI7QUFBQSxFQUNqQixNQUFNO0FBQUEsSUFDSixpQkFBaUI7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sRUFBRSxVQUFVLElBQUksYUFBYSxHQUFHLE1BQU0sVUFBVTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQVNsRDtBQUFBLEVBQ0EsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsS0FBSyxFQUFFO0FBQUEsRUFDakQsU0FBUyxDQUFDO0FBQ1o7QUFFTyxJQUFNLFlBQVk7QUFBQSxFQUN2QixFQUFFLE1BQU0sT0FBTyxRQUFRLGNBQWMsUUFBUSxHQUFHLGNBQWMsUUFBUTtBQUFBO0FBQUE7QUFBQTtBQUl4RTtBQUVBLGVBQWUsUUFBUSxNQUFNLFdBQVcsUUFBUSxNQUFNO0FBQ3BELFFBQU0sU0FBUyxNQUFNLDZCQUE2QixXQUFXLFFBQVEsSUFBSTtBQUMzRTtBQWFBLGVBQWUsU0FBUyxNQUFZLE1BQWMsV0FBVyxRQUFRLE1BQU07QUFDekUsUUFBTSxFQUFFLEtBQUssSUFBSTtBQUNqQixRQUFNLFVBQVUsQ0FBQztBQUNqQixRQUFNLEtBQUssS0FBSyxNQUFNLEVBQUUsV0FBVyxPQUFPLENBQUM7QUFFM0MsUUFBTSxLQUFLLHdCQUF3QixZQUFZO0FBQzdDLFVBQU0sT0FBTyxNQUFNLEtBQUssU0FBUyxNQUFNO0FBQ3JDLFlBQU0sTUFBTSxZQUFZO0FBQUEsUUFDdEI7QUFBQSxNQUNGLEVBQUUsQ0FBQztBQUVILGFBQU87QUFBQSxRQUNMLE1BQU0sSUFBSSxnQkFBZ0IsSUFBSTtBQUFBLFFBQzlCLEtBQUssWUFBWSxpQkFBaUIsd0JBQXdCLEVBQUUsQ0FBQyxHQUFHLGFBQWE7QUFBQSxRQUM3RSxLQUFLLFlBQVksaUJBQWlCLDBCQUEwQixFQUFFLENBQUMsR0FBRyxhQUFhO0FBQUEsUUFDL0Usa0JBQWtCLElBQUksNkJBQTZCLElBQUk7QUFBQSxRQUN2RCxXQUFXLElBQUksZUFBZSxJQUFJO0FBQUEsTUFDcEM7QUFBQSxJQUNGLENBQUM7QUFDRCxXQUFPLE9BQU8sU0FBUyxJQUFJO0FBQzNCLFdBQU8sS0FBSyxhQUFhLFFBQVEsS0FBSyxJQUFJO0FBQzFDLFdBQU8sS0FBSyxhQUFhLE9BQU8sS0FBSyxHQUFHO0FBQ3hDLFdBQU8sS0FBSyxhQUFhLE9BQU8sS0FBSyxHQUFHO0FBQ3hDLGNBQVUsS0FBSyxVQUFVO0FBQUEsRUFDM0IsQ0FBQztBQUVELFFBQU0sS0FBSyxnQkFBZ0IsWUFBWTtBQUNyQyxVQUFNLEtBQUssZ0JBQWdCLGlDQUFpQyxFQUFFLE9BQU8sVUFBVSxDQUFDO0FBQUEsRUFDbEYsQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=
