enum LOG_LEVELS {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

const shouldPrintForWarn = (level?: string) => {
  const currentLevel = level ?? LOG_LEVELS.INFO;
  switch (currentLevel) {
    case LOG_LEVELS.WARN: {
      return true;
    }
    case LOG_LEVELS.ERROR: {
      return true;
    }
    default: {
      return false;
    }
  }
};

const shouldPrintForDebug = (level?: string) => {
  const currentLevel = level ?? LOG_LEVELS.INFO;
  switch (currentLevel) {
    default: {
      return true;
    }
  }
};

const shouldPrintForInfo = (level?: string) => {
  const currentLevel = level ?? LOG_LEVELS.INFO;
  switch (currentLevel) {
    case LOG_LEVELS.DEBUG: {
      return false;
    }
    default: {
      return true;
    }
  }
};

const shouldPrintForError = (level?: string) => {
  const currentLevel = level ?? LOG_LEVELS.INFO;
  switch (currentLevel) {
    case LOG_LEVELS.ERROR: {
      return true;
    }
    default: {
      return false;
    }
  }
};

export const logger = {
  debug: (...params: unknown[]) => {
    if (shouldPrintForDebug(process.env.LOG_LEVEL)) {
      console.log(...params);
    }
  },
  error: (...params: unknown[]) => {
    if (shouldPrintForError(process.env.LOG_LEVEL)) {
      console.error(...params);
    }
  },
  info: (...params: unknown[]) => {
    if (shouldPrintForInfo(process.env.LOG_LEVEL)) {
      console.log(...params);
    }
  },
  log: (...params: unknown[]) => {
    if (shouldPrintForInfo(process.env.LOG_LEVEL)) {
      console.log(...params);
    }
  },
  warn: (...params: unknown[]) => {
    if (shouldPrintForWarn(process.env.LOG_LEVEL)) {
      console.log(...params);
    }
  },
};
