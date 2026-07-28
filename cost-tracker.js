/**
 * Cost Tracker - Monitor spending
 * Track token usage and estimate costs
 */

class CostTracker {
  constructor() {
    this.requests = [];
    this.totalTokens = 0;
    this.totalCost = 0;
  }

  /**
   * Claude Pricing (per 1M tokens)
   */
  static PRICING = {
    'claude-3-5-haiku': {
      input: 0.80,
      output: 2.40,
    },
    'claude-3-haiku': {
      input: 0.25,
      output: 1.25,
    },
    'mixtral-8x7b': {
      input: 0,
      output: 0,
    },
  };

  /**
   * Track a request
   */
  track(model, inputTokens, outputTokens) {
    const pricing = CostTracker.PRICING[model] || { input: 0, output: 0 };

    const inputCost = (inputTokens / 1000000) * pricing.input;
    const outputCost = (outputTokens / 1000000) * pricing.output;
    const totalCost = inputCost + outputCost;

    const request = {
      model,
      inputTokens,
      outputTokens,
      totalTokens: inputTokens + outputTokens,
      cost: totalCost,
      timestamp: new Date(),
    };

    this.requests.push(request);
    this.totalTokens += request.totalTokens;
    this.totalCost += totalCost;

    return request;
  }

  /**
   * Get cost summary
   */
  getSummary() {
    return {
      totalRequests: this.requests.length,
      totalTokens: this.totalTokens,
      totalCost: parseFloat(this.totalCost.toFixed(4)),
      averageCostPerRequest: this.requests.length
        ? parseFloat((this.totalCost / this.requests.length).toFixed(4))
        : 0,
      estimatedMonthlyCost: parseFloat(
        (this.totalCost * (30 * 24 * 60 / (Date.now() - (this.requests[0]?.timestamp || Date.now()))).toFixed(2))
      ),
    };
  }

  /**
   * Get breakdown by model
   */
  getByModel() {
    const breakdown = {};

    this.requests.forEach((req) => {
      if (!breakdown[req.model]) {
        breakdown[req.model] = {
          requests: 0,
          tokens: 0,
          cost: 0,
        };
      }

      breakdown[req.model].requests++;
      breakdown[req.model].tokens += req.totalTokens;
      breakdown[req.model].cost += req.cost;
    });

    return breakdown;
  }

  /**
   * Reset tracker
   */
  reset() {
    this.requests = [];
    this.totalTokens = 0;
    this.totalCost = 0;
  }
}

module.exports = CostTracker;
