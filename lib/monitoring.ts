import { NextRequest } from 'next/server';

interface LogEntry {
  timestamp: string;
  level: 'info' | 'warn' | 'error';
  message: string;
  metadata?: Record<string, unknown>;
  ip?: string;
  userAgent?: string;
  endpoint?: string;
}

class Logger {
  private logs: LogEntry[] = [];
  private maxLogs = 1000; // Keep last 1000 logs in memory

  private createLogEntry(
    level: LogEntry['level'],
    message: string,
    metadata?: Record<string, unknown>,
    request?: NextRequest
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      metadata,
      ip: request ? this.getClientIP(request) : undefined,
      userAgent: request?.headers.get('user-agent') || undefined,
      endpoint: request?.nextUrl.pathname,
    };
  }

  private getClientIP(request: NextRequest): string {
    const forwarded = request.headers.get('x-forwarded-for');
    const realIP = request.headers.get('x-real-ip');
    
    if (forwarded) {
      return forwarded.split(',')[0].trim();
    }
    
    if (realIP) {
      return realIP;
    }
    
    return 'unknown';
  }

  info(message: string, metadata?: Record<string, unknown>, request?: NextRequest) {
    const entry = this.createLogEntry('info', message, metadata, request);
    this.addLog(entry);
    console.log(`[INFO] ${message}`, metadata);
  }

  warn(message: string, metadata?: Record<string, unknown>, request?: NextRequest) {
    const entry = this.createLogEntry('warn', message, metadata, request);
    this.addLog(entry);
    console.warn(`[WARN] ${message}`, metadata);
  }

  error(message: string, metadata?: Record<string, unknown>, request?: NextRequest) {
    const entry = this.createLogEntry('error', message, metadata, request);
    this.addLog(entry);
    console.error(`[ERROR] ${message}`, metadata);
  }

  private addLog(entry: LogEntry) {
    this.logs.push(entry);
    
    // Keep only the last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }
  }

  getLogs(level?: LogEntry['level'], limit = 100): LogEntry[] {
    let filteredLogs = this.logs;
    
    if (level) {
      filteredLogs = this.logs.filter(log => log.level === level);
    }
    
    return filteredLogs.slice(-limit).reverse();
  }

  getStats(): {
    total: number;
    byLevel: Record<string, number>;
    recentErrors: LogEntry[];
  } {
    const byLevel = this.logs.reduce((acc, log) => {
      acc[log.level] = (acc[log.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const recentErrors = this.logs
      .filter(log => log.level === 'error')
      .slice(-10)
      .reverse();

    return {
      total: this.logs.length,
      byLevel,
      recentErrors,
    };
  }
}

// Singleton logger instance
export const logger = new Logger();

// Security monitoring
export class SecurityMonitor {
  private suspiciousIPs = new Map<string, number>();
  private blockedIPs = new Set<string>();
  private maxSuspiciousRequests = 50;

  reportSuspiciousActivity(ip: string, activity: string, request?: NextRequest) {
    const count = this.suspiciousIPs.get(ip) || 0;
    this.suspiciousIPs.set(ip, count + 1);

    logger.warn('Suspicious activity detected', {
      ip,
      activity,
      count: count + 1,
    }, request);

    // Block IP if too many suspicious requests
    if (count + 1 >= this.maxSuspiciousRequests) {
      this.blockedIPs.add(ip);
      logger.error('IP blocked due to suspicious activity', { ip }, request);
    }
  }

  isBlocked(ip: string): boolean {
    return this.blockedIPs.has(ip);
  }

  unblockIP(ip: string) {
    this.blockedIPs.delete(ip);
    this.suspiciousIPs.delete(ip);
    logger.info('IP unblocked', { ip });
  }

  getBlockedIPs(): string[] {
    return Array.from(this.blockedIPs);
  }

  getSuspiciousIPs(): Array<{ ip: string; count: number }> {
    return Array.from(this.suspiciousIPs.entries()).map(([ip, count]) => ({
      ip,
      count,
    }));
  }
}

export const securityMonitor = new SecurityMonitor();

// Performance monitoring
export class PerformanceMonitor {
  private metrics = new Map<string, number[]>();

  recordResponseTime(endpoint: string, duration: number) {
    const times = this.metrics.get(endpoint) || [];
    times.push(duration);
    
    // Keep only last 100 measurements per endpoint
    if (times.length > 100) {
      times.shift();
    }
    
    this.metrics.set(endpoint, times);
  }

  getAverageResponseTime(endpoint: string): number {
    const times = this.metrics.get(endpoint) || [];
    if (times.length === 0) return 0;
    
    return times.reduce((sum, time) => sum + time, 0) / times.length;
  }

  getSlowEndpoints(threshold = 1000): Array<{ endpoint: string; avgTime: number }> {
    const slowEndpoints: Array<{ endpoint: string; avgTime: number }> = [];
    
    for (const endpoint of this.metrics.keys()) {
      const avgTime = this.getAverageResponseTime(endpoint);
      if (avgTime > threshold) {
        slowEndpoints.push({ endpoint, avgTime });
      }
    }
    
    return slowEndpoints.sort((a, b) => b.avgTime - a.avgTime);
  }

  getAllMetrics(): Record<string, { avg: number; count: number; max: number; min: number }> {
    const result: Record<string, { avg: number; count: number; max: number; min: number }> = {};
    
    for (const [endpoint, times] of this.metrics.entries()) {
      if (times.length > 0) {
        result[endpoint] = {
          avg: Math.round(this.getAverageResponseTime(endpoint)),
          count: times.length,
          max: Math.max(...times),
          min: Math.min(...times),
        };
      }
    }
    
    return result;
  }
}

export const performanceMonitor = new PerformanceMonitor();