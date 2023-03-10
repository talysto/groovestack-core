import type { FC } from 'react';
import type { OverridableComponent } from '@mui/material/OverridableComponent';
import type { SvgIconTypeMap } from '@mui/material';

declare class Charts {
    static RPM: FC<{
        data?: any;
    }>;
    static PivotTable: () => JSX.Element;
    static KPIs: () => JSX.Element;
}

export declare class CoreJobs {
    static Charts: typeof Charts;
    static Resource: typeof Jobs;
}

declare class Jobs {
    static List: () => JSX.Element;
    static Edit: (props: any) => JSX.Element;
    static Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
        muiName: string;
    };
}

export declare const mockJob: () => {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    type: string;
    jobClass: string;
    runAt: Date;
    queue: string;
    priority: number;
    status: string;
    expiredAt: Date;
    errorCount: number;
    lastError: {};
    lastErrorBacktrace: string;
    lastErrorMessage: string;
    finishedAt: Date;
    actions: string[];
    data: {};
    args: {
        job_id: string;
    }[];
};

export { }
