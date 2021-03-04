import { Workflow, WorkflowReturn, Workspace } from './workflows';
export declare const sys_validation: (worskpace: Workspace) => Promise<WorkflowReturn<void>>;
export declare type SysValidationWorkflow = Workflow<void, void>;
export declare function sys_validation_task(): SysValidationWorkflow;
