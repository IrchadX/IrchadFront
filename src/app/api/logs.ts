// src/services/log.service.ts
import { getTranslations } from "@/lib/translations";

export interface LogFile {
  name: string;
  size: number;
  modified: Date;
  type: string;
}

class LogService {
  private getBaseUrl(): string {
    const apiGateway =
      process.env.API_GATEWAY || "https://irchad-gateway.up.railway.app";

    return apiGateway.endsWith("/")
      ? `${apiGateway}logs`
      : `${apiGateway}/logs`;
  }

  private async makeRequest(endpoint: string): Promise<Response> {
    const url = `${this.getBaseUrl()}/${endpoint.replace(/^\//, "")}`;

    const response = await fetch(url, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    return response;
  }

  async downloadAllLogsAsText(): Promise<void> {
    try {
      const response = await this.makeRequest("download?all=true&format=text");
      console.log(response);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `all-logs-${new Date().toISOString()}.txt`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download error:", error);
      throw new Error(
        getTranslations(navigator.language).settings.downloadError
      );
    }
  }

  async downloadLogFile(type: string): Promise<void> {
    try {
      const response = await this.makeRequest(`download?type=${type}`);
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `${type}-logs-${new Date().toISOString()}.${
        type === "all" ? "zip" : "log"
      }`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download error:", error);
      throw new Error(
        getTranslations(navigator.language).settings.downloadError
      );
    }
  }

  async downloadAllLogs(): Promise<void> {
    try {
      const response = await this.makeRequest("download?all=true");
      const blob = await response.blob();

      const downloadUrl = window.URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = downloadUrl;
      anchor.download = `all-logs-${new Date().toISOString()}.zip`;
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error("Download error:", error);
      throw new Error(
        getTranslations(navigator.language).settings.downloadError
      );
    }
  }

  async getLogList(): Promise<LogFile[]> {
    try {
      const response = await this.makeRequest("list");
      const data = await response.json();

      return data.files.map((file: any) => ({
        name: file.name,
        size: file.size,
        modified: new Date(file.modified),
        type: file.name.split(".")[0].replace("fluent_", ""),
      }));
    } catch (error) {
      console.error("Error fetching log list:", error);
      throw new Error("Failed to fetch log list");
    }
  }

  async getLogContent(type: string): Promise<string> {
    try {
      const response = await this.makeRequest(type);
      return await response.text();
    } catch (error) {
      console.error(`Error fetching ${type} logs:`, error);
      throw new Error(`Failed to fetch ${type} logs`);
    }
  }
}

export const logService = new LogService();
