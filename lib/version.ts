import pkg from '@hollowdark/package.json'

const [major, minor] = pkg.version.split('.')

/**
 * The app's version in short display form (`<major>.<minor>`), derived from
 * the `version` field in `package.json`. Displayed in the UI footer.
 */
export const APP_VERSION: string = `${major}.${minor}`

/** The full semver string from `package.json`. */
export const APP_VERSION_FULL: string = pkg.version
