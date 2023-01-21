import chalk from 'chalk';

class log {
  static trace(text, object) {
    const dateTime = new Date().toISOString();
    if (object) {
      console.info(
        `[ ${dateTime} ]` + chalk.cyan(' [TRACE] ') + `${text}`,
        object
      );
    } else {
      console.info(`[ ${dateTime} ]` + chalk.cyan(' [TRACE] ') + `${text}`);
    }
  }

  static info(text, object) {
    const dateTime = new Date().toISOString();
    if (object) {
      console.info(
        `[ ${dateTime} ]` + chalk.green('  [INFO] ') + `${text}`,
        object
      );
    } else {
      console.info(`[ ${dateTime} ]` + chalk.green('  [INFO] ') + `${text}`);
    }
  }

  static warn(text, object) {
    const dateTime = new Date().toISOString();
    if (object) {
      console.info(
        `[ ${dateTime} ]` + chalk.yellow('  [WARN] ') + `${text}`,
        object
      );
    } else {
      console.info(`[ ${dateTime} ]` + chalk.yellow('  [WARN] ') + `${text}`);
    }
  }

  static error(text, error) {
    const dateTime = new Date().toISOString();
    console.error(
      `[ ${dateTime} ]` + chalk.red(' [ERROR] ') + `${text}`,
      error
    );
  }
}

export { log };
