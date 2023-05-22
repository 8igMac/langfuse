import Header from "~/components/layouts/header";

import {
  DataGrid,
  type GridRowsProp,
  type GridColDef,
  type GridRowParams,
  GridToolbar,
} from "@mui/x-data-grid";
import { api } from "~/utils/api";
import { useRouter } from "next/router";

export default function MetricsPage() {
  const metrics = api.metrics.all.useQuery();
  const router = useRouter();

  const columns: GridColDef[] = [
    {
      field: "id",
      type: "actions",
      headerName: "ID",
      width: 100,
      getActions: (params: GridRowParams) => [
        <div key=".">...{lastCharacters(params.row.id as string, 7)}</div>,
      ],
    },
    {
      field: "traceId",
      type: "actions",
      headerName: "Trace",
      width: 100,
      getActions: (params: GridRowParams) => [
        <button
          key="openTrace"
          className="rounded bg-indigo-50 px-2 py-1 text-xs font-semibold text-indigo-600 shadow-sm hover:bg-indigo-100"
          onClick={() =>
            void router.push(`/traces/${params.row.traceId as string}`)
          }
        >
          ...{lastCharacters(params.row.traceId as string, 7)}
        </button>,
      ],
    },
    {
      field: "timestamp",
      type: "dateTime",
      headerName: "Timestamp",
      width: 170,
    },
    { field: "name", headerName: "Name", minWidth: 200 },
    { field: "value", headerName: "Value", minWidth: 200 },
  ];

  const rows: GridRowsProp = metrics.isSuccess
    ? metrics.data.map((metric) => ({
        id: metric.id,
        timestamp: metric.timestamp,
        name: metric.name,
        value: metric.value,
        observationId: metric.observationId,
        traceId: metric.traceId,
      }))
    : [];

  return (
    <>
      <Header title="Metrics" />
      <DataGrid
        rows={rows}
        columns={columns}
        slots={{ toolbar: GridToolbar }}
        loading={metrics.isLoading}
      />
    </>
  );
}

function lastCharacters(str: string, n: number) {
  return str.substring(str.length - n);
}