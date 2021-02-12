
export const DBConfig = {
        name: 'SayHeyDB',
        version: 1,
        objectStoresMeta: [
          {
            store: 'presets',
            storeConfig: { keyPath: 'id', autoIncrement: true },
            storeSchema: [
              { Message: 'message', keypath: 'message', options: { unique: true } }
            ]
          }
        ]
      };