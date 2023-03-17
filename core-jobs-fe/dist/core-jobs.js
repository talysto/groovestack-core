var z = Object.defineProperty;
var q = (t, r, i) => r in t ? z(t, r, { enumerable: !0, configurable: !0, writable: !0, value: i }) : t[r] = i;
var d = (t, r, i) => (q(t, typeof r != "symbol" ? r + "" : r, i), i);
import * as R from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js";
import { Chart as B } from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/react-google-charts@4.0.0_react-dom@18.2.0+react@18.2.0/node_modules/react-google-charts/dist/index.js";
import O from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@mui+icons-material@5.11.11_e2f19213392100bddfc99878d46bd6fd/node_modules/@mui/icons-material/PlaylistAddCheck.js";
import { useRecordContext as f, Edit as $, SimpleShowLayout as Y, TextField as s, Labeled as c, useDataProvider as W, useResourceContext as N, useNotify as j, List as Q, Datagrid as U, FunctionField as E, NumberField as K, SearchInput as G, SelectInput as H, DeleteWithConfirmButton as V, useRefresh as X, Button as Z } from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/react-admin@4.8.4_cd160f55359eec37085c65857803cdca/node_modules/react-admin/dist/esm/index.js";
import T from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/dayjs@1.11.7/node_modules/dayjs/dayjs.min.js";
import ee from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/dayjs@1.11.7/node_modules/dayjs/plugin/relativeTime.js";
import v from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@mui+material@5.11.13_cd160f55359eec37085c65857803cdca/node_modules/@mui/material/Grid/index.js";
import { Box as S, Card as D, CardContent as P, Typography as J, Skeleton as k, Chip as p, CircularProgress as re } from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@mui+material@5.11.13_cd160f55359eec37085c65857803cdca/node_modules/@mui/material/index.js";
import { useState as te, useEffect as ne } from "/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/react@18.2.0/node_modules/react/index.js";
const I = R.Fragment, e = R.jsx, a = R.jsxs, ae = [
  { label: "Jobs", value: "1.45", unit: "MM" },
  { label: "Latency", value: "32", unit: "min" },
  { label: "Workers", value: "16" },
  { label: "Running", value: "42" }
], ie = () => /* @__PURE__ */ e(
  "div",
  {
    style: { display: "flex", justifyContent: "space-between", width: "100%" },
    children: ae.map((t) => /* @__PURE__ */ a("div", { children: [
      /* @__PURE__ */ e(
        "small",
        {
          style: {
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#999"
          },
          children: t.label
        }
      ),
      /* @__PURE__ */ a(
        "div",
        {
          style: {
            color: "#666",
            fontWeight: "bold",
            fontSize: "150%",
            lineHeight: "100%<"
          },
          children: [
            t.value,
            t.unit && /* @__PURE__ */ e("span", { style: { marginLeft: 4, fontWeight: 100, fontSize: "50%" }, children: t.unit })
          ]
        }
      )
    ] }))
  }
), oe = () => /* @__PURE__ */ a("div", { children: [
  "Pivot Table",
  /* @__PURE__ */ e("br", {}),
  "props=",
  ["data"]
] }), le = ({ data: t }) => {
  const r = new Date(Math.ceil(new Date().getTime() / 6e4) * 6e4), i = [
    ["Period", "Jobs"],
    [new Date(r.getTime() - 1e3 * 60 * 60), 1],
    [new Date(r.getTime() - 800 * 60 * 60), 2],
    [new Date(r.getTime() - 600 * 60 * 60), 7],
    [new Date(r.getTime() - 400 * 60 * 60), 2],
    [new Date(r.getTime() - 200 * 60 * 60), 3],
    [r, 4]
  ];
  return /* @__PURE__ */ e(
    B,
    {
      width: "100%",
      height: "64px",
      chartType: "ColumnChart",
      loader: /* @__PURE__ */ e("div", { children: "Loading..." }),
      data: t || i,
      options: {
        title: "Job RPM",
        bar: { groupWidth: "100%" },
        animation: {
          startup: !0,
          easing: "out",
          duration: 500
        },
        // enableInteractivity: false,
        legend: "none",
        // chartArea: { left: 40, top: 20, right: 20 },
        hAxis: {
          viewWindow: {
            min: new Date(r.getTime() - 1e3 * 60 * 60),
            max: r
          }
        },
        vAxis: {
          format: "#",
          viewWindow: { min: 0 }
        }
      }
    }
  );
};
class w {
}
d(w, "RPM", le), d(w, "PivotTable", oe), d(w, "KPIs", ie);
T.extend(ee);
const se = (t) => {
  if (!t)
    return null;
  const r = T(t);
  return /* @__PURE__ */ e("span", { title: r.format("dddd, MMMM Do YYYY, h:mm a"), children: r.fromNow() });
}, x = ({
  source: t
}) => {
  const r = f();
  return r ? se(r[t]) : null;
}, ce = () => {
  const t = f();
  return !t || !t.errorCount ? null : (console.log(t), /* @__PURE__ */ a(I, { children: [
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Error Count", children: /* @__PURE__ */ e(s, { source: "errorCount" }) }) }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Last Error Message", children: /* @__PURE__ */ e(s, { source: "lastErrorMessage" }) }) }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Error Stacktrace", children: /* @__PURE__ */ e(s, { source: "lastErrorBacktrace" }) }) })
  ] }));
}, de = (t) => /* @__PURE__ */ e($, { children: /* @__PURE__ */ a(Y, { children: [
  /* @__PURE__ */ e(s, { source: "type", label: "Job" }),
  /* @__PURE__ */ a(v, { container: !0, spacing: 2, children: [
    /* @__PURE__ */ a(v, { item: !0, xs: 4, children: [
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "ID", children: /* @__PURE__ */ e(s, { source: "id" }) }) }),
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Status", children: /* @__PURE__ */ e(s, { source: "status" }) }) })
    ] }),
    /* @__PURE__ */ a(v, { item: !0, xs: 4, children: [
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Queue", children: /* @__PURE__ */ e(s, { source: "queue" }) }) }),
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Priority", children: /* @__PURE__ */ e(s, { source: "priority" }) }) })
    ] }),
    /* @__PURE__ */ a(v, { item: !0, xs: 4, children: [
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Run At", children: /* @__PURE__ */ e(x, { source: "runAt" }) }) }),
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Finished At", children: /* @__PURE__ */ e(x, { source: "finishedAt" }) }) }),
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(c, { label: "Expired At", children: /* @__PURE__ */ e(x, { source: "expiredAt" }) }) })
    ] })
  ] }),
  /* @__PURE__ */ e(s, { source: "args" }),
  /* @__PURE__ */ e(s, { source: "data" }),
  /* @__PURE__ */ e(ce, {})
] }) }), L = ({
  columns: t,
  emptyContent: r,
  refreshData: i,
  refreshInterval: m,
  transform: b,
  rowTotals: o = !1
}) => {
  const [l, g] = te([]), C = async () => {
    console.log("LiveTable: fetching data...");
    try {
      const n = await i();
      console.log("LiveTable: fetched data", n), g(b ? b(n) : n);
    } catch (n) {
      console.error(n);
    }
  }, F = () => l.length == 0 && r ? r : /* @__PURE__ */ a(I, { children: [
    l.map((n, u) => /* @__PURE__ */ e("tr", { children: t.map(({ key: h, render: y }, _) => /* @__PURE__ */ e("td", { title: n[h], children: y ? y(n[h]) : n[h] }, `${u}-${_}`)) }, u)),
    o && l.length > 0 ? /* @__PURE__ */ e("tr", { children: t.map(({ key: n }, u) => /* @__PURE__ */ e("td", { style: { fontWeight: "bold" }, children: isNaN(Number(l[0][n])) ? null : l.reduce((h, y) => h + Number(y[n]), 0) }, `total-${u}`)) }) : null
  ] });
  return ne(() => {
    C();
    let n;
    return m && m != 0 && (n = setInterval(C, 1e3 * m)), () => {
      n && clearInterval(n);
    };
  }, []), /* @__PURE__ */ a("table", { className: "pivot-table", style: { width: "100%" }, children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: t.map(({ key: n, label: u }, h) => /* @__PURE__ */ e("th", { children: u ? u.toUpperCase() : n.toUpperCase() }, h)) }) }),
    /* @__PURE__ */ e("tbody", { children: F() })
  ] });
};
const ue = () => {
  const t = W(), r = N();
  return /* @__PURE__ */ a(
    S,
    {
      sx: {
        minWidth: "33%",
        marginLeft: "1em",
        marginRight: "1em",
        mt: 8,
        gap: 3
      },
      children: [
        /* @__PURE__ */ e(D, { sx: { mb: 3 }, children: /* @__PURE__ */ a(P, { children: [
          /* @__PURE__ */ e(J, { variant: "h6", children: "Jobs by Type" }),
          /* @__PURE__ */ e(
            L,
            {
              columns: [
                { key: "sub_class", label: "type" },
                { key: "count", label: "queued" },
                { key: "count_working", label: "working" },
                { key: "count_errored", label: "errors" }
              ],
              emptyContent: /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { colSpan: 4, children: /* @__PURE__ */ a(S, { style: { width: "100%" }, children: [
                /* @__PURE__ */ e(k, { animation: !1 }),
                /* @__PURE__ */ e(k, { animation: !1 }),
                /* @__PURE__ */ e(k, { animation: !1 }),
                /* @__PURE__ */ e("div", { style: { textAlign: "center" }, children: "No jobs in the queue" })
              ] }) }) }),
              refreshData: () => {
                const o = r.split("/"), l = o.length > 1 ? `${o[0]}/JobReport` : "JobReport";
                return t.getList(l, {
                  filter: { reportName: "job_stats" },
                  pagination: { page: 0, perPage: 10 },
                  sort: { field: "", order: "" }
                });
              },
              refreshInterval: 30,
              transform: ({ data: o }) => o[0].data,
              rowTotals: !0
            }
          )
        ] }) }),
        /* @__PURE__ */ e(D, { children: /* @__PURE__ */ a(P, { children: [
          /* @__PURE__ */ e(J, { variant: "h6", children: "Workers" }),
          /* @__PURE__ */ e(
            L,
            {
              columns: [
                { key: "host", render: (o) => o.substring(0, 6) },
                { key: "pid" },
                { key: "workers" }
              ],
              refreshData: () => {
                const o = r.split("/"), l = o.length > 1 ? `${o[0]}/locker` : "locker";
                return t.getList(l, {
                  filter: {},
                  pagination: { page: 1, perPage: 100 },
                  sort: { field: "", order: "" }
                });
              },
              refreshInterval: 30,
              transform: ({ data: o }) => o
            }
          )
        ] }) })
      ]
    }
  );
}, he = [
  /* @__PURE__ */ e(G, { alwaysOn: !0, source: "q" }, "q"),
  /* @__PURE__ */ e(
    H,
    {
      alwaysOn: !0,
      source: "status",
      choices: [
        { id: "scheduled", name: "Scheduled" },
        { id: "running", name: "Running" },
        { id: "complete", name: "Complete" },
        { id: "errored", name: "Errored" },
        { id: "failed", name: "Failed" },
        { id: "expired", name: "Expired" }
      ]
    },
    "status"
  )
], me = () => {
  const t = f(), r = /* @__PURE__ */ e(re, { size: "0.75em" });
  switch (t.status) {
    case "running":
      return /* @__PURE__ */ e(p, { label: "Running", color: "info", size: "small", icon: r });
    case "failed":
      return /* @__PURE__ */ e(p, { label: "Failed", variant: "outlined", color: "error", size: "small" });
    case "error":
      return /* @__PURE__ */ e(
        p,
        {
          label: "Error: 3/5 retries",
          variant: "outlined",
          color: "warning",
          size: "small"
        }
      );
    case "scheduled":
      return /* @__PURE__ */ e(p, { label: "Scheduled", size: "small" });
    case "complete":
      return /* @__PURE__ */ e(p, { label: "Complete", size: "small" });
  }
  return /* @__PURE__ */ e(p, { label: t.status, size: "small" });
}, pe = () => {
  const t = W(), r = j(), i = f(), m = X(), b = N();
  return i ? /* @__PURE__ */ e(Z, { label: "Retry", color: "secondary", onClick: async (l) => {
    l.preventDefault();
    try {
      await t.update(b, {
        id: i.id,
        previousData: i,
        data: { expiredAt: null, runAt: T().toISOString() }
      }), r("Retry triggered!", { type: "success" }), m();
    } catch (g) {
      console.error(g), r(JSON.stringify(g), { type: "error" });
    }
  } }) : null;
}, be = ({ label: t }) => {
  const r = f();
  return r ? /* @__PURE__ */ a(
    "div",
    {
      style: { display: "flex", alignItems: "center", justifyContent: "end" },
      children: [
        r.actions.includes("retry") && /* @__PURE__ */ e(pe, {}),
        /* @__PURE__ */ e(V, { label: "" })
      ]
    }
  ) : null;
}, fe = () => (j(), /* @__PURE__ */ e(Q, { exporter: !1, filters: he, aside: /* @__PURE__ */ e(ue, {}), children: /* @__PURE__ */ a(U, { sort: { field: "priority", order: "ASC" }, rowClick: "edit", children: [
  /* @__PURE__ */ e(
    E,
    {
      label: "Job",
      render: (t) => /* @__PURE__ */ a("div", { children: [
        /* @__PURE__ */ e("div", { children: t.type }),
        /* @__PURE__ */ e("small", { style: { marginRight: 5 }, children: t.id.substring(0, 6) })
      ] })
    }
  ),
  /* @__PURE__ */ e(s, { source: "queue", sortable: !1 }),
  /* @__PURE__ */ e(K, { source: "priority" }),
  /* @__PURE__ */ e(E, { label: "Status", render: me }),
  /* @__PURE__ */ e(x, { label: "Scheduled", source: "runAt" }),
  /* @__PURE__ */ e(be, { label: "Actions" })
] }) }));
class A {
}
d(A, "List", fe), d(A, "Edit", de), // static Show = ShowSession
d(A, "Icon", O);
async function Ce(t = 15) {
  try {
    const { faker: r } = await import("/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@faker-js+faker@7.6.0/node_modules/@faker-js/faker/dist/esm/index.mjs");
    return Array.from({ length: t }, () => ({
      id: r.datatype.uuid(),
      host: r.word.adjective() + "_" + r.word.noun(),
      pid: 12332,
      wokers: r.random.numeric()
    }));
  } catch (r) {
    return console.error(r), [];
  }
}
async function Ee(t = 15) {
  try {
    const { faker: r } = await import("/Users/maxschridde/dev/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@faker-js+faker@7.6.0/node_modules/@faker-js/faker/dist/esm/index.mjs");
    return Array.from({ length: t }, () => ({
      // standard attributes
      id: r.datatype.uuid(),
      createdAt: r.date.recent(),
      updatedAt: r.date.recent(),
      // Creation attributes
      type: r.helpers.arrayElement([
        "Mailer::Welcome",
        "Notify::Slack",
        "Reports::EndOfMonth",
        "Payment:ProcessRefund"
      ]),
      jobClass: r.helpers.arrayElement([
        "ActiveJob::QueueAdapters::QueAdapter::JobWrapper"
      ]),
      // arguments: {},
      // "kwargs": {},
      runAt: r.date.future(),
      // job options
      queue: r.helpers.arrayElement([
        "default",
        "high",
        "low",
        "long-running"
      ]),
      priority: r.helpers.arrayElement([1, 50, 100]),
      status: r.helpers.arrayElement([
        "scheduled",
        "running",
        "error",
        "failed",
        "complete"
      ]),
      expiredAt: r.date.recent(),
      // error metadata
      errorCount: r.helpers.arrayElement([0, 0, 0, 3]),
      lastError: {},
      lastErrorBacktrace: "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids'\n/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
      lastErrorMessage: "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
      // completion metadata
      finishedAt: r.date.future(),
      actions: r.helpers.arrayElement([["retry"], [], []]),
      // que-specific
      data: {},
      args: [
        {
          job_id: "2f11a80b-069f-4570-9a24-c3142acf8a87"
        }
      ]
    }));
  } catch (r) {
    return console.error(r), [];
  }
}
class M {
}
d(M, "Charts", w), d(M, "Resource", A);
export {
  M as CoreJobs,
  Ee as mockJobs,
  Ce as mockLockers
};
