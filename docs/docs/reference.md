---
sidebar_position: 1
---

# CORE API Reference

## Backend Features

## Frontend Components

<ExportList />

import jobs from '../../core-jobs-fe/src/core-jobs/index.ts'

export const coreModules = [jobs]

export const ExportList = () => {
return(
<table>
<tbody>
  { coreModules.map(mod => (
    <tr>
      <td>
        {mod}
      </td>
    </tr>
    ))
  }
</tbody>
</table>
)
}
