const [major, minor] = __APP_VERSION__.split('.')

/**
 * The app's version in short display form (`<major>.<minor>`), derived
 * from the `version` field in `package.json` at build time via Vite's
 * `define`. Used in the UI footer.
 */
export const APP_VERSION: string = `${major}.${minor}`

/** The full semver string from `package.json`. */
export const APP_VERSION_FULL: string = __APP_VERSION__
