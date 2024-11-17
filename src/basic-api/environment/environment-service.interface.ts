export interface IEnvironmentService {
  setString(key: string, required: boolean, value?: string): string | undefined,
  setInt(key: string, required: boolean, value?: number): number | undefined,
  setNumber(key: string, required: boolean, value?: number): number | undefined
}
