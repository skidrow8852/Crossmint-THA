import axios, { AxiosInstance, AxiosError } from "axios";
import { config } from "../utils/config";
import { logger } from "../utils/logger";

export class ApiClient {
  private instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: config.API_BASE_URL,
      headers: { "Content-Type": "application/json" },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    this.instance.interceptors.response.use(undefined, async (error: AxiosError) => {
      const customConfig = error.config as any;
      if (!customConfig || !customConfig.retry) {
        return Promise.reject(error);
      }

      customConfig.retryCount = (customConfig.retryCount || 0) + 1;
      const delay = Math.pow(2, customConfig.retryCount) * 1000;

      if (customConfig.retryCount <= customConfig.retry) {
        logger.warn(`Retry attempt ${customConfig.retryCount} for ${customConfig.url}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return this.instance(customConfig);
      }

      return Promise.reject(error);
    });
  }

  async post(endpoint: string, data: any) {
    try {
      return await this.instance.post(endpoint, {
        ...data,
        candidateId: config.CANDIDATE_ID,
      });
    } catch (error) {
      logger.error(`API POST failed for ${endpoint}: ${error.message}`);
      throw error;
    }
  }

  async delete(endpoint: string, data: any) {
    try {
      return await this.instance.delete(endpoint, {
        data: {
          ...data,
          candidateId: config.CANDIDATE_ID,
        },
      });
    } catch (error) {
      logger.error(`API DELETE failed for ${endpoint}: ${error.message}`);
      throw error;
    }
  }

  async get(endpoint: string) {
    try {
      return await this.instance.get(endpoint);
    } catch (error) {
      logger.error(`API GET failed for ${endpoint}: ${error.message}`);
      throw error;
    }
  }
  async batchDelete(endpoint: string, dataArray: Array<{ row: number; column: number }>) {
    try {
      return await Promise.all(
        dataArray.map((data) =>
          this.instance.delete(endpoint, {
            data: {
              ...data,
              candidateId: config.CANDIDATE_ID,
            },
          })
        )
      );
    } catch (error) {
      logger.error(`Batch delete failed for ${endpoint}: ${error.message}`);
      throw error;
    }
  }
}
