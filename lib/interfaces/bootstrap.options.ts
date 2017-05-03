export interface BootstrapOptions {
  port: number;
  onListen?: (port: number) => void;
}
