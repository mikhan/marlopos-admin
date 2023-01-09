module.exports = function () {
  return {
    MAX_PAYLOAD_SIZE: '8mb',
    CACHE_ENABLED: 'true',
    CACHE_TTL: '30m',
    CACHE_AUTO_PURGE: 'true',
    STORAGE_LOCATIONS: 'local',
    ACCESS_TOKEN_TTL: '15m',
    REFRESH_TOKEN_TTL: '7d',
    CORS_ENABLED: 'true',
    CORS_ORIGIN: 'true',
    CORS_METHODS: 'GET,POST,PATCH,DELETE,OPTIONS'
  };
};
