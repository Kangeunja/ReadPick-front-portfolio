const fetchWithRetry = async (url, options = {}, retries = 2, delayMs = 400) => {
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const response = await fetch(url, options);

      if (!response.ok && response.status >= 500 && attempt < retries) {
        throw new Error(`HTTP ${response.status}`);
      }

      return response;
    } catch (error) {
      lastError = error;

      if (attempt >= retries) {
        break;
      }

      await new Promise((resolve) => setTimeout(resolve, delayMs * (attempt + 1)));
    }
  }

  throw lastError || new Error(`요청 실패: ${url}`);
};

module.exports = fetchWithRetry;
