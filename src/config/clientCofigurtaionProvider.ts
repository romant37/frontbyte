interface IClientConfigurationSchema {
  baseName: string
  apiBaseAddress: string
}

let config: IClientConfigurationSchema

export const createClientConfiguration = () => {
  const win = window as any
  config = win.cc
}

const getConfigValue = (key: keyof IClientConfigurationSchema) => {
  if (config === undefined) {
    createClientConfiguration()
    // throw new Error("Client configuration is not initialized.");
  }
  return config[key]
}

export default getConfigValue
