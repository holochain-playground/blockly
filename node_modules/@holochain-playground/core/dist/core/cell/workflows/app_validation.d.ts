import { Workflow } from '../../cell';
import { WorkflowReturn, Workspace } from './workflows';
export declare const app_validation: (worskpace: Workspace) => Promise<WorkflowReturn<void>>;
export declare type AppValidationWorkflow = Workflow<any, any>;
export declare function app_validation_task(): AppValidationWorkflow;
