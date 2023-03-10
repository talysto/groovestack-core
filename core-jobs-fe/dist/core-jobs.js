var B = Object.defineProperty;
var O = (r, t, a) => t in r ? B(r, t, { enumerable: !0, configurable: !0, writable: !0, value: a }) : r[t] = a;
var u = (r, t, a) => (O(r, typeof t != "symbol" ? t + "" : t, a), a);
import * as C from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/react@18.2.0/node_modules/react/jsx-runtime.js";
import { Chart as $ } from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/react-google-charts@4.0.0_biqbaboplfbrettd7655fr4n2y/node_modules/react-google-charts/dist/index.js";
import Y from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@mui+icons-material@5.11.11_ao76n7r2cajsoyr3cbwrn7geoi/node_modules/@mui/icons-material/PlaylistAddCheck.js";
import { useRecordContext as g, Edit as Q, SimpleShowLayout as U, TextField as c, Labeled as d, useDataProvider as I, useResourceContext as j, useNotify as F, List as K, Datagrid as G, FunctionField as k, NumberField as H, SearchInput as V, SelectInput as X, DeleteWithConfirmButton as Z, useRefresh as ee, Button as re } from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/react-admin@4.8.2_zula6vjvt3wdocc4mwcxqa6nzi/node_modules/react-admin/dist/esm/index.js";
import E from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/dayjs@1.11.7/node_modules/dayjs/dayjs.min.js";
import te from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/dayjs@1.11.7/node_modules/dayjs/plugin/relativeTime.js";
import w from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@mui+material@5.11.12_dl5meo57oqikomakll4aynjcye/node_modules/@mui/material/Grid/index.js";
import { Card as D, CardContent as P, Typography as J, Chip as b, CircularProgress as ne } from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@mui+material@5.11.12_dl5meo57oqikomakll4aynjcye/node_modules/@mui/material/index.js";
import M from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@mui+material@5.11.12_dl5meo57oqikomakll4aynjcye/node_modules/@mui/material/Box/index.js";
import T from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@mui+material@5.11.12_dl5meo57oqikomakll4aynjcye/node_modules/@mui/material/Skeleton/index.js";
import W from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/react@18.2.0/node_modules/react/index.js";
import { faker as o } from "/Users/darren/Code/moonlight-labs/core/core-jobs-fe/node_modules/.pnpm/@faker-js+faker@7.6.0/node_modules/@faker-js/faker/dist/esm/index.mjs";
const _ = C.Fragment, e = C.jsx, i = C.jsxs, ie = [
  { label: "Jobs", value: "1.45", unit: "MM" },
  { label: "Latency", value: "32", unit: "min" },
  { label: "Workers", value: "16" },
  { label: "Running", value: "42" }
], ae = () => /* @__PURE__ */ e(
  "div",
  {
    style: { display: "flex", justifyContent: "space-between", width: "100%" },
    children: ie.map((r) => /* @__PURE__ */ i("div", { children: [
      /* @__PURE__ */ e(
        "small",
        {
          style: {
            textTransform: "uppercase",
            fontWeight: "bold",
            color: "#999"
          },
          children: r.label
        }
      ),
      /* @__PURE__ */ i(
        "div",
        {
          style: {
            color: "#666",
            fontWeight: "bold",
            fontSize: "150%",
            lineHeight: "100%<"
          },
          children: [
            r.value,
            r.unit && /* @__PURE__ */ e("span", { style: { marginLeft: 4, fontWeight: 100, fontSize: "50%" }, children: r.unit })
          ]
        }
      )
    ] }))
  }
), le = () => /* @__PURE__ */ i("div", { children: [
  "Pivot Table",
  /* @__PURE__ */ e("br", {}),
  "props=",
  ["data"]
] }), oe = ({ data: r }) => {
  const t = new Date(Math.ceil(new Date().getTime() / 6e4) * 6e4), a = [
    ["Period", "Jobs"],
    [new Date(t.getTime() - 1e3 * 60 * 60), 1],
    [new Date(t.getTime() - 800 * 60 * 60), 2],
    [new Date(t.getTime() - 600 * 60 * 60), 7],
    [new Date(t.getTime() - 400 * 60 * 60), 2],
    [new Date(t.getTime() - 200 * 60 * 60), 3],
    [t, 4]
  ];
  return /* @__PURE__ */ e(
    $,
    {
      width: "100%",
      height: "64px",
      chartType: "ColumnChart",
      loader: /* @__PURE__ */ e("div", { children: "Loading..." }),
      data: r || a,
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
            min: new Date(t.getTime() - 1e3 * 60 * 60),
            max: t
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
class x {
}
u(x, "RPM", oe), u(x, "PivotTable", le), u(x, "KPIs", ae);
E.extend(te);
const se = (r) => {
  if (!r)
    return null;
  const t = E(r);
  return /* @__PURE__ */ e("span", { title: t.format("dddd, MMMM Do YYYY, h:mm a"), children: t.fromNow() });
}, A = ({
  source: r
}) => {
  const t = g();
  return t ? se(t[r]) : null;
}, ce = () => {
  const r = g();
  return !r || !r.errorCount ? null : (console.log(r), /* @__PURE__ */ i(_, { children: [
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Error Count", children: /* @__PURE__ */ e(c, { source: "errorCount" }) }) }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Last Error Message", children: /* @__PURE__ */ e(c, { source: "lastErrorMessage" }) }) }),
    /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Error Stacktrace", children: /* @__PURE__ */ e(c, { source: "lastErrorBacktrace" }) }) })
  ] }));
}, de = (r) => /* @__PURE__ */ e(Q, { children: /* @__PURE__ */ i(U, { children: [
  /* @__PURE__ */ e(c, { source: "type", label: "Job" }),
  /* @__PURE__ */ i(w, { container: !0, spacing: 2, children: [
    /* @__PURE__ */ i(w, { item: !0, xs: 4, children: [
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "ID", children: /* @__PURE__ */ e(c, { source: "id" }) }) }),
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Status", children: /* @__PURE__ */ e(c, { source: "status" }) }) })
    ] }),
    /* @__PURE__ */ i(w, { item: !0, xs: 4, children: [
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Queue", children: /* @__PURE__ */ e(c, { source: "queue" }) }) }),
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Priority", children: /* @__PURE__ */ e(c, { source: "priority" }) }) })
    ] }),
    /* @__PURE__ */ i(w, { item: !0, xs: 4, children: [
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Run At", children: /* @__PURE__ */ e(A, { source: "runAt" }) }) }),
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Finished At", children: /* @__PURE__ */ e(A, { source: "finishedAt" }) }) }),
      /* @__PURE__ */ e("div", { children: /* @__PURE__ */ e(d, { label: "Expired At", children: /* @__PURE__ */ e(A, { source: "expiredAt" }) }) })
    ] })
  ] }),
  /* @__PURE__ */ e(c, { source: "args" }),
  /* @__PURE__ */ e(c, { source: "data" }),
  /* @__PURE__ */ e(ce, {})
] }) }), L = ({
  columns: r,
  emptyContent: t,
  refreshData: a,
  refreshInterval: p,
  transform: f,
  rowTotals: l = !1
}) => {
  const [s, y] = W.useState([]), S = async () => {
    console.log("LiveTable: fetching data...");
    try {
      const n = await a();
      console.log("LiveTable: fetched data", n), y(f ? f(n) : n);
    } catch (n) {
      console.error(n);
    }
  }, z = () => s.length == 0 && t ? t : /* @__PURE__ */ i(_, { children: [
    s.map((n, h) => /* @__PURE__ */ e("tr", { children: r.map(({ key: m, render: v }, q) => /* @__PURE__ */ e("td", { title: n[m], children: v ? v(n[m]) : n[m] }, `${h}-${q}`)) }, h)),
    l && s.length > 0 ? /* @__PURE__ */ e("tr", { children: r.map(({ key: n }, h) => /* @__PURE__ */ e("td", { style: { fontWeight: "bold" }, children: isNaN(Number(s[0][n])) ? null : s.reduce((m, v) => m + Number(v[n]), 0) }, `total-${h}`)) }) : null
  ] });
  return W.useEffect(() => {
    S();
    let n;
    return p && p != 0 && (n = setInterval(S, 1e3 * p)), () => {
      n && clearInterval(n);
    };
  }, []), /* @__PURE__ */ i("table", { className: "pivot-table", style: { width: "100%" }, children: [
    /* @__PURE__ */ e("thead", { children: /* @__PURE__ */ e("tr", { children: r.map(({ key: n, label: h }, m) => /* @__PURE__ */ e("th", { children: h ? h.toUpperCase() : n.toUpperCase() }, m)) }) }),
    /* @__PURE__ */ e("tbody", { children: z() })
  ] });
};
const ue = () => {
  const r = I(), t = j();
  return /* @__PURE__ */ i(M, { sx: { minWidth: "33%", marginLeft: "1em", marginRight: "1em", mt: 8, gap: 3 }, children: [
    /* @__PURE__ */ e(D, { sx: { mb: 3 }, children: /* @__PURE__ */ i(P, { children: [
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
          emptyContent: /* @__PURE__ */ e("tr", { children: /* @__PURE__ */ e("td", { colSpan: 4, children: /* @__PURE__ */ i(M, { style: { width: "100%" }, children: [
            /* @__PURE__ */ e(T, { animation: !1 }),
            /* @__PURE__ */ e(T, { animation: !1 }),
            /* @__PURE__ */ e(T, { animation: !1 }),
            /* @__PURE__ */ e("div", { style: { textAlign: "center" }, children: "No jobs in the queue" })
          ] }) }) }),
          refreshData: () => {
            const l = t.split("/"), s = l.length > 1 ? `${l[0]}/JobReport` : "JobReport";
            return r.getList(s, {
              filter: { reportName: "job_stats" },
              pagination: { page: 0, perPage: 10 },
              sort: { field: "", order: "" }
            });
          },
          refreshInterval: 30,
          transform: ({ data: l }) => l[0].data,
          rowTotals: !0
        }
      )
    ] }) }),
    /* @__PURE__ */ e(D, { children: /* @__PURE__ */ i(P, { children: [
      /* @__PURE__ */ e(J, { variant: "h6", children: "Workers" }),
      /* @__PURE__ */ e(
        L,
        {
          columns: [
            { key: "host", render: (l) => l.substring(0, 6) },
            { key: "pid" },
            { key: "workers" }
          ],
          refreshData: () => {
            const l = t.split("/"), s = l.length > 1 ? `${l[0]}/locker` : "locker";
            return r.getList(s, {
              filter: {},
              pagination: { page: 1, perPage: 100 },
              sort: { field: "", order: "" }
            });
          },
          refreshInterval: 30,
          transform: ({ data: l }) => l
        }
      )
    ] }) })
  ] });
}, he = [
  /* @__PURE__ */ e(V, { alwaysOn: !0, source: "q" }, "q"),
  /* @__PURE__ */ e(
    X,
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
  const r = g(), t = /* @__PURE__ */ e(ne, { size: "0.75em" });
  switch (r.status) {
    case "running":
      return /* @__PURE__ */ e(b, { label: "Running", color: "info", size: "small", icon: t });
    case "failed":
      return /* @__PURE__ */ e(b, { label: "Failed", variant: "outlined", color: "error", size: "small" });
    case "error":
      return /* @__PURE__ */ e(
        b,
        {
          label: "Error: 3/5 retries",
          variant: "outlined",
          color: "warning",
          size: "small"
        }
      );
    case "scheduled":
      return /* @__PURE__ */ e(b, { label: "Scheduled", size: "small" });
    case "complete":
      return /* @__PURE__ */ e(b, { label: "Complete", size: "small" });
  }
  return /* @__PURE__ */ e(b, { label: r.status, size: "small" });
}, pe = () => {
  const r = I(), t = F(), a = g(), p = ee(), f = j();
  return a ? /* @__PURE__ */ e(re, { label: "Retry", color: "secondary", onClick: async (s) => {
    s.preventDefault();
    try {
      await r.update(f, {
        id: a.id,
        previousData: a,
        data: { expiredAt: null, runAt: E().toISOString() }
      }), t("Retry triggered!", { type: "success" }), p();
    } catch (y) {
      console.error(y), t(JSON.stringify(y), { type: "error" });
    }
  } }) : null;
}, be = ({ label: r }) => {
  const t = g();
  return t ? /* @__PURE__ */ i(
    "div",
    {
      style: { display: "flex", alignItems: "center", justifyContent: "end" },
      children: [
        t.actions.includes("retry") && /* @__PURE__ */ e(pe, {}),
        /* @__PURE__ */ e(Z, { label: "" })
      ]
    }
  ) : null;
}, fe = () => (F(), /* @__PURE__ */ e(K, { exporter: !1, filters: he, aside: /* @__PURE__ */ e(ue, {}), children: /* @__PURE__ */ i(G, { sort: { field: "priority", order: "ASC" }, rowClick: "edit", children: [
  /* @__PURE__ */ e(
    k,
    {
      label: "Job",
      render: (r) => /* @__PURE__ */ i("div", { children: [
        /* @__PURE__ */ e("div", { children: r.type }),
        /* @__PURE__ */ e("small", { style: { marginRight: 5 }, children: r.id.substring(0, 6) })
      ] })
    }
  ),
  /* @__PURE__ */ e(c, { source: "queue", sortable: !1 }),
  /* @__PURE__ */ e(H, { source: "priority" }),
  /* @__PURE__ */ e(k, { label: "Status", render: me }),
  /* @__PURE__ */ e(A, { label: "Scheduled", source: "runAt" }),
  /* @__PURE__ */ e(be, { label: "Actions" })
] }) }));
class R {
}
u(R, "List", fe), u(R, "Edit", de), // static Show = ShowSession
u(R, "Icon", Y);
const De = () => ({
  // standard attributes
  id: o.datatype.uuid(),
  createdAt: o.date.recent(),
  updatedAt: o.date.recent(),
  // Creation attributes
  type: o.helpers.arrayElement([
    "Mailer::Welcome",
    "Notify::Slack",
    "Reports::EndOfMonth",
    "Payment:ProcessRefund"
  ]),
  jobClass: o.helpers.arrayElement([
    "ActiveJob::QueueAdapters::QueAdapter::JobWrapper"
  ]),
  // arguments: {},
  // "kwargs": {},
  runAt: o.date.future(),
  // job options
  queue: o.helpers.arrayElement(["default", "high", "low", "long-running"]),
  priority: o.helpers.arrayElement([1, 50, 100]),
  status: o.helpers.arrayElement([
    "scheduled",
    "running",
    "error",
    "failed",
    "complete"
  ]),
  expiredAt: o.date.recent(),
  // error metadata
  errorCount: o.helpers.arrayElement([0, 0, 0, 3]),
  lastError: {},
  lastErrorBacktrace: "/app/vendor/bundle/ruby/3.0.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:431:in `find_with_ids'\n/app/vendor/bundle/ruby/2.7.0/gems/activerecord-6.0.3.6/lib/active_record/relation/finder_methods.rb:69:in `find'",
  lastErrorMessage: "ActiveRecord::RecordNotFound: Couldn't find User without an ID",
  // completion metadata
  finishedAt: o.date.future(),
  actions: o.helpers.arrayElement([["retry"], [], []]),
  // que-specific
  data: {},
  args: [
    {
      job_id: "2f11a80b-069f-4570-9a24-c3142acf8a87"
    }
  ]
});
class N {
}
u(N, "Charts", x), u(N, "Resource", R);
export {
  N as CoreJobs,
  De as mockJob
};
