/**
 * Type defintion for a CLI command
 */
export type CLICommand = {
  name: string;
  description: string;
  callback: (commands: Record<string, CLICommand>) => void;
};
